import React from "react";
import { Box } from "@mui/material";

import { EditorContext } from "@local/contexts";

function Viewport() {
    const viewportElement = React.useRef<HTMLElement>();
    const editor = React.useContext(EditorContext);
    
    React.useEffect(() => {
        const container = viewportElement.current;
        
        if (container && container.innerHTML.length === 0 && editor) {
            const x = 0;
            const y = 10;
            const z = 10;
            editor.camera.position.set(x, y, z);
            editor.orbitControls.update();
            
            editor.renderer.container = container;
            editor.renderer.startAnimation(() => {
                
            });
            
            console.log(editor);
        }
    }, [viewportElement, editor]);
    
    return (
        <Box ref={viewportElement} component="section" className="Editor-viewport">
        </Box>
    );
}

export default Viewport;