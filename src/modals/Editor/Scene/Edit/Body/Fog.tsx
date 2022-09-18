import { useState, useEffect } from "react";
import { TextField, MenuItem } from "@mui/material";

import * as THREE from "three";
import { ColorInput } from "@local/components";
import { t } from "@local/i18n";
import { Game } from "@local/classes";
import { useGame } from "@local/contexts";

import fogTypes from "@local/consts/editor/types/fog";

function Fog() {
    const game = useGame();

    const [type, setType] = useState<string>("default");
    // Misc
    const [color, setColor] = useState<string>("#000");
    // Linear
    const [near, setNear] = useState<number>(1);
    const [far, setFar] = useState<number>(10);
    // Exponential
    const [density, setDensity] = useState<number>(0.00025);

    useEffect(() => {
        const { currentScene } = game;
        if (!currentScene) {
            return;
        }

        if (!currentScene.fog) {
            if (currentScene.fog === Game.Scene.DEFAULT_FOG) {
                setType("default");
            } else {
                setType("none");
            }
        } else {
            setColor("#" + currentScene.fog.color.getHexString());

            if (currentScene.fog instanceof THREE.Fog) {
                setType("linear");
                setNear(currentScene.fog.near);
                setFar(currentScene.fog.far);
            }

            if (currentScene.fog instanceof THREE.FogExp2) {
                setType("exponential");
                setDensity(currentScene.fog.density);
            }
        }
    }, [game]);

    useEffect(() => {
        const { currentScene } = game;
        if (!currentScene) {
            return;
        }

        switch (type) {
            case "none":
                currentScene.fog = null;
                break;
            case "linear":
                if (!color) return;

                currentScene.fog = new THREE.Fog(color, near, far);
                break;
            case "exponential":
                if (!color) return;

                currentScene.fog = new THREE.FogExp2(color, density);
                break;
            case "default":
            default:
                currentScene.fog = Game.Scene.DEFAULT_FOG;
                break;
        }
    }, [type, color, near, far, density]);

    return (
        <div style={{ paddingTop: 10 }}>
            <TextField
                select
                label={t("Fog")}
                onChange={evt => setType(evt.target.value)}
                value={type}
            >
                {fogTypes.map((value, i) => (
                    <MenuItem key={i} value={value}>
                        {t(value)}
                    </MenuItem>
                ))}
            </TextField>

            {["linear", "exponential"].includes(type) && (
                <ColorInput
                    variant="outlined"
                    onChange={color => setColor(color)}
                    value={color}
                />
            )}

            {type === "linear" && (
                <>
                    <TextField
                        label={t("Near")}
                        type="number"
                        onChange={evt => setNear(Number(evt.target.value))}
                        value={near}
                    />
                    <TextField
                        label={t("Far")}
                        type="number"
                        onChange={evt => setFar(Number(evt.target.value))}
                        value={far}
                    />
                </>
            )}

            {type === "exponential" && (
                <TextField
                    label={t("Density")}
                    type="number"
                    onChange={evt => setDensity(Number(evt.target.value))}
                    value={density}
                    inputProps={{
                        step: 0.01,
                    }}
                />
            )}
        </div>
    );
}

export default Fog;