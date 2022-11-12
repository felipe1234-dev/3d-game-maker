import { useEffect, useState } from "react";
import {
    TextField as MuiTextField,
    TextFieldProps as MuiTextFieldProps,
} from "@mui/material";

import { Game } from "@local/classes";
import { useEditor } from "@local/contexts";
import { getProperty, setProperty } from "@local/functions";
import { Helper } from "@local/components";
import { FieldProps } from "@local/fields";
import { t } from "@local/i18n";

import "@local/styles/fields/TextField.scss";

function TextField(props: FieldProps & MuiTextFieldProps) {
    const {
        attributes,
        labels,
        minLength,
        maxLength,
        helpTexts = [],
        scope,
        readOnly = false,
        ...textFieldProps
    } = props;
    const attrPath = attributes[0];
    const label = labels[0];
    const helpText = helpTexts[0];
    const { editor } = useEditor();

    const [value, setValue] = useState<string>("");

    useEffect(() => {
        if (!editor) return;

        const object = getProperty<Object | undefined>(
            scope,
            editor.transformControls
        );

        if (object) {
            setValue(getProperty<string>(attrPath, object));
        }
    }, [editor?.transformControls.object]);

    useEffect(() => {
        if (!editor) return;

        const object = getProperty<Object | undefined>(
            scope,
            editor.transformControls
        );
        const helper = editor.transformControls.helper || null;

        if (object) {
            setProperty(attrPath, value, object);

            if (Game.isMaterial(object)) {
                object.needsUpdate = true;
            }

            helper?.update();
        }
    }, [value]);

    return (
        <Helper text={helpText} placement="right" arrow>
            <MuiTextField
                className="TextField"
                label={t(label)}

                onChange={evt => setValue(evt.target.value)}
                value={value}

                inputProps={{
                    type: "text",
                    maxLength,
                    minLength,
                    readOnly
                }}

                {...textFieldProps}
            />
        </Helper>
    );
}

export default TextField;