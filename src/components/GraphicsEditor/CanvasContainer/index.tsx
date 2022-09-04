import { useContext } from "react";
import { GraphicContext, CursorContext } from "../contexts";

function CanvasContainer() {
    const { setCursorEl } = useContext(CursorContext);
    const { 
        setGraphicCanvas, 
        setCanvasContainer, 
        setBgCanvas 
    } = useContext(GraphicContext);

    return (
        <div ref={el => setCanvasContainer(el)} className="GraphicsEditor-canvasContainer">
            <canvas
                ref={el => setBgCanvas(el)}
                className="GraphicsEditor-canvasContainer-checkeredBg"
            />
            <canvas
                ref={el => setGraphicCanvas(el)}
                className="GraphicsEditor-canvasContainer-graphic"
            />
            <div
                ref={el => setCursorEl(el)}
                className="GraphicsEditor-canvasContainer-cursor"
            />
        </div>
    );
}

export default CanvasContainer;