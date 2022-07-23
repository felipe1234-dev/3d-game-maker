import React from "react";
import { Box, IconButton, Tooltip } from "@mui/material";
import {
    DeleteOutlineRounded as TrashIcon,
    OpenWithRounded as MoveIcon,
    FitScreenRounded as ResizeIcon,
    CropRotateRounded as RotateIcon
} from "@mui/icons-material";
import { EditorContext } from "@local/contexts";

function Top() {
    const [isDisabled, setIsDisabled] = React.useState<boolean>(true);
    const [mode, setMode] = React.useState<string>("translate");
    const editor = React.useContext(EditorContext);
    
    const onSetMode = (mode: "translate" | "rotate" | "scale") => {
        if (isDisabled) {
            return;
        }
        
        if (!editor) {
            return;
        }
        
        editor.transformControls.setMode(mode);
        setMode(mode);
    }
    
    const onSetStates = () => {
        if (!editor) {
            return;
        }
        
        setIsDisabled(!editor.transformControls.object);
        setMode(editor.transformControls.mode);
    }
    
    React.useEffect(() => {
        if (!editor) {
            return;
        }
        
        const { transformControls: transform } = editor;
        const events = ["select", "unselect", "set-mode"]; 
        
        events.forEach((type) => {
            if (!transform.hasEventListener(type, onSetStates)) {
                transform.addEventListener(type, onSetStates);
                transform.dispatchEvent({ type });
            }
        });
    }, [editor]);
    
    return (
        <Box>
            <Tooltip title="Delete object" placement="left" arrow>
                <span>
                    <IconButton
                        aria-label="Delete object"
                        onClick={() => editor?.transformControls.delete()}
                        disabled={isDisabled}
                    >
                        <TrashIcon />
                    </IconButton>
                </span>
            </Tooltip>
            <Tooltip title="Move object" placement="left" arrow>
                <span>
                    <IconButton
                        aria-label="Move object"
                        onClick={() => onSetMode("translate")}
                        data-selected={mode === "translate"}
                        disabled={isDisabled}
                    >
                        <MoveIcon />
                    </IconButton>
                </span>
            </Tooltip>
            <Tooltip title="Resize object" placement="left" arrow>
                <span>
                    <IconButton
                        aria-label="Resize object"
                        onClick={() => onSetMode("scale")}
                        data-selected={mode === "scale"}
                        disabled={isDisabled}
                    >
                        <ResizeIcon />
                    </IconButton>
                </span>
            </Tooltip>
            <Tooltip title="Rotate object" placement="left" arrow>
                <span>
                    <IconButton
                        aria-label="Rotate object"
                        onClick={() => onSetMode("rotate")}
                        data-selected={mode === "rotate"}
                        disabled={isDisabled}
                    >
                        <RotateIcon />
                    </IconButton>
                </span>
            </Tooltip>
        </Box>
    );
}

export default Top;