import React, { 
    createContext, 
    useEffect, 
    useState 
} from "react";

interface GraphicContextValue {
    graphicCanvas: HTMLCanvasElement | null;
    setGraphicCanvas: (el: HTMLCanvasElement | null) => void;
    
    canvasContainer: HTMLDivElement | null;
    setCanvasContainer: (el: HTMLDivElement | null) => void;

    bgCanvas: HTMLCanvasElement | null;
    setBgCanvas: (el: HTMLCanvasElement | null) => void;
    
    numCols: number; 
    setNumCols: (cols: number) => void;

    numRows: number; 
    setNumRows: (rows: number) => void;

    getGraphicSize: () => {
        width: number;
        height: number;
    };
    getPixelSize: () => {
        width: number;
        height: number;
    }
}

const GraphicContext = createContext<GraphicContextValue>({
    graphicCanvas: null,
    setGraphicCanvas: () => {},
    
    canvasContainer: null,
    setCanvasContainer: () => {},

    bgCanvas: null,
    setBgCanvas: () => {},
    
    numCols: 100, 
    setNumCols: () => {},

    numRows: 100, 
    setNumRows: () => {},

    getGraphicSize: () => ({
        width: 0,
        height: 0,
    }),
    getPixelSize: () => ({
        width: 0,
        height: 0,
    })
});

const colors = {
    dark: "#777777",
    light: "#999999"
};

function GraphicProvider(props: { children: React.ReactNode }) {
    const [graphicCanvas, setGraphicCanvas] = useState<HTMLCanvasElement | null>(null);
    const [canvasContainer, setCanvasContainer] = useState<HTMLDivElement | null>(null);
    const [bgCanvas, setBgCanvas] = useState<HTMLCanvasElement | null>(null);

    const [numCols, setNumCols] = useState(100);
    const [numRows, setNumRows] = useState(100);

    const getGraphicSize = () => ({
        width: canvasContainer?.clientWidth || 0,
        height: canvasContainer?.clientHeight || 0
    });

    const getPixelSize = () => ({
        width: getGraphicSize().width/numRows,
        height: getGraphicSize().height/numCols
    });

    const createCheckeredBg = () => {
        if (!canvasContainer || !bgCanvas || !graphicCanvas) {
            return;
        }

        bgCanvas.width = getGraphicSize().width;
        bgCanvas.height = getGraphicSize().height;
        
        const graphicArea = getGraphicSize();

        const cachedGraphic = document.createElement("canvas");
        cachedGraphic.width = graphicArea.width;
        cachedGraphic.height = graphicArea.height;
        cachedGraphic.getContext("2d")?.drawImage(graphicCanvas, 0, 0);

        graphicCanvas.width = graphicArea.width;
        graphicCanvas.height = graphicArea.height;

        if (cachedGraphic.width > 0 && cachedGraphic.height > 0) {
            graphicCanvas.getContext("2d")?.drawImage(cachedGraphic, 0, 0);
        }
        
        const ctx = bgCanvas.getContext("2d");
        if (!ctx) {
            return;
        }

        const startColor = colors.light;
        let lastColor = startColor;

        for (let row = 0; row < numRows; ++row) {
            for (let col = 0; col < numCols; ++col) {
                const { width, height } = getPixelSize();
                const { dark, light } = colors;
                const isFirstCol = col === 0;

                const posX = col * width;
                const posY = row * height;
                const color = isFirstCol 
                    ? lastColor 
                    : lastColor === dark ? light : dark;

                ctx.fillStyle = color;
                ctx.fillRect(posX, posY, width, height);

                lastColor = color;
            }
        }

        ctx.fill();
    };

    useEffect(() => {
        if (!canvasContainer || !bgCanvas || !graphicCanvas) {
            return;
        }

        new ResizeObserver(createCheckeredBg).observe(canvasContainer);
    }, [
        canvasContainer, 
        bgCanvas,
        graphicCanvas
    ]);

    useEffect(() => {
        createCheckeredBg();
    }, [ 
        numCols,
        numRows, 
        bgCanvas,
        graphicCanvas,
        canvasContainer 
    ]);

    return (
        <GraphicContext.Provider value={{
            graphicCanvas,
            setGraphicCanvas,
            
            canvasContainer,
            setCanvasContainer,

            bgCanvas,
            setBgCanvas,
            
            numCols,
            setNumCols,

            numRows,
            setNumRows,

            getGraphicSize,
            getPixelSize
        }}>
            {props.children}
        </GraphicContext.Provider>
    );
}

export { GraphicContext, GraphicProvider };