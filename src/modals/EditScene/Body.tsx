import React from "react";
import * as THREE from "three";
import { TextField, MenuItem } from "@mui/material";
import { GameContext } from "@local/contexts";
import { backgroundTypes } from "@local/consts";
import { threeColorToHex } from "@local/functions";
import ColorPicker from "material-ui-color-picker";
import MediaModal from "../Media";

function Body() {
    const game = React.useContext(GameContext);
    const defaultColor = "#aaa";

    const [openModal, setOpenModal] = React.useState<boolean>(false);

    const [backgroundType, setBackgroundType] = React.useState<string>();
    const [backgroundColor, setBackgroundColor] = React.useState<string>();

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

    React.useEffect(() => {
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
            case "uvTexture":
                setOpenModal(true); 
                break;
            default: 
                currentScene.background = new THREE.Color(defaultColor);
                break;
        }
    }, [backgroundColor, backgroundType]);

    return (
        <div style={{ paddingTop: 10 }}>
            <TextField
                select
                label="Background"
                onChange={evt => setBackgroundType(evt.target.value)}
                value={backgroundType ?? "default"}
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
                    onChange={color => setBackgroundColor(color)}
                    value={backgroundColor ?? defaultColor}
                    InputProps={{
                        value: backgroundColor ?? defaultColor,
                        style: { color: backgroundColor ?? defaultColor }
                    }}
                />
            )}

            {openModal && (
                <MediaModal
                    title="Upload an image"
                    onClose={() => setOpenModal(false)}
                    onFinish={media => console.log(media)}
                    folders={[ "textures", "uv" ]}
                />
            )}
        </div>
    );
}

export default Body;