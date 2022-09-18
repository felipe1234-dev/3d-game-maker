import { useState, useEffect } from "react";
import { MenuItem, TextField, TextFieldProps } from "@mui/material";
import * as THREE from "three";

import { useEditor } from "@local/contexts";
import { getProperty, setProperty } from "@local/functions";
import { t } from "@local/i18n";
import { FieldProps } from "..";

import "@local/styles/fields/OptionsField.scss";

function OptionsField(props: FieldProps & TextFieldProps) {
    const { scope, options = [], attributes, labels } = props;
    const attrPath = attributes[0];
    const label = labels[0];
    const editor = useEditor();

    const [value, setValue] = useState<any>("");

    useEffect(() => {
        const object = getProperty<Object | undefined>(
            scope,
            editor.transformControls
        );

        if (object) {
            setValue(getProperty<any>(attrPath, object));
        }
    }, [editor?.transformControls.object]);

    useEffect(() => {
        const object = getProperty<Object | undefined>(
            scope,
            editor.transformControls
        );
        const helper = editor.transformControls.helper || null;

        if (object) {
            setProperty(attrPath, value, object);

            if (object instanceof THREE.Material) {
                object.needsUpdate = true;
            }

            helper?.update();
        }
    }, [value]);

    return (
        <TextField
            className="OptionsField"
            select
            label={t(label)}
            value={value}
            onChange={evt => setValue(evt.target.value)}
        >
            {options.map((option, i) => (
                <MenuItem key={i} value={option.value}>
                    {t(option.label)}
                </MenuItem>
            ))}
        </TextField>
    );
}

export default OptionsField;