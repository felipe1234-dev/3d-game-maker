import { GraphicProvider, CursorProvider } from "./contexts";

import Composer from "../Composer";
import CanvasContainer from "./CanvasContainer";
import LeftToolbar from "./LeftToolbar";

import "@local/styles/components/GraphicsEditor.scss";

function GraphicsEditorDom() {
    return (
        <div className="GraphicsEditor">
            <LeftToolbar />
            <CanvasContainer />
        </div>
    );
}

const GraphicsEditor = () => (
    <Composer components={[
        GraphicProvider, 
        CursorProvider
    ]}>
        <GraphicsEditorDom />
    </Composer>
);

export default GraphicsEditor;