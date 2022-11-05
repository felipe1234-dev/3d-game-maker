import {
    FormGroup,
    FormControlLabel,
    Checkbox,
    TextField,
    MenuItem,
    Divider,
} from "@mui/material";

import { Game } from "@local/classes";
import { useGame } from "@local/contexts";
import { t } from "@local/i18n";
import { useForceUpdate } from "@local/hooks";

import shadowTypes from "@local/consts/editor/types/shadow";
import toneMappingTypes from "@local/consts/editor/types/toneMapping";

function Body() {
    const { game } = useGame();
    const { forceUpdate } = useForceUpdate();

    const handleRendererChange = (
        callback: (renderer: Game.Renderer) => void = () => { }
    ) => {
        if (!game || !game.renderer) return;

        callback(game.renderer);

        forceUpdate();
    };

    return (
        <>
            <FormGroup>
                <FormControlLabel
                    label={t("Physically correct lights")}
                    control={
                        <Checkbox
                            onChange={evt => {
                                handleRendererChange(renderer => {
                                    renderer.physicallyCorrectLights = evt.target.checked;
                                });
                            }}
                            checked={
                                !!game?.renderer?.physicallyCorrectLights
                            }
                        />
                    }
                />
            </FormGroup>
            <FormGroup>
                <FormControlLabel
                    label={t("Enable shadows")}
                    control={
                        <Checkbox
                            onChange={evt => {
                                handleRendererChange(renderer => {
                                    renderer.shadowMap.enabled = evt.target.checked;
                                });
                            }}
                            checked={
                                !!game?.renderer?.shadowMap.enabled
                            }
                        />
                    }
                />
            </FormGroup>
            <Divider />
            <TextField
                select
                label={t("Shadow map type")}
                onChange={evt => {
                    handleRendererChange(renderer => {
                        renderer.shadowMap.type = Number(evt.target.value);
                    });
                }}
                value={
                    game?.renderer?.shadowMap.type
                }
            >
                {shadowTypes.map(option => (
                    <MenuItem key={option.label} value={option.value}>
                        {t(option.label)}
                    </MenuItem>
                ))}
            </TextField>
            <Divider />
            <TextField
                label={t("Tone mapping exposure")}
                onChange={evt => {
                    handleRendererChange(renderer => {
                        renderer.toneMappingExposure = Number(evt.target.value);
                    });
                }}
                value={
                    game?.renderer?.toneMappingExposure
                }
                inputProps={{
                    type: "number",
                    step: 0.1,
                    min: 0,
                }}
            />
            <Divider />
            <TextField
                select
                label={t("Tone mapping type")}
                onChange={evt => {
                    handleRendererChange(renderer => {
                        renderer.toneMapping = Number(evt.target.value);
                    });
                }}
                value={
                    game?.renderer?.toneMapping
                }
            >
                {toneMappingTypes.map(option => (
                    <MenuItem key={option.label} value={option.value}>
                        {t(option.label)}
                    </MenuItem>
                ))}
            </TextField>
        </>
    );
}

export default Body;