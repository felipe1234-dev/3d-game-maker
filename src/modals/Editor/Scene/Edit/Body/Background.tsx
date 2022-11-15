import { useState, useEffect } from "react";
import { TextField, MenuItem } from "@mui/material";

import { Game } from "@local/classes";
import { useGame } from "@local/contexts";
import { Media } from "@local/api/models";
import {
    ColorInput,
    MediaModal,
    MediaPreview
} from "@local/components";
import { t } from "@local/i18n";

import backgroundTypes from "@local/consts/editor/types/background";

function Background() {
    const { game } = useGame();
    const defaultColor = "#" + Game.Scene.DEFAULT_BACKGROUND.getHexString();

    const [openModal, setOpenModal] = useState<boolean>(false);
    const [bgType, setBgType] = useState("default");
    const [bgColor, setBgColor] = useState<string>();
    const [bgImage, setBgImage] = useState<Media>();

    useEffect(() => {
        if (!game || !game.currentScene) return;
        const { currentScene } = game;

        if (currentScene.background instanceof Game.Color) {
            const color = "#" + currentScene.background.getHexString();

            if (color !== defaultColor) {
                setBgType("color");
                setBgColor(color);
            }
        }

        if (currentScene.background instanceof Game.Texture) {
            if (Media.testType(currentScene.background.userData)) {
                const media = currentScene.background.userData;
                setBgImage(media);

                if (currentScene.background.mapping === Game.UVMapping) {
                    setBgType("uvTexture");
                }

                if (
                    currentScene.background.mapping ===
                    Game.EquirectangularReflectionMapping
                ) {
                    setBgType("equirectTexture");
                }
            }
        }
    }, [game]);

    useEffect(() => {
        if (!game || !game.currentScene) return;
        const { currentScene } = game;

        switch (bgType) {
            case "color":
                currentScene.background = new Game.Color(bgColor);
                break;
            case "equirectTexture":
            case "uvTexture":
                if (!bgImage) {
                    setOpenModal(true);
                } else {
                    setOpenModal(false);

                    Game.Texture.fromURL(bgImage.url).then((texture) => {
                        texture.name = bgImage.title;
                        texture.userData = { ...bgImage };

                        if (bgType === "uvTexture") {
                            texture.mapping = Game.UVMapping;
                        } else if (bgType === "equirectTexture") {
                            texture.mapping = Game.EquirectangularReflectionMapping;
                        } else {
                            texture.mapping = Game.Texture.DEFAULT_MAPPING;
                        }

                        currentScene.background = texture;
                        currentScene.background.needsUpdate = true;
                    });
                }
                break;
            default:
                currentScene.background = Game.Scene.DEFAULT_BACKGROUND;
                break;
        }
    }, [bgColor, bgType, bgImage]);

    return (
        <div style={{ paddingBottom: 10 }}>
            <TextField
                select
                label={t("Background")}
                onChange={evt => setBgType(evt.target.value)}
                value={bgType}
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

            {["uvTexture", "equirectTexture"].includes(bgType) && bgImage && (
                <MediaPreview
                    onChange={() => setOpenModal(true)}
                    value={bgImage}
                />
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