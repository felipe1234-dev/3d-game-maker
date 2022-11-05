import { useEffect, useState } from "react";
import { TextField, TextFieldProps } from "@mui/material";

import { Game } from "@local/classes";
import { useEditor } from "@local/contexts";
import { getProperty, setProperty } from "@local/functions";
import { Helper } from "@local/components";
import { FieldProps } from "@local/fields";
import { t } from "@local/i18n";

import "@local/styles/fields/SingleNumberField.scss";

function SingleNumberField(props: FieldProps & TextFieldProps) {
    const {
        attributes,
        labels,
        step,
        min,
        max,
        helpTexts = [],
        scope,
        ...textFieldProps
    } = props;
    const attrPath = attributes[0];
    const label = t(labels[0]);
    const helpText = t(helpTexts[0]);
    const { editor } = useEditor();

    const [value, setValue] = useState<number>(0);

    useEffect(() => {
        if (!editor) return;

        const object = getProperty<Object | undefined>(
            scope,
            editor?.transformControls
        );

        if (object) {
            setValue(getProperty<number>(attrPath, object));
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
            <TextField
                className="SingleNumberField"
                label={label}
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
        </Helper>
    );
}

export default SingleNumberField;