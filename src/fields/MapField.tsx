import { useState, useEffect } from "react";
import { TextField, TextFieldProps, MenuItem, FormControlLabel, Checkbox } from "@mui/material";

import { Game } from "@local/classes";
import { getProperty, setProperty } from "@local/functions";
import { useEditor } from "@local/contexts";
import { Media } from "@local/api/models";
import { FieldProps } from "@local/fields";
import { MediaModal, MediaPreview } from "@local/components";
import { t } from "@local/i18n";

import mappingTypes from "@local/consts/editor/types/mapping";

import "@local/styles/fields/MapField.scss";

function MapField(props: FieldProps & TextFieldProps) {
    const {
        attributes,
        labels
    } = props;

    const label = labels[0];
    const attrPath = attributes[0];

    const [open, setOpen] = useState(false);
    const [image, setImage] = useState<Media>();
    const [type, setType] = useState("none");
    const [refract, setRefract] = useState(false);

    const { editor } = useEditor();
    const transformer = editor?.transformControls;
    const object = transformer?.object;

    useEffect(() => {
        if (!editor || !(object instanceof Game.Mesh)) return;
        if (!Game.isMaterial(object.material)) return;

        const texture = getProperty<Game.Texture | null>(attrPath, object.material);

        if (!texture) {
            setType("none");
        } else {
            const mapping = texture.mapping;

            if (mapping === Game.UVMapping) {
                setType("uvMapping");
            } else if (
                [
                    Game.EquirectangularReflectionMapping,
                    Game.EquirectangularRefractionMapping,
                ].includes(mapping)
            ) {
                setType("equirectMapping");
                setRefract(
                    mapping === Game.EquirectangularRefractionMapping
                );
            }

            if (Media.testType(texture.userData)) {
                setImage(texture.userData);
            }
        }
    }, [editor, object]);

    useEffect(() => {
        if (!editor || !(object instanceof Game.Mesh)) return;
        if (!Game.isMaterial(object.material)) return;

        const material = object.material;

        switch (type) {
            case "uvMapping":
            case "equirectMapping":
                if (!image) {
                    setOpen(true);
                } else {
                    setOpen(false);

                    Game.Texture.fromURL(image.url).then((texture) => {
                        texture.name = image.title;
                        texture.userData = { ...image };

                        let mapping = Game.Texture.DEFAULT_MAPPING;

                        if (type === "uvMapping") {
                            mapping = Game.UVMapping;
                        } else if (type === "equirectMapping") {
                            mapping = refract
                                ? Game.EquirectangularRefractionMapping
                                : Game.EquirectangularReflectionMapping;
                        }

                        texture.mapping = mapping;

                        setProperty(attrPath, texture, material);
                        material.needsUpdate = true;
                    });
                }
                break;

            default:
                setProperty(attrPath, null, material);
                break;
        }
    }, [type, image, refract]);

    return (
        <div className="MapField">
            <TextField
                select
                className="OptionsField"
                label={t(label)}
                onChange={evt => setType(evt.target.value)}
                value={type}
            >
                {mappingTypes.map(mapping => (
                    <MenuItem
                        key={`${label}-${mapping}`}
                        value={mapping}
                    >
                        {t(mapping)}
                    </MenuItem>
                ))}
            </TextField>

            {image && ["uvMapping", "equirectMapping"].includes(type) && (
                <MediaPreview
                    onChange={() => setOpen(true)}
                    value={image}
                />
            )}

            {!["none", "uvMapping"].includes(type) && (
                <FormControlLabel
                    label={t("Refraction")}
                    control={
                        <Checkbox
                            onChange={evt => setRefract(evt.target.checked)}
                            checked={refract}
                        />
                    }
                />
            )}

            {open && type === "uvMapping" && (
                <MediaModal
                    title={t("Upload an image")}
                    onClose={() => setOpen(false)}
                    onFinish={media => setImage(media)}
                    folders="textures/uv"
                />
            )}

            {open && type === "equirectMapping" && (
                <MediaModal
                    title={t("Upload an image")}
                    onClose={() => setOpen(false)}
                    onFinish={media => setImage(media)}
                    folders="textures/equirec"
                />
            )}
        </div>
    );
}

export default MapField;