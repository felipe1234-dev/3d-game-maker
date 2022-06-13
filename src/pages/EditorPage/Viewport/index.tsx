import React from "react";
import { Box } from "@mui/material";

function Viewport() {
    const viewerElement = React.useRef<HTMLElement>();
    
    React.useEffect(() => {
        if (viewerElement.current) {
            // TODO: Render 3D model
            viewerElement.current.innerHTML = "<h1>Hello, world!</h1>";
        }
    }, [viewerElement]);
    
    return (
        <Box ref={viewerElement} component="section" className="Editor-viewport">
        </Box>
    );
}

export default Viewport;