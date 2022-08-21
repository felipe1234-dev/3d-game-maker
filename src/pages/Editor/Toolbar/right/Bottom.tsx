// Libs
import { useContext, useEffect, useState } from "react";
import { Box, IconButton, Tooltip } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import {
    AddRounded as ZoomInIcon,
    RemoveRounded as ZoomOutIcon,
    ViewInAr as CubeIcon,
    InterestsRounded as ShapeIcon,
    TextureRounded as TextureIcon
} from "@mui/icons-material";
import { t } from "@local/i18n";

// Local components
import { Pressable } from "@local/components";

// Local contexts
import { EditorContext } from "@local/contexts";

function Bottom() {
    const [isDisabled, setIsDisabled] = useState<boolean>(true);
    const [zoomSpeed, setZoomSpeed] = useState<number>(50);
    const location = useLocation();
    const editor = useContext(EditorContext);
    
    const onEnableButtons = () => {
        if (!editor) {
            return;
        }
        
        setIsDisabled(!editor.transformControls.object);
    }
    
    useEffect(() => {
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
                onMousePress={() => editor?.orbitControls.zoomIn()}
                ms={zoomSpeed}
            >
                <Tooltip title={t("Zoom In")} placement="left" arrow>
                    <ZoomInIcon />
                </Tooltip>
            </Pressable>
            <Pressable 
                component={IconButton}
                onMousePress={() => editor?.orbitControls.zoomOut()}
                ms={zoomSpeed}
            >
                <Tooltip title={t("Zoom Out")} placement="left" arrow>
                    <ZoomOutIcon />
                </Tooltip>
            </Pressable>
            
            <Tooltip title={t("Edit object")} placement="left" arrow>
                <span>
                    <IconButton
                        component={Link}
                        aria-label={t("Edit object")}
                        to="object/"
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
            <Tooltip title={t("Edit geometry")} placement="left" arrow>
                <span>
                    <IconButton
                        component={Link}
                        aria-label={t("Edit geometry")}
                        to="geometry/"
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
            <Tooltip title={t("Edit texture")} placement="left" arrow>
                <span>
                    <IconButton
                        component={Link}
                        aria-label={t("Edit texture")}
                        to="texture/"
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