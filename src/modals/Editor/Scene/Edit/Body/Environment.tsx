import { useEffect, useState } from "react";
import {
    TextField,
    MenuItem,
    Checkbox,
    FormControlLabel,
    InputAdornment,
    Box,
    Button,
    Typography,
} from "@mui/material";
import { HelpCircle as HelpIcon } from "@styled-icons/feather";

import { useGame } from "@local/contexts";
import { Helper, MediaModal } from "@local/components";
import { Media } from "@local/api/models";
import { Game } from "@local/classes";
import { t } from "@local/i18n";

import mappingTypes from "@local/consts/editor/types/mapping";

function Environment() {
    const { game } = useGame();

    const [openModal, setOpenModal] = useState(false);
    const [envType, setEnvType] = useState<string>();
    const [envImage, setEnvImage] = useState<Media>();
    const [refract, setRefract] = useState(false);

    useEffect(() => {
        if (!game || !game.currentScene) return;
        const { currentScene } = game;

        if (currentScene.environment instanceof Game.Texture) {
            const env = currentScene.environment;

            if (env.mapping === Game.UVMapping) {
                setEnvType("uvMapping");
            } else if (
                [
                    Game.EquirectangularReflectionMapping,
                    Game.EquirectangularRefractionMapping,
                ].includes(env.mapping)
            ) {
                setEnvType("equirectMapping");
                setRefract(
                    env.mapping === Game.EquirectangularRefractionMapping
                );
            }

            if (Media.testType(env.userData)) {
                setEnvImage(env.userData);
            }
        } else {
            setEnvType("none");
        }
    }, [game]);

    useEffect(() => {
        if (!game || !game.currentScene) return;
        const { currentScene } = game;

        switch (envType) {
            case "uvMapping":
            case "equirectMapping":
                if (!envImage) {
                    setOpenModal(true);
                } else {
                    setOpenModal(false);

                    Game.Texture.fromURL(envImage.url).then((texture) => {
                        texture.name = envImage.title;
                        texture.userData = { ...envImage };

                        let mappingType = Game.Texture.DEFAULT_MAPPING;

                        if (envType === "uvMapping") {
                            mappingType = Game.UVMapping;
                        } else if (envType === "equirectMapping") {
                            mappingType = refract
                                ? Game.EquirectangularRefractionMapping
                                : Game.EquirectangularReflectionMapping;
                        }

                        texture.mapping = mappingType;

                        currentScene.environment = texture;
                    });
                }
                break;

            default:
                currentScene.environment = Game.Scene.DEFAULT_ENVIRONMENT;
                break;
        }
    }, [envType, envImage, refract]);

    return (
        <div style={{ paddingTop: 10, paddingBottom: 10 }}>
            <TextField
                select
                label={t("Environment")}
                onChange={evt => setEnvType(evt.target.value)}
                value={envType ?? "none"}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <Helper
                                text={t(
                                    `The image that all objects in the scene will reflect by default. 
                                    You can change this for individual objects.`
                                )}
                                placement="top"
                                arrow
                            >
                                <HelpIcon
                                    style={{ width: 30, cursor: "pointer" }}
                                />
                            </Helper>
                        </InputAdornment>
                    ),
                }}
            >
                {mappingTypes.map((value, i) => (
                    <MenuItem key={i} value={value}>
                        {t(value)}
                    </MenuItem>
                ))}
            </TextField>

            {envType &&
                ["uvMapping", "equirectMapping"].includes(envType) &&
                envImage && (
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            margin: "10px 0",
                        }}
                    >
                        <Typography variant="subtitle1" component="p">
                            {envImage.title} ({envImage.mimeType})
                        </Typography>

                        <Button onClick={() => setOpenModal(true)}>
                            {t("Change image")}
                        </Button>
                    </Box>
                )}

            {openModal && envType === "uvMapping" && (
                <MediaModal
                    title={t("Upload an image")}
                    onClose={() => setOpenModal(false)}
                    onFinish={media => setEnvImage(media)}
                    folders="textures/uv"
                />
            )}

            {openModal && envType === "equirectMapping" && (
                <MediaModal
                    title={t("Upload an image")}
                    onClose={() => setOpenModal(false)}
                    onFinish={media => setEnvImage(media)}
                    folders="textures/equirec"
                />
            )}

            {envType && !["none", "uvMapping"].includes(envType) && (
                <FormControlLabel
                    label={t("Refraction")}
                    control={
                        <Checkbox
                            onChange={evt => setRefract(evt.target.checked)}
                            checked={refract}
                        />
                    }
                />
            )}
        </div>
    );
}

export default Environment;