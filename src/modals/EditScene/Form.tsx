import React from "react";
import * as THREE from "three";
import { TextField, MenuItem } from "@mui/material";
import { GameContext } from "@local/contexts";
import { backgroundTypes } from "@local/consts";
import { threeColorToHex } from "@local/functions";
import ColorPicker from "material-ui-color-picker";

function Form() {
    const game = React.useContext(GameContext);

    const defaultColor = "#aaa";
    const [backgroundType, setBackgroundType] = React.useState<string>("default");
    const [backgroundColor, setBackgroundColor] = React.useState<string>(defaultColor);

    React.useEffect(() => {
        if (!game) {
            return;
        }

        const { currentScene } = game;

        if (!currentScene) {
            return;
        }

        switch (true) {
            case currentScene.background instanceof THREE.Color:
                const color = threeColorToHex(currentScene.background as THREE.Color);
                const pattern = new RegExp(
                    `#(${defaultColor.replace("#", "")})+`, 
                    "g"
                );

                if (!color.match(pattern)) {
                    setBackgroundType("color");
                    setBackgroundColor(color);
                }
                break;
        }
    }, [game]);

    const updateBackground = () => {
        if (!game) {
            return;
        }

        const { currentScene } = game;

        if (!currentScene) {
            return;
        }

        switch (backgroundType) {
            case "color": 
                currentScene.background = new THREE.Color(backgroundColor);
                break;
            default: 
                currentScene.background = new THREE.Color(defaultColor);
                break;
        }
    }

    return (
        <div style={{ paddingTop: 10 }}>
            <TextField
                select
                label="Background"
                onChange={evt => {
                    setBackgroundType(evt.target.value);
                    updateBackground();
                }}
                value={backgroundType}
            >
                {backgroundTypes.map((option, i) => (
                    <MenuItem key={i} value={option.value}>
                        {option.label}
                    </MenuItem>
                ))}
            </TextField>

            {backgroundType === "color" && (
                <ColorPicker 
                    variant="outlined"
                    onChange={color => {
                        setBackgroundColor(color);
                        updateBackground();
                    }}
                    value={backgroundColor}
                    InputProps={{
                        value: backgroundColor,
                        style: { color: backgroundColor }
                    }}
                />
            )}


        </div>
    );
}

export default Form;