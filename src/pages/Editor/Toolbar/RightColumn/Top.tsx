import { useEffect } from "react";
import { Box, IconButton, Tooltip } from "@mui/material";
import {
    DeleteOutlineRounded as TrashIcon,
    OpenWithRounded as MoveIcon,
    //FitScreenRounded as ResizeIcon,
    CropRotateRounded as RotateIcon,
} from "@mui/icons-material";
import { ShapePolygon } from "@styled-icons/boxicons-regular";
import { Link, useLocation } from "react-router-dom";

import { useEditor, useGame } from "@local/contexts";
import { useUnmount, useForceUpdate } from "@local/hooks";
import { t } from "@local/i18n";

function Top() {
    const { editor } = useEditor();
    const transformer = editor?.transformControls;
    const { game } = useGame();
    const { forceUpdate } = useForceUpdate();
    const location = useLocation();

    const isDisabled = !transformer?.object || transformer?.locked;
    const mode = transformer?.mode;

    const events = ["select", "unselect", "changeMode"];

    useEffect(() => {
        for (const event of events) {
            transformer?.addEventListener(event, forceUpdate);
        }
    }, [game]);

    useUnmount(() => {
        for (const event of events) {
            transformer?.removeEventListener(event, forceUpdate);
        }
    });

    return (
        <Box>
            <Tooltip title={t("Delete object")} placement="left" arrow>
                <span>
                    <IconButton
                        aria-label={t("Delete object")}
                        onClick={() => transformer?.delete()}
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
                        onClick={() => transformer?.setMode("translate")}
                        data-selected={mode === "translate"}
                        disabled={isDisabled}
                    >
                        <MoveIcon />
                    </IconButton>
                </span>
            </Tooltip>
            <Tooltip title={t("Rotate object")} placement="left" arrow>
                <span>
                    <IconButton
                        aria-label={t("Rotate object")}
                        onClick={() => transformer?.setMode("rotate")}
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
                        data-selected={transformer?.locked}
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