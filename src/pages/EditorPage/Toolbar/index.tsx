import React from "react";
import { Box, IconButton } from "@mui/material";
import {
    AddRounded as ZoomInIcon,
    RemoveRounded as ZoomOutIcon
} from "@mui/icons-material";

import { Pressable } from "@local/components";
import { ScreenContext } from "@local/contexts";

function Toolbar() {
    const { screen } = React.useContext(ScreenContext);
    
    const onZoom = (type: "in" | "out") => {
        if (screen) {
            const wheelEvent = new WheelEvent("wheel", {
                deltaY: type === "in" ? -240 : +240,
                bubbles: true, 
                cancelable: true
            });
            screen.canvas.dispatchEvent(wheelEvent);
        }
    }
    
    return (
        <Box className="Editor-toolbar" component="aside">
            <Pressable 
                component={IconButton}
                aria-label="Zoom In"
                onMousePress={() => onZoom("in")}
                ms={50}
            >
                <ZoomInIcon />
            </Pressable>
            <Pressable 
                component={IconButton}
                aria-label="Zoom Out"
                onMousePress={() => onZoom("out")}
                ms={50}
            >
                <ZoomOutIcon />
            </Pressable>
        </Box>
    );
}

export default Toolbar;