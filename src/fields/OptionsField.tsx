import { useState, useEffect } from "react";
import { MenuItem, TextField, TextFieldProps } from "@mui/material";

import { getProperty, setProperty } from "@local/functions";
import { Helper } from "@local/components";
import { FieldProps } from "@local/fields";
import { t } from "@local/i18n";

import "@local/styles/fields/OptionsField.scss";

function OptionsField(props: FieldProps & TextFieldProps) {
    const {
        object,
        options = [],
        attributes,
        labels,
        onChange = () => { },
        helpTexts = [],
    } = props;
    const attrPath = attributes[0];
    const label = labels[0];

    const [value, setValue] = useState<any>("");

    const values = options.map(opt => opt.value);
    const helpText = helpTexts[values.indexOf(value)];

    useEffect(() => {
        setValue(getProperty<any>(attrPath, object));
    }, [object]);

    useEffect(() => {
        setProperty(attrPath, value, object);
        onChange();
    }, [value]);

    return (
        <Helper text={t(helpText)} placement="right" arrow>
            <TextField
                select
                className="OptionsField"
                label={t(label)}
                value={value}
                onChange={evt => setValue(evt.target.value)}
            >
                {options.map(option => (
                    <MenuItem key={option.value} value={option.value}>
                        {t(option.label)}
                    </MenuItem>
                ))}
            </TextField>
        </Helper>
    );
}

export default OptionsField;