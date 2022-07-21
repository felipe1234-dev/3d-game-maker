// Libs
import React from "react";
import { Link } from "react-router-dom";
import { Box, IconButton, Tooltip } from "@mui/material";
import {
    AddRounded as ZoomInIcon,
    RemoveRounded as ZoomOutIcon,
    ViewInAr as CubeIcon,
    InterestsRounded as ShapeIcon,
    TextureRounded as TextureIcon
} from "@mui/icons-material";
import { useLocation } from "react-router-dom";

// Local components
import { Pressable } from "@local/components";

// Local contexts
import { EditorContext } from "@local/contexts";

function Bottom() {
    const [isDisabled, setIsDisabled] = React.useState<boolean>(true);
    const [zoomSpeed, setZoomSpeed] = React.useState<number>(50);
    const location = useLocation();
    const editor = React.useContext(EditorContext);
    
    const onEnableButtons = () => {
        if (!editor) {
            return;
        }
        
        setIsDisabled(!editor.transformControls.object);
    }
    
    React.useEffect(() => {
        if (!editor) {
            return;
        }
        
        const { transformControls: transform } = editor;
        
        // TODO: Set zoom speed on change
        
        const events = ["select", "unselect", "set-mode"];
        
        events.forEach((type) => {
            if (!transform.hasEventListener(type, onEnableButtons)) {
                transform.addEventListener(type, onEnableButtons);
                transform.dispatchEvent({ type });
            }
        });
    }, [editor]);
    
    return (
        <Box>
            <Pressable
                component={IconButton}
                aria-label="Zoom In"
                onMousePress={() => editor?.orbitControls.zoomIn()}
                ms={zoomSpeed}
            >
                <Tooltip title="Zoom In" placement="left">
                    <ZoomInIcon />
                </Tooltip>
            </Pressable>
            <Pressable 
                component={IconButton}
                aria-label="Zoom Out"
                onMousePress={() => editor?.orbitControls.zoomOut()}
                ms={zoomSpeed}
            >
                <Tooltip title="Zoom Out" placement="left">
                    <ZoomOutIcon />
                </Tooltip>
            </Pressable>
            
            <Tooltip title="Edit object" placement="left">
                <span>
                    <IconButton
                        component={Link}
                        aria-label="Edit object"
                        to="/editor/object/"
                        state={{
                            background: location,
                            useLoader: false
                        }}
                        disabled={isDisabled}
                    >
                        <CubeIcon />
                    </IconButton>
                </span>
            </Tooltip>
            <Tooltip title="Edit geometry" placement="left">
                <span>
                    <IconButton
                        component={Link}
                        aria-label="Edit geometry"
                        to="/editor/geometry/"
                        state={{
                            background: location,
                            useLoader: false
                        }}
                        disabled={isDisabled}
                    >
                        <ShapeIcon />
                    </IconButton>
                </span>
            </Tooltip>
            <Tooltip title="Edit texture" placement="left">
                <span>
                    <IconButton
                        component={Link}
                        aria-label="Edit texture"
                        to="/editor/texture/"
                        state={{
                            background: location,
                            useLoader: false
                        }}
                        disabled={isDisabled}
                    >
                        <TextureIcon />
                    </IconButton>
                </span>
            </Tooltip>
        </Box>
    );
}

export default Bottom;