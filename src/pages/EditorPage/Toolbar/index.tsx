import { Box, IconButton } from "@mui/material";
import {
    AddRounded as ZoomInIcon,
    RemoveRounded as ZoomOutIcon
} from "@mui/icons-material";

import { Pressable } from "@local/components";

function Toolbar() {
    return (
        <Box className="Editor-toolbar" component="aside">
            <Pressable 
                component={IconButton}
                aria-label="Zoom In"
                onMousePress={() => console.log("Zoom in")}
            >
                <ZoomInIcon />
            </Pressable>
            <Pressable 
                component={IconButton}
                aria-label="Zoom Out"
                onMousePress={() => console.log("Zoom out")}
            >
                <ZoomOutIcon />
            </Pressable>
        </Box>
    );
}

export default Toolbar;