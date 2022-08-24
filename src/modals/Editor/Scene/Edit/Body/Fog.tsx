import { useContext, useState, useEffect } from "react";
import { TextField, MenuItem} from "@mui/material";

import * as THREE from "three";
import { ColorInput } from "@local/components";
import { t } from "@local/i18n";
import { Game } from "@local/classes";
import { GameContext } from "@local/contexts";

import fogTypes from "@local/consts/editor/types/fog";

function Fog() {
    const game = useContext(GameContext);
    
    const [type, setType] = useState<string>();
    // Misc
    const [color, setColor] = useState<string>();
    // Linear
    const [near, setNear] = useState<number>(1); 
    const [far, setFar] = useState<number>(10);
    // Exponential
    const [density, setDensity] = useState<number>(0.00025); 

    useEffect(() => {
        if (!game) {
            return;
        }

        const { currentScene } = game;

        if (!currentScene) {
            return;
        }

        if (!currentScene.fog) {
            setType("none");
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
        if (!game) {
            return;
        }

        const { currentScene } = game;

        if (!currentScene) {
            return;
        }

        switch (type) {
            case "linear":
                if (!color) return;

                currentScene.fog = new THREE.Fog(color, near, far);
                break;
            case "exponential":
                if (!color) return;

                currentScene.fog = new THREE.Fog(color, near, far);
                break;
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
                value={type ?? "none"}
            >
                {fogTypes.map((value, i) => (
                    <MenuItem key={i} value={value}>
                        {t(value)}
                    </MenuItem>
                ))}
            </TextField>

            {(type && ["linear", "exponential"].includes(type)) && (
                <ColorInput
                    variant="outlined"
                    onChange={color => setColor(color)}
                    value={color ?? "#000"}
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
                    onChange={evt => setNear(Number(evt.target.value))}
                    value={near}
                />
            )}
        </div>
    );
}

export default Fog;