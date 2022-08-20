import { useContext, useEffect, useState } from "react";
import {
    TextField,
    MenuItem,
    Checkbox,
    FormControlLabel,
    InputAdornment,
    Box
} from "@mui/material";
import { HelpCircle as HelpIcon } from "@styled-icons/feather";
import * as THREE from "three";

import { environmentTypes } from "@local/consts";
import { GameContext, I18nContext } from "@local/contexts";
import { Helper, MediaModal } from "@local/components";
import { Media } from "@local/api/models";
import { Game } from "@local/classes";

function Environment() {
    const game = useContext(GameContext);
    const i18n = useContext(I18nContext);
    const scope = "modals.editScene.body.environment.";

    const [openModal, setOpenModal] = useState<boolean>(false);
    const [envType, setEnvType] = useState<string>();
    const [envImage, setEnvImage] = useState<Media>();
    const [refract, setRefract] = useState<boolean>(false);

    useEffect(() => {
        if (!game) {
            return;
        }

        const { currentScene } = game;

        if (!currentScene) {
            return;
        }

        if (currentScene.environment instanceof THREE.Texture) {
            const env = currentScene.environment;

            if (env.mapping === THREE.UVMapping) {
                setEnvType("uvMapping");
            } else if (
                [
                    THREE.EquirectangularReflectionMapping,
                    THREE.EquirectangularRefractionMapping
                ].includes(env.mapping)
            ) {
                setEnvType("equirectMapping");
                setRefract(env.mapping === THREE.EquirectangularRefractionMapping);
            }

            if (Media.testType(env.userData)) {
                setEnvImage(env.userData);
            }
        } else {
            setEnvType("none");
        }
    }, [game]);

    useEffect(() => {
        if (!game) {
            return;
        }

        const { currentScene } = game;

        if (!currentScene) {
            return;
        }

        switch (envType) {
            case "uvMapping":
            case "equirectMapping":
                if (!envImage) {
                    setOpenModal(true); 
                } else {
                    setOpenModal(false);
                    
                    const texture = new THREE.TextureLoader().load(envImage.url);
                    currentScene.environment = texture;

                    currentScene.environment.name = envImage.title;
                    currentScene.environment.userData = { ...envImage };

                    let mappingType = THREE.Texture.DEFAULT_MAPPING;

                    if (envType === "uvMapping") {
                        mappingType = THREE.UVMapping;
                    } else if (envType === "equirectMapping") {
                        mappingType = refract 
                            ? THREE.EquirectangularRefractionMapping 
                            : THREE.EquirectangularReflectionMapping;
                    }

                    currentScene.environment.mapping = mappingType;
                }
                break;
                
            default:
                currentScene.environment = Game.Scene.DEFAULT_ENVIRONMENT;
                break;
        }
    }, [envType, envImage, refract]);

    return (
        <div style={{ paddingTop: 10 }}>
            <TextField
                select
                label={i18n.get(scope + "type.label")}
                onChange={evt => setEnvType(evt.target.value)}
                value={envType ?? "none"}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <Helper text={i18n.get(scope + "type.help")} placement="top" arrow>
                                <HelpIcon style={{ width: 30, cursor: "pointer" }} />
                            </Helper>
                        </InputAdornment>
                    )
                }}
            >
                {environmentTypes.map((value, i) => (
                    <MenuItem key={i} value={value}>
                        {i18n.get(`consts.editor.environmentTypes[${i}]`)}
                    </MenuItem>
                ))}
            </TextField>
            
            {(openModal && envType === "uvMapping") && (
                <MediaModal
                    title="Upload an image"
                    onClose={() => setOpenModal(false)}
                    onFinish={media => setEnvImage(media)}
                    folders="textures/uv"
                />
            )}

            {(openModal && envType === "equirectMapping") && (
                <MediaModal
                    title="Upload an image"
                    onClose={() => setOpenModal(false)}
                    onFinish={media => setEnvImage(media)}
                    folders="textures/equirec"
                />
            )}

            {(envType && !["none", "uvMapping"].includes(envType)) && (
                <FormControlLabel
                    label="Refraction"
                    control={(
                        <Checkbox
                            onChange={evt => setRefract(evt.target.checked)}
                            checked={refract}
                        />
                    )}
                />
            )}
        </div>
    );
}

export default Environment;