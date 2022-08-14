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
import { Helper } from "@local/components";

function Environment() {
    const game = useContext(GameContext);
    const i18n = useContext(I18nContext);
    const scope = "modals.editScene.body.environment.";

    const [envType, setEnvType] = useState<string>();
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
                setEnvType("equirec");
                setRefract(env.mapping === THREE.EquirectangularRefractionMapping);
            }
        } else {
            setEnvType("none");
        }
    }, [game]);

    return (
        <div style={{ paddingTop: 10 }}>
            <Box >
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
                {/*<Box sx={{ mr: 1, my: 0.5, cursor: "pointer" }}>
                    <Helper text={i18n.get(scope + "type.help")} placement="top" arrow>
                        <HelpIcon />
                    </Helper>
                </Box>*/}
            </Box>
            

            {envType !== "none" && (
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