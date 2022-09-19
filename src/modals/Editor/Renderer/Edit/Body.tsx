import { useState, useEffect } from "react";
import {
    FormGroup,
    FormControlLabel,
    Checkbox,
    TextField,
    MenuItem,
    Divider,
} from "@mui/material";

import { useGame } from "@local/contexts";
import { t } from "@local/i18n";

import shadowTypes from "@local/consts/editor/types/shadow";
import toneMappingTypes from "@local/consts/editor/types/toneMapping";

function Body() {
    const game = useGame();

    const [physicallyCorrectLights, setPhysicallyCorrectLights] = useState(
        game.renderer.physicallyCorrectLights
    );

    useEffect(() => {
        game.renderer.physicallyCorrectLights = physicallyCorrectLights;
    }, [physicallyCorrectLights]);

    const [enableShadows, setEnableShadows] = useState(
        game.renderer.shadowMap.enabled
    );

    useEffect(() => {
        game.renderer.shadowMap.enabled = enableShadows;
    }, [enableShadows]);

    const [toneMappingExposure, setToneMappingExposure] = useState(
        game.renderer.toneMappingExposure
    );

    useEffect(() => {
        game.renderer.toneMappingExposure = toneMappingExposure;
    }, [toneMappingExposure]);

    const [toneMappingType, setToneMappingType] = useState(
        game.renderer.toneMapping
    );

    useEffect(() => {
        game.renderer.toneMapping = toneMappingType;
    }, [toneMappingType]);

    const [shadowMapType, setShadowMapType] = useState(
        game.renderer.shadowMap.type
    );

    useEffect(() => {
        game.renderer.shadowMap.type = shadowMapType;
    }, [shadowMapType]);

    return (
        <>
            <FormGroup>
                <FormControlLabel
                    label={t("Physically correct lights")}
                    control={
                        <Checkbox
                            onChange={evt =>
                                setPhysicallyCorrectLights(evt.target.checked)
                            }
                            checked={physicallyCorrectLights}
                        />
                    }
                />
            </FormGroup>
            <FormGroup>
                <FormControlLabel
                    label={t("Enable shadows")}
                    control={
                        <Checkbox
                            onChange={evt =>
                                setEnableShadows(evt.target.checked)
                            }
                            checked={enableShadows}
                        />
                    }
                />
            </FormGroup>
            <Divider />
            <TextField
                select
                label={t("Shadow map type")}
                onChange={evt => setShadowMapType(Number(evt.target.value))}
                value={shadowMapType}
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
                onChange={evt =>
                    setToneMappingExposure(Number(evt.target.value))
                }
                value={toneMappingExposure}
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
                onChange={evt => setToneMappingType(Number(evt.target.value))}
                value={toneMappingType}
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