// Libs
import { useEffect, useState } from "react";
import { Box, IconButton, Tooltip } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import {
    AddRounded as ZoomInIcon,
    RemoveRounded as ZoomOutIcon,
    ViewInAr as CubeIcon,
    InterestsRounded as ShapeIcon,
    TextureRounded as TextureIcon,
} from "@mui/icons-material";
import { Atom as AtomIcon } from "@styled-icons/fa-solid";

import { t } from "@local/i18n";
import { Pressable } from "@local/components";
import { useEditor } from "@local/contexts";

function Bottom() {
    const [editObjIsDisabled, setEditObjIsDisabled] = useState(true);
    const [editGeomIsDisabled, setEditGeomIsDisabled] = useState(true);
    const [editTextIsDisabled, setEditTextIsDisabled] = useState(true);
    const [zoomSpeed, setZoomSpeed] = useState(50);

    const location = useLocation();
    const editor = useEditor();

    const onEnableButtons = () => {
        const selectedObject = editor.transformControls.object;

        if (!selectedObject) {
            setEditObjIsDisabled(true);
            setEditGeomIsDisabled(true);
            setEditTextIsDisabled(true);
        } else {
            setEditObjIsDisabled(false);
            setEditGeomIsDisabled(!(selectedObject as any).geometry);
            setEditTextIsDisabled(!(selectedObject as any).material);
        }
    };

    useEffect(() => {
        const { transformControls: transform } = editor;

        // TODO: Set zoom speed on change

        const events = ["select", "unselect", "setMode"];

        events.forEach(type => {
            transform.addEventListener(type, onEnableButtons);
            transform.dispatchEvent({ type });
        });
    }, [editor]);

    return (
        <Box>
            <Pressable
                component={IconButton}
                onMousePress={() => editor.orbitControls.zoomIn()}
                ms={zoomSpeed}
            >
                <Tooltip title={t("Zoom In")} placement="left" arrow>
                    <ZoomInIcon />
                </Tooltip>
            </Pressable>
            <Pressable
                component={IconButton}
                onMousePress={() => editor.orbitControls.zoomOut()}
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
                        to="object/edit"
                        state={{
                            background: location,
                            useLoader: false,
                        }}
                        disabled={editObjIsDisabled}
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
                        to="geometry/edit"
                        state={{
                            background: location,
                            useLoader: false,
                        }}
                        disabled={editGeomIsDisabled}
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
                        to="texture/edit"
                        state={{
                            background: location,
                            useLoader: false,
                        }}
                        disabled={editTextIsDisabled}
                    >
                        <TextureIcon />
                    </IconButton>
                </span>
            </Tooltip>
            <Tooltip title={t("Edit physics")} placement="left" arrow>
                <span>
                    <IconButton
                        component={Link}
                        aria-label={t("Edit physics")}
                        to="physics/edit"
                        state={{
                            background: location,
                            useLoader: false,
                        }}
                        disabled={editTextIsDisabled}
                    >
                        <AtomIcon width={24} />
                    </IconButton>
                </span>
            </Tooltip>
        </Box>
    );
}

export default Bottom;