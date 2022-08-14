import React from "react";
import { 
    Box, 
    Button,
    TextField, 
    MenuItem, 
    Typography 
} from "@mui/material";
import * as THREE from "three";

import { GameContext } from "@local/contexts";
import { backgroundTypes } from "@local/consts";
import { threeColorToHex } from "@local/functions";
import { Media } from "@local/api/models";
import { ColorInput } from "@local/components";

import MediaModal from "../Media";

function Body() {
    const game = React.useContext(GameContext);
    const defaultColor = "#aaa";

    const [openModal, setOpenModal] = React.useState<boolean>(false);
    const [backgroundType, setBackgroundType] = React.useState<string>();
    const [backgroundColor, setBackgroundColor] = React.useState<string>();
    const [backgroundImage, setBackgroundImage] = React.useState<Media>();

    React.useEffect(() => {
        if (!game) {
            return;
        }

        const { currentScene } = game;

        if (!currentScene) {
            return;
        }

        if (currentScene.background instanceof THREE.Color) {
            const color = threeColorToHex(currentScene.background);
            const pattern = new RegExp(
                `#(${defaultColor.replace("#", "")})+`,
                "g"
            );

            if (!color.match(pattern)) {
                setBackgroundType("color");
                setBackgroundColor(color);
            }
        } else if (currentScene.background instanceof THREE.Texture) {
            if (Media.testType(currentScene.background.userData)) {
                const media = currentScene.background.userData;
                setBackgroundImage(media);

                if (currentScene.background.mapping === THREE.UVMapping) {
                    setBackgroundType("uvTexture");
                } 
                
                if (currentScene.background.mapping === THREE.EquirectangularReflectionMapping) {
                    setBackgroundType("equirectTexture");
                }
            }
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
                console.log(new THREE.Color(backgroundColor));
                currentScene.background = new THREE.Color(backgroundColor);
                break;
            case "equirectTexture":
            case "uvTexture":
                if (!backgroundImage) {
                    setOpenModal(true); 
                } else {
                    setOpenModal(false);
                    
                    currentScene.background = new THREE.TextureLoader().load(backgroundImage.url);
                    currentScene.background.name = backgroundImage.title;
                    currentScene.background.userData = { ...backgroundImage };

                    currentScene.background.mapping = backgroundType === "uvTexture"
                        ? THREE.UVMapping
                        : backgroundType === "equirectTexture"
                        ? THREE.EquirectangularReflectionMapping
                        : THREE.Texture.DEFAULT_MAPPING;
                }
                break;
            default: 
                currentScene.background = new THREE.Color(defaultColor);
                break;
        }
    }, [
        backgroundColor, 
        backgroundType, 
        backgroundImage
    ]);

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
                <ColorInput 
                    variant="outlined"
                    onChange={color => setBackgroundColor(color)}
                    value={backgroundColor ?? defaultColor}
                />
            )}

            {(
                backgroundType && 
                ["uvTexture", "equirectTexture"].includes(backgroundType) && 
                backgroundImage
            ) && (
                <Box sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    margin: "10px 0"
                }}>
                    <Typography variant="subtitle1" component="p">
                        {backgroundImage.title} ({backgroundImage.mimeType})
                    </Typography>

                    <Button onClick={() => setOpenModal(true)}>
                        Change Image
                    </Button>
                </Box>
            )}

            {(openModal && backgroundType === "uvTexture") && (
                <MediaModal
                    title="Upload an image"
                    onClose={() => setOpenModal(false)}
                    onFinish={media => setBackgroundImage(media)}
                    folders="textures/uv"
                />
            )}

            {(openModal && backgroundType === "equirectTexture") && (
                <MediaModal
                    title="Upload an image"
                    onClose={() => setOpenModal(false)}
                    onFinish={media => setBackgroundImage(media)}
                    folders="textures/equirec"
                />
            )}
        </div>
    );
}

export default Body;