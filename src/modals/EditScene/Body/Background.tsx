import { useContext, useState, useEffect } from "react";
import { 
    Box, 
    Button,
    TextField, 
    MenuItem, 
    Typography 
} from "@mui/material";
import * as THREE from "three";
import { GameContext, I18nContext } from "@local/contexts";
import { backgroundTypes } from "@local/consts";
import { threeColorToHex } from "@local/functions";
import { Media } from "@local/api/models";
import { ColorInput, MediaModal } from "@local/components";

function Background() {
    const game = useContext(GameContext);
    const i18n = useContext(I18nContext);
    
    const scope = "modals.editScene.body.background.";
    const defaultColor = "#444";

    const [openModal, setOpenModal] = useState<boolean>(false);
    const [bgType, setBgType] = useState<string>();
    const [bgColor, setBgColor] = useState<string>();
    const [bgImage, setBgImage] = useState<Media>();

    useEffect(() => {
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
                setBgType("color");
                setBgColor(color);
            }
        } else if (currentScene.background instanceof THREE.Texture) {
            if (Media.testType(currentScene.background.userData)) {
                const media = currentScene.background.userData;
                setBgImage(media);

                if (currentScene.background.mapping === THREE.UVMapping) {
                    setBgType("uvTexture");
                } 
                
                if (currentScene.background.mapping === THREE.EquirectangularReflectionMapping) {
                    setBgType("equirectTexture");
                }
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

        switch (bgType) {
            case "color": 
                currentScene.background = new THREE.Color(bgColor);
                break;
            case "equirectTexture":
            case "uvTexture":
                if (!bgImage) {
                    setOpenModal(true); 
                } else {
                    setOpenModal(false);
                    
                    currentScene.background = new THREE.TextureLoader().load(bgImage.url);
                    currentScene.background.name = bgImage.title;
                    currentScene.background.userData = { ...bgImage };

                    currentScene.background.mapping = bgType === "uvTexture"
                        ? THREE.UVMapping
                        : bgType === "equirectTexture"
                        ? THREE.EquirectangularReflectionMapping
                        : THREE.Texture.DEFAULT_MAPPING;
                }
                break;
            default: 
                currentScene.background = new THREE.Color(defaultColor);
                break;
        }
    }, [
        bgColor, 
        bgType, 
        bgImage
    ]);

    return (
        <div style={{ paddingTop: 10 }}>
            <TextField
                select
                label={i18n.get(scope + "type.label")}
                onChange={evt => setBgType(evt.target.value)}
                value={bgType ?? "default"}
            >
                {backgroundTypes.map((value, i) => (
                    <MenuItem key={i} value={value}>
                        {i18n.get(`consts.editor.backgroundTypes[${i}]`)}
                    </MenuItem>
                ))}
            </TextField>

            {bgType === "color" && (
                <ColorInput 
                    variant="outlined"
                    onChange={color => setBgColor(color)}
                    value={bgColor ?? defaultColor}
                />
            )}

            {(
                bgType && 
                ["uvTexture", "equirectTexture"].includes(bgType) && 
                bgImage
            ) && (
                <Box sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    margin: "10px 0"
                }}>
                    <Typography variant="subtitle1" component="p">
                        {bgImage.title} ({bgImage.mimeType})
                    </Typography>

                    <Button onClick={() => setOpenModal(true)}>
                        Change Image
                    </Button>
                </Box>
            )}

            {(openModal && bgType === "uvTexture") && (
                <MediaModal
                    title="Upload an image"
                    onClose={() => setOpenModal(false)}
                    onFinish={media => setBgImage(media)}
                    folders="textures/uv"
                />
            )}

            {(openModal && bgType === "equirectTexture") && (
                <MediaModal
                    title="Upload an image"
                    onClose={() => setOpenModal(false)}
                    onFinish={media => setBgImage(media)}
                    folders="textures/equirec"
                />
            )}
        </div>
    );
}

export default Background;