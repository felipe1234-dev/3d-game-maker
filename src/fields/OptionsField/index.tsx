
import { useContext, useState, useEffect } from "react";
import { MenuItem, TextField, TextFieldProps } from "@mui/material";

import { EditorContext } from "@local/contexts";
import { getProperty, setProperty } from "@local/functions";
import { FieldProps } from "..";
import { t } from "@local/i18n";

import * as THREE from "three";

function OptionsField(props: FieldProps & TextFieldProps) {
    const {
        scope,
        options = [],
        attributes, 
        labels, 
    } = props;
    const attrPath = attributes[0];
    const label = labels[0];
    const editor = useContext(EditorContext);

    const [value, setValue] = useState<any>("");

    useEffect(() => {
        if (!editor) {
            return;
        }

        const object = getProperty<Object | undefined>(scope, editor.transformControls);
        
        if (object) {
            setValue(
                getProperty<any>(attrPath, object)
            );
        }
    }, [editor?.transformControls.object]);

    useEffect(() => {
        if (!editor) {
            return;
        }

        const object = getProperty<Object | undefined>(scope, editor.transformControls);
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