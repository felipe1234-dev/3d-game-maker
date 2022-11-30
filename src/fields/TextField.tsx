import { useEffect, useState } from "react";
import {
    TextField as MuiTextField,
    TextFieldProps as MuiTextFieldProps,
} from "@mui/material";

import { getProperty, setProperty } from "@local/functions";
import { Helper } from "@local/components";
import { FieldProps } from "@local/fields";
import { t } from "@local/i18n";

import "@local/styles/fields/TextField.scss";

function TextField(props: FieldProps & MuiTextFieldProps) {
    const {
        object,
        attributes,
        labels,
        onChange = () => { },
        forceUpdate,
        minLength,
        maxLength,
        helpTexts = [],
        readOnly = false,
        ...textFieldProps
    } = props;
    const attrPath = attributes[0];
    const label = labels[0];
    const helpText = helpTexts[0];

    const [value, setValue] = useState<string>("");

    useEffect(() => {
        setValue(
            getProperty<string>(attrPath, object)
        );
    }, [object]);

    useEffect(() => {
        setProperty(attrPath, value, object);
        onChange();
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