import { useEffect, useState } from "react";
import { TextField, TextFieldProps } from "@mui/material";
import * as THREE from "three";

import { useEditor } from "@local/contexts";
import { getProperty, setProperty } from "@local/functions";
import { t } from "@local/i18n";
import { FieldProps } from "../index";

import "@local/styles/fields/SingleNumberField.scss";

function SingleNumberField(props: FieldProps & TextFieldProps) {
    const { attributes, labels, step, min, max, scope, ...textFieldProps } =
        props;
    const attrPath = attributes[0];
    const label = labels[0];
    const editor = useEditor();

    const [value, setValue] = useState<number>(0);

    useEffect(() => {
        const object = getProperty<Object | undefined>(
            scope,
            editor.transformControls
        );

        if (object) {
            setValue(getProperty<number>(attrPath, object));
        }
    }, [editor.transformControls.object]);

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
            className="SingleNumberField"
            label={t(label)}
            onChange={evt => setValue(Number(evt.target.value))}
            value={value}
            inputProps={{
                type: "number",
                step: step || 1,
                min,
                max,
            }}
            {...textFieldProps}
        />
    );
}

export default SingleNumberField;