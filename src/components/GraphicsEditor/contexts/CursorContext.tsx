import React, { 
    createContext, 
    useContext, 
    useEffect, 
    useState 
} from "react";
import { GraphicContext } from "./GraphicContext";
import { rgbToHex } from "@local/functions";
import { useInterval } from "@local/hooks";

type CursorMode = "Paint" | "Erase" | "ColorPicker" | "Selection" | "Fill";

interface CursorContextValue {
    cursorEl: HTMLDivElement | null;
    setCursorEl: React.Dispatch<React.SetStateAction<HTMLDivElement | null>>;

    mode: CursorMode;
    setMode: React.Dispatch<React.SetStateAction<CursorMode>>;

    color: string;
    setColor: React.Dispatch<React.SetStateAction<string>>;

    activateCursor: () => void;
    deactivateCursor: () => void;
}

const CursorContext = createContext<CursorContextValue>({
    cursorEl: null,
    setCursorEl: () => {},

    mode: "Paint",
    setMode: () => {},

    color: "#000000",
    setColor: () => {},

    activateCursor: () => {},
    deactivateCursor: () => {}
});

function CursorProvider(props: { children: React.ReactNode }) {
    const {
        getPixelSize, 
        graphicCanvas,
        numCols,
        numRows 
    } = useContext(GraphicContext);

    const [cursorEl, setCursorEl] = useState<HTMLDivElement | null>(null);
    const [selectionEl, setSelectionEl] = useState<HTMLDivElement | null>(null);

    const [active, setActive] = useState(false);
    const [mode, setMode] = useState<CursorMode>("Paint");
    const [color, setColor] = useState<string>("#000000");

    const [mousePos, setMousePos] = useState({
        x: 0,
        y: 0
    });
    const [cursorPos, setCursorPos] = useState({
        x: 0,
        y: 0
    });

    const saveMousePosition = (evt: PointerEvent) => {
        let { offsetX: x, offsetY: y } = evt;
        const { width, height } = getPixelSize();

        x -= width;
        y -= height;

        setMousePos({ x, y });
    };
    
    useEffect(() => {
        if (!graphicCanvas) {
            return;
        }

        graphicCanvas.removeEventListener("pointermove", saveMousePosition);
        graphicCanvas.addEventListener("pointermove", saveMousePosition);
    }, [graphicCanvas]);

    useEffect(() => {
        if (!cursorEl) {
            return;
        }
        
        const { width, height } = getPixelSize();
        const pos = { x: 0, y: 0 };

        for (let row = 0; pos.y < mousePos.y; ++row) {
            for (let col = 0; pos.x < mousePos.x; ++col) {
                pos.x += width;
            }
            
            pos.y += height;
        }
        
        setCursorPos({ ...pos });
    }, [mousePos, cursorEl]);
    
    useEffect(() => {
        if (!cursorEl) {
            return;
        }
        
        const borderWidth = parseFloat(getComputedStyle(cursorEl).borderWidth);
        const { width, height } = getPixelSize();
    
        cursorEl.style.width = `${width - borderWidth}px`;
        cursorEl.style.height = `${height - borderWidth}px`;
    }, [numCols, numRows, cursorEl]);

    useEffect(() => {
        if (!cursorEl || mode === "Selection" && active) {
            return;
        }

        cursorEl.style.top = `${cursorPos.y}px`;
        cursorEl.style.left = `${cursorPos.x}px`;
    }, [cursorPos, cursorEl]);
    
    const paintOnCanvas = () => {
        if (!graphicCanvas || !cursorEl) {
            return;
        }

        const ctx = graphicCanvas.getContext("2d");
        if (!ctx) {
            return;
        }

        const posX = parseFloat(cursorEl.style.left);
        const posY = parseFloat(cursorEl.style.top);
        const borderWidth = parseFloat(getComputedStyle(cursorEl).borderWidth);
        const width = parseFloat(cursorEl.style.width) + borderWidth;
        const height = parseFloat(cursorEl.style.height) + borderWidth;

        ctx.fillStyle = color;
        ctx.fillRect(posX, posY, width, height);
        ctx.fill();
    };

    const eraseOnCanvas = () => {
        if (!graphicCanvas || !cursorEl) {
            return;
        }

        const ctx = graphicCanvas.getContext("2d");
        if (!ctx) {
            return;
        }

        const posX = parseFloat(cursorEl.style.left);
        const posY = parseFloat(cursorEl.style.top);
        const borderWidth = parseFloat(getComputedStyle(cursorEl).borderWidth);
        const width = parseFloat(cursorEl.style.width) + borderWidth;
        const height = parseFloat(cursorEl.style.height) + borderWidth;

        ctx.clearRect(posX, posY, width, height);
    };

    const selectColor = () => {
        if (!graphicCanvas || !cursorEl) {
            return;
        }

        const ctx = graphicCanvas.getContext("2d");
        if (!ctx) {
            return;
        }

        const posX = parseFloat(cursorEl.style.left);
        const posY = parseFloat(cursorEl.style.top);
        const [r, g, b] = ctx.getImageData(posX, posY, 1, 1).data;
        const newColor = rgbToHex(r, g, b);
        
        setColor(newColor);
    };

    const resizeSelectionArea = () => {
        if (!cursorEl) {
            return;
        }

        const { x, y } = mousePos;
        const left = parseFloat(cursorEl.style.left);
        const top = parseFloat(cursorEl.style.top);

        const pixel = getPixelSize();
        let width = Math.round((x - left)/pixel.width) * pixel.width;
        let height = Math.round((y - top)/pixel.height) * pixel.height;

        width = width < pixel.width ? pixel.width : width;
        height = height < pixel.height ? pixel.height : height;

        cursorEl.style.width = `${width}px`;
        cursorEl.style.height = `${height}px`;
    };

    const fillWithColor = () => {
        if (!graphicCanvas || !cursorEl) {
            return;
        }

        const ctx = graphicCanvas.getContext("2d");
        if (!ctx) {
            return;
        }

        const posX = parseFloat(cursorEl.style.left);
        const posY = parseFloat(cursorEl.style.top);
        const pixel = ctx.getImageData(posX, posY, 1, 1).data;
        const [r, g, b] = pixel;
        const color = rgbToHex(r, g, b);

        console.log(pixel);
        console.log(color);
    };

    const handleCursorAction = () => {
        switch (mode) {
            case "Paint":
                paintOnCanvas();
                break;
            case "Erase":
                eraseOnCanvas();
                break;
            case "ColorPicker": 
                selectColor();
                break;
            case "Selection":
                resizeSelectionArea();
                break;
            case "Fill":
                fillWithColor();
                break;
            default:
                break;
        }
    };

    const activateCursor = () => setActive(true);
    const deactivateCursor = () => setActive(false);

    useEffect(() => {
        if (!cursorEl) {
            return;
        }

        cursorEl.removeEventListener("mousedown", activateCursor);
        cursorEl.addEventListener("mousedown", activateCursor);

        cursorEl.removeEventListener("mouseup", deactivateCursor);
        cursorEl.addEventListener("mouseup", deactivateCursor);
    }, [cursorEl]);
    
    useInterval((id: NodeJS.Timer) => {
        if (active) {
            handleCursorAction();
        } else {
            clearInterval(id);
        }
    }, 0, [active]);
    
    useEffect(() => {
        if (!cursorEl) {
            return;
        }

        switch (mode) {
            case "Selection":
                cursorEl.style.borderStyle = "dotted";
                break;
            default:
                cursorEl.style.borderStyle = "solid";
                break;
        }
    }, [mode]);

    return (
        <CursorContext.Provider value={{
            cursorEl,
            setCursorEl,
            
            mode,
            setMode,

            color,
            setColor,

            activateCursor,
            deactivateCursor
        }}>
            {props.children}
        </CursorContext.Provider>
    );
}

export { CursorContext, CursorProvider };