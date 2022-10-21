import { useEffect } from "react";
import { Box, IconButton, Tooltip } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import {
    AddRounded as ZoomInIcon,
    RemoveRounded as ZoomOutIcon,
    ViewInAr as CubeIcon,
    InterestsRounded as ShapeIcon,
    TextureRounded as TextureIcon,
} from "@mui/icons-material";
import {
    Atom as AtomIcon
} from "@styled-icons/fa-solid";

import { Game } from "@local/classes";
import { Pressable } from "@local/components";
import {
    useUnmount,
    useForceUpdate
} from "@local/hooks";
import {
    useEditor,
    useGame
} from "@local/contexts";
import { t } from "@local/i18n";

function Bottom() {
    const location = useLocation();
    const editor = useEditor();
    const game = useGame();
    const { forceUpdate } = useForceUpdate();
    const transformer = editor.transformControls;

    const zoomSpeed = 50;
    const selectedObject = transformer.object;
    const isMesh = selectedObject instanceof Game.Mesh;

    const isSelected = !!selectedObject;
    const hasGeometry = isMesh;
    const hasTexture = isMesh;
    const hasPhysics = isMesh && !!selectedObject.body;

    const events = ["select", "unselect", "changeMode"];

    useEffect(() => {
        for (const event of events) {
            transformer.addEventListener(event, forceUpdate);
        }
    }, [game, editor]);

    useUnmount(() => {
        for (const event of events) {
            transformer.removeEventListener(event, forceUpdate);
        }
    });

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
                        disabled={!isSelected}
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
                        disabled={!hasGeometry}
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
                        disabled={!hasTexture}
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
                        disabled={!hasPhysics}
                    >
                        <AtomIcon width={24} />
                    </IconButton>
                </span>
            </Tooltip>
        </Box>
    );
}

export default Bottom;