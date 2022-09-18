import { useEffect, useState } from "react";
import {
    TextField as MuiTextField,
    TextFieldProps as MuiTextFieldProps,
} from "@mui/material";
import * as THREE from "three";

import { useEditor } from "@local/contexts";
import { getProperty, setProperty } from "@local/functions";
import { FieldProps } from "../index";
import { t } from "@local/i18n";

import "@local/styles/fields/TextField.scss";

function TextField(props: FieldProps & MuiTextFieldProps) {
    const {
        attributes,
        labels,
        minLength,
        maxLength,
        scope,
        ...textFieldProps
    } = props;
    const attrPath = attributes[0];
    const label = labels[0];
    const editor = useEditor();

    const [value, setValue] = useState<string>("");

    useEffect(() => {
        const object = getProperty<Object | undefined>(
            scope,
            editor.transformControls
        );

        if (object) {
            setValue(getProperty<string>(attrPath, object));
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
        <MuiTextField
            className="TextField"
            label={t(label)}
            onChange={evt => setValue(evt.target.value)}
            value={value}
            inputProps={{
                type: "text",
                maxLength,
                minLength,
            }}
            {...textFieldProps}
        />
    );
}

export default TextField;