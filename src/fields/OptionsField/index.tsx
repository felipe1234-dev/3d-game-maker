import { useState, useEffect } from "react";
import { MenuItem, TextField, TextFieldProps } from "@mui/material";

import { Game } from "@local/classes";
import { useEditor } from "@local/contexts";
import { getProperty, setProperty } from "@local/functions";
import { Helper } from "@local/components";
import { FieldProps } from "@local/fields";
import { t } from "@local/i18n";

import "@local/styles/fields/OptionsField.scss";

function OptionsField(props: FieldProps & TextFieldProps) {
    const {
        scope,
        options = [],
        attributes,
        labels,
        helpTexts = [],
    } = props;
    const attrPath = attributes[0];
    const label = t(labels[0]);
    const { editor } = useEditor();

    const [value, setValue] = useState<any>("");

    const values = options.map(opt => opt.value);
    const helpText = t(helpTexts[values.indexOf(value)]);

    useEffect(() => {
        if (!editor) return;

        const object = getProperty<Object | undefined>(
            scope,
            editor.transformControls
        );

        if (object) {
            setValue(getProperty<any>(attrPath, object));
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
                select
                className="OptionsField"
                label={label}
                value={value}
                onChange={evt => setValue(evt.target.value)}
            >
                {options.map((option, i) => (
                    <MenuItem key={i} value={option.value}>
                        {t(option.label)}
                    </MenuItem>
                ))}
            </TextField>
        </Helper>
    );
}

export default OptionsField;