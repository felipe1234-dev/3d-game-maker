import { useContext, useState, useEffect } from "react";
import { TextField, MenuItem, FormControl, FormLabel, FormGroup} from "@mui/material";

import * as THREE from "three";
import { ColorInput } from "@local/components";
import { t } from "@local/i18n";
import { Game } from "@local/classes";
import { GameContext } from "@local/contexts";

const axes = [ "x", "y", "z" ] as const;

function Physics() {
    const game = useContext(GameContext);
    
    const [gravityPos, setGravityPos] = useState<THREE.Vector3>(new THREE.Vector3());

    useEffect(() => {
        if (!game) {
            return;
        }

        const { currentScene } = game;
        if (!currentScene) {
            return;
        }

        const { x: gx, y: gy, z: gz } = currentScene.physics.gravity;
        setGravityPos(new THREE.Vector3(gx, gy, gz));
    }, [game]);

    useEffect(() => {
        if (!game) {
            return;
        }

        const { currentScene } = game;
        if (!currentScene) {
            return;
        }

        const { x: gx, y: gy, z: gz } = gravityPos;
        currentScene.physics.gravity.set(gx, gy, gz);
    }, [gravityPos]);

    return (
        <FormControl style={{ paddingTop: 10 }}>
            <FormLabel style={{ paddingBottom: 10 }}>
                {t("Gravity position")}
            </FormLabel>
            <FormGroup row>
                {axes.map((axis, i ) => (
                    <TextField 
                        key={i}
                        label={t(axis.toUpperCase())}
    
                        onChange={evt => setGravityPos(prevState => {
                            prevState[axis] = Number(evt.target.value);
                            
                            const { x, y, z } = prevState;
                            return new THREE.Vector3(x, y, z);
                        })}
                        value={gravityPos[axis]}

                        inputProps={{
                            type: "number",
                            step: 0.01
                        }}

                        style={{
                            marginBottom: 5
                        }}
                    />
                ))}
            </FormGroup>
        </FormControl>
    );
}

export default Physics;