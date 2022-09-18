import { useState, useEffect } from "react";
import { Box, Button, TextField, MenuItem, Typography } from "@mui/material";
import * as THREE from "three";

import { useGame } from "@local/contexts";
import { Media } from "@local/api/models";
import { ColorInput, MediaModal } from "@local/components";
import { Game } from "@local/classes";
import { t } from "@local/i18n";

import backgroundTypes from "@local/consts/editor/types/background";

function Background() {
    const game = useGame();
    const defaultColor = "#" + Game.Scene.DEFAULT_BACKGROUND.getHexString();

    const [openModal, setOpenModal] = useState<boolean>(false);
    const [bgType, setBgType] = useState<string>();
    const [bgColor, setBgColor] = useState<string>();
    const [bgImage, setBgImage] = useState<Media>();

    useEffect(() => {
        const { currentScene } = game;

        if (!currentScene) {
            return;
        }

        if (currentScene.background instanceof THREE.Color) {
            const color = "#" + currentScene.background.getHexString();

            if (color !== defaultColor) {
                setBgType("color");
                setBgColor(color);
            }
        }

        if (currentScene.background instanceof THREE.Texture) {
            if (Media.testType(currentScene.background.userData)) {
                const media = currentScene.background.userData;
                setBgImage(media);

                if (currentScene.background.mapping === THREE.UVMapping) {
                    setBgType("uvTexture");
                }

                if (
                    currentScene.background.mapping ===
                    THREE.EquirectangularReflectionMapping
                ) {
                    setBgType("equirectTexture");
                }
            }
        }
    }, [game]);

    useEffect(() => {
        const { currentScene } = game;

        if (!currentScene) {
            return;
        }

        switch (bgType) {
            case "color":
                currentScene.background = new THREE.Color(bgColor);
                break;
            case "equirectTexture":
            case "uvTexture":
                if (!bgImage) {
                    setOpenModal(true);
                } else {
                    setOpenModal(false);

                    currentScene.background = new THREE.TextureLoader().load(
                        bgImage.url
                    );
                    currentScene.background.name = bgImage.title;
                    currentScene.background.userData = { ...bgImage };

                    currentScene.background.mapping =
                        bgType === "uvTexture"
                            ? THREE.UVMapping
                            : bgType === "equirectTexture"
                            ? THREE.EquirectangularReflectionMapping
                            : THREE.Texture.DEFAULT_MAPPING;
                }
                break;
            default:
                currentScene.background = Game.Scene.DEFAULT_BACKGROUND;
                break;
        }
    }, [bgColor, bgType, bgImage]);

    return (
        <div style={{ paddingTop: 10 }}>
            <TextField
                select
                label={t("Background")}
                onChange={evt => setBgType(evt.target.value)}
                value={bgType ?? "default"}
            >
                {backgroundTypes.map((value, i) => (
                    <MenuItem key={i} value={value}>
                        {t(value)}
                    </MenuItem>
                ))}
            </TextField>

            {bgType === "color" && (
                <ColorInput
                    variant="outlined"
                    onChange={color => setBgColor(color)}
                    value={bgColor ?? defaultColor}
                />
            )}

            {bgType &&
                ["uvTexture", "equirectTexture"].includes(bgType) &&
                bgImage && (
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            margin: "10px 0",
                        }}
                    >
                        <Typography variant="subtitle1" component="p">
                            {bgImage.title} ({bgImage.mimeType})
                        </Typography>

                        <Button onClick={() => setOpenModal(true)}>
                            {t("Change image")}
                        </Button>
                    </Box>
                )}

            {openModal && bgType === "uvTexture" && (
                <MediaModal
                    title={t("Upload an image")}
                    onClose={() => setOpenModal(false)}
                    onFinish={media => setBgImage(media)}
                    folders="textures/uv"
                />
            )}

            {openModal && bgType === "equirectTexture" && (
                <MediaModal
                    title={t("Upload an image")}
                    onClose={() => setOpenModal(false)}
                    onFinish={media => setBgImage(media)}
                    folders="textures/equirec"
                />
            )}
        </div>
    );
}

export default Background;