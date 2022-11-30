import { useEffect, useState } from "react";
import { TextField, TextFieldProps } from "@mui/material";

import { getProperty, setProperty } from "@local/functions";
import { Helper } from "@local/components";
import { FieldProps } from "@local/fields";
import { t } from "@local/i18n";

import "@local/styles/fields/SingleNumberField.scss";

function SingleNumberField(props: FieldProps & TextFieldProps) {
    const {
        object,
        attributes,
        labels,
        onChange = () => { },
        forceUpdate,
        step,
        min,
        max,
        helpTexts = [],
        readOnly = false,
        ...textFieldProps
    } = props;
    const attrPath = attributes[0];
    const label = t(labels[0]);
    const helpText = t(helpTexts[0]);

    const [value, setValue] = useState<number>(0);

    useEffect(() => {
        setValue(
            getProperty<number>(attrPath, object)
        );
    }, [object]);

    useEffect(() => {
        setProperty(attrPath, value, object);
        onChange();
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
                    readOnly
                }}
                {...textFieldProps}
            />
        </Helper>
    );
}

export default SingleNumberField;