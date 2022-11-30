import { useState, useEffect } from "react";
import {
    TextField,
    TextFieldProps,
    MenuItem,
    FormControlLabel,
    Checkbox
} from "@mui/material";

import { Game } from "@local/classes";
import { getProperty, setProperty } from "@local/functions";
import { MediaModal, MediaPreview } from "@local/components";
import { Media } from "@local/api/models";
import { FieldProps } from "@local/fields";
import { t } from "@local/i18n";

import mappingTypes from "@local/consts/editor/types/mapping";

import "@local/styles/fields/MapField.scss";

function MapField(props: FieldProps & TextFieldProps) {
    const {
        object,
        attributes,
        labels,
        onChange = () => { }
    } = props;

    const label = labels[0];
    const attrPath = attributes[0];

    const [open, setOpen] = useState(false);
    const [image, setImage] = useState<Media>();
    const [type, setType] = useState("none");
    const [refract, setRefract] = useState(false);

    useEffect(() => {
        if (!Game.isMaterial(object)) return;

        const material = object;
        const texture = getProperty<Game.Texture | null>(attrPath, material);

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
    }, [object]);

    useEffect(() => {
        if (!Game.isMaterial(object)) return;

        const material = object;

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

        onChange();
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