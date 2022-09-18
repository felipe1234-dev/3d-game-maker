import { useEffect, useState } from "react";
import { Box, IconButton, Tooltip } from "@mui/material";
import {
    DeleteOutlineRounded as TrashIcon,
    OpenWithRounded as MoveIcon,
    //FitScreenRounded as ResizeIcon,
    CropRotateRounded as RotateIcon,
} from "@mui/icons-material";
import { ShapePolygon } from "@styled-icons/boxicons-regular";
import { Link, useLocation } from "react-router-dom";

import { useEditor } from "@local/contexts";
import { Mode } from "@local/classes/Editor/EditorTransform.class";
import { t } from "@local/i18n";

function Top() {
    const [isDisabled, setIsDisabled] = useState<boolean>(true);
    const [mode, setMode] = useState<Mode>("translate");
    const editor = useEditor();
    const location = useLocation();

    const onSetStates = () => {
        setIsDisabled(!editor.transformControls.object);
        setMode(editor.transformControls.mode);
    };

    useEffect(() => {
        const { transformControls: transform } = editor;
        const events = ["select", "unselect", "setMode"];

        events.forEach(type => {
            transform.addEventListener(type, onSetStates);
            transform.dispatchEvent({ type });
        });
    }, [editor]);

    return (
        <Box>
            <Tooltip title={t("Delete object")} placement="left" arrow>
                <span>
                    <IconButton
                        aria-label={t("Delete object")}
                        onClick={() => editor.transformControls.delete()}
                        disabled={isDisabled}
                    >
                        <TrashIcon />
                    </IconButton>
                </span>
            </Tooltip>
            <Tooltip title={t("Move object")} placement="left" arrow>
                <span>
                    <IconButton
                        aria-label={t("Move object")}
                        onClick={() =>
                            editor.transformControls.setMode("translate")
                        }
                        data-selected={mode === "translate"}
                        disabled={isDisabled}
                    >
                        <MoveIcon />
                    </IconButton>
                </span>
            </Tooltip>
            {/* <Tooltip title={t("Resize object")} placement="left" arrow>
                <span>
                    <IconButton
                        aria-label={t("Resize object")}
                        onClick={() =>
                            editor.transformControls.setMode("scale")
                        }
                        data-selected={mode === "scale"}
                        disabled={isDisabled}
                    >
                        <ResizeIcon />
                    </IconButton>
                </span>
            </Tooltip> */}
            <Tooltip title={t("Rotate object")} placement="left" arrow>
                <span>
                    <IconButton
                        aria-label={t("Rotate object")}
                        onClick={() =>
                            editor.transformControls.setMode("rotate")
                        }
                        data-selected={mode === "rotate"}
                        disabled={isDisabled}
                    >
                        <RotateIcon />
                    </IconButton>
                </span>
            </Tooltip>
            <Tooltip title={t("Edit vertices")} placement="left" arrow>
                <span>
                    <IconButton
                        component={Link}
                        to="vertices/edit"
                        state={{
                            background: location,
                            useLoader: false,
                        }}
                        aria-label={t("Edit vertices")}
                        disabled={isDisabled}
                    >
                        <ShapePolygon width={24} />
                    </IconButton>
                </span>
            </Tooltip>
        </Box>
    );
}

export default Top;