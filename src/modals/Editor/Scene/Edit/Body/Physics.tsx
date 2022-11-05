import React from "react";
import {
    TextField,
    FormControl,
    FormLabel,
    FormGroup
} from "@mui/material";

import { useGame } from "@local/contexts";
import { t } from "@local/i18n";
import { useForceUpdate } from "@local/hooks";

const axes = ["x", "y", "z"] as const;

function Physics() {
    const { game } = useGame();
    const { forceUpdate } = useForceUpdate();

    const handleGravityChange = (
        evt: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
        axis: typeof axes[number]
    ) => {
        if (!game || !game.current.scene) return;

        game.current.scene.physics.gravity[axis] = Number(evt.target.value);

        forceUpdate();
    };

    return (
        <FormControl style={{ paddingTop: 10 }}>
            <FormLabel style={{ paddingBottom: 10 }}>
                {t("Gravity forces (m/s²)")}
            </FormLabel>
            <FormGroup row>
                {axes.map((axis, i) => (
                    <TextField
                        key={`${axis}-${i}`}
                        label={t(axis.toUpperCase())}
                        onChange={evt => handleGravityChange(evt, axis)}
                        value={
                            game?.current.scene?.physics.gravity[axis] || 0
                        }
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