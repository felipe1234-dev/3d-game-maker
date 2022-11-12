import { useState, useEffect } from "react";
import {
    TextField,
    TextFieldProps,
    MenuItem
} from "@mui/material";

import { Game } from "@local/classes";
import { useEditor } from "@local/contexts";
import { Helper } from "@local/components";
import { FieldProps } from "@local/fields";
import { t } from "@local/i18n";

import materialList from "@local/consts/editor/materials/list";

import "@local/styles/fields/OptionsField.scss";

const cache: {
    [uuid: string]: {
        [type: string]: Game.Material
    }
} = {};

function MaterialSelector(props: FieldProps & TextFieldProps) {
    const {
        labels,
        forceUpdate = () => { }
    } = props;

    const label = labels[0];

    const { editor } = useEditor();
    const transformer = editor?.transformControls;
    const object = transformer?.object;

    const options = materialList.map(material => ({
        key: String(Math.random()),
        label: material.label,
        value: material.Constructor.name,
        Constructor: material.Constructor,
        help: material.description
    }));

    const [value, setValue] = useState("");

    const selectedOption = options.find(option => option.value === value);
    const helpText = selectedOption?.help || "";

    useEffect(() => {
        if (!object) return;
        if (!(object instanceof Game.Mesh)) return;
        if (!Game.isMaterial(object.material)) return;

        setValue(object.material.type);
    }, [transformer, object]);

    useEffect(() => {
        if (!selectedOption || !object) return;
        if (!(object instanceof Game.Mesh)) return;

        const material = object.material;
        if (!Game.isMaterial(material)) return;

        const { Constructor } = selectedOption;

        if (material instanceof Constructor) return;

        if (!cache[object.uuid]) {
            cache[object.uuid] = {};
        }

        cache[object.uuid][material.type] = material;

        const cacheMaterial = cache[object.uuid][value];

        if (cacheMaterial) {
            object.material = cacheMaterial;
        } else {
            object.material = new Constructor();
        }

        forceUpdate();
    }, [value]);

    return (
        <Helper text={t(helpText)} placement="right" arrow>
            <TextField
                select
                className="OptionsField"
                label={t(label)}
                onChange={evt => setValue(evt.target.value)}
                value={value}
            >
                {options.map(option => (
                    <MenuItem key={option.key} value={option.value}>
                        {t(option.label)}
                    </MenuItem>
                ))}
            </TextField>
        </Helper>
    );
}

export default MaterialSelector;