import { 
    useContext, 
    useEffect, 
    useRef, 
    useState 
} from "react";
import { Box } from "@mui/material";

import { EditorContext } from "@local/contexts";
import { CursorTooltip } from "@local/components";
import { t } from "@local/i18n";

function Viewport() {
    const viewportElement = useRef<HTMLElement>();
    const editor = useContext(EditorContext);
    const [hideTooltip, setHideTooltip] = useState(true);
    
    useEffect(() => {
        const container = viewportElement.current;
        
        if (container && container.innerHTML.length === 0 && editor) {    
            const x = 0;
            const y = 10;
            const z = 10;
            editor.camera.position.set(x, y, z);
            editor.orbitControls.update();
            
            editor.renderer.container = container;
            editor.renderer.canvas?.addEventListener("pointermove", () => {
                const intersections = editor.transformControls.intersects;
                setHideTooltip(intersections.length < 1);
            });
            editor.renderer.startAnimation(() => {
                
            });
            
            console.log(editor);
        }
    }, [viewportElement, editor]);
    
    const intersections = editor?.transformControls.intersects || [];
    const { object } = intersections[0] || {};

    return (
        <CursorTooltip
            title={object?.name || t("No name")} 
            hide={hideTooltip} 
            offsetX={30}
            offsetY={-10}
        >
            {props => (
                <Box    
                    ref={viewportElement} 
                    component="section" 
                    className="Editor-viewport"
                    {...props}
                />
            )}
        </CursorTooltip>
    );
}

export default Viewport;