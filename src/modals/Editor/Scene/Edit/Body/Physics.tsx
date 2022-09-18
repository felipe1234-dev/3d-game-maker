import { useState, useEffect } from "react";
import { TextField, FormControl, FormLabel, FormGroup } from "@mui/material";
import * as THREE from "three";

import { useGame } from "@local/contexts";
import { t } from "@local/i18n";

const axes = ["x", "y", "z"] as const;

function Physics() {
    const game = useGame();

    const [gravity, setGravity] = useState<THREE.Vector3>(new THREE.Vector3());

    useEffect(() => {
        const { currentScene } = game;
        if (!currentScene) {
            return;
        }

        const { x: gx, y: gy, z: gz } = currentScene.physics.gravity;
        setGravity(new THREE.Vector3(gx, gy, gz));
    }, [game]);

    useEffect(() => {
        const { currentScene } = game;
        if (!currentScene) {
            return;
        }

        const { x: gx, y: gy, z: gz } = gravity;
        currentScene.physics.gravity.set(gx, gy, gz);
    }, [gravity]);

    return (
        <FormControl style={{ paddingTop: 10 }}>
            <FormLabel style={{ paddingBottom: 10 }}>
                {t("Gravity forces (m/s²)")}
            </FormLabel>
            <FormGroup row>
                {axes.map((axis, i) => (
                    <TextField
                        key={i}
                        label={t(axis.toUpperCase())}
                        onChange={evt =>
                            setGravity(prevState => {
                                prevState[axis] = Number(evt.target.value);

                                const { x, y, z } = prevState;
                                return new THREE.Vector3(x, y, z);
                            })
                        }
                        value={gravity[axis]}
                        inputProps={{
                            type: "number",
                            step: 0.1,
                        }}
                        style={{
                            marginBottom: 5,
                        }}
                    />
                ))}
            </FormGroup>
        </FormControl>
    );
}

export default Physics;