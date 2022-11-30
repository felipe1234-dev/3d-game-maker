import { useEffect, useState } from "react";
import {
    FormGroup,
    FormControlLabel,
    Checkbox
} from "@mui/material";

import { getProperty, setProperty } from "@local/functions";
import { FieldProps } from "@local/fields";
import { Helper } from "@local/components";
import { t } from "@local/i18n";

import "@local/styles/fields/CheckboxField.scss";

function CheckboxField(props: FieldProps) {
    const [isChecked, setIsChecked] = useState(false);

    const {
        object,
        labels,
        attributes,
        helpTexts = [],
        onChange = () => { },
        readOnly = false
    } = props;

    const label = t(labels[0]);
    const attrPath = attributes[0];
    const helpText = t(helpTexts[0]);

    useEffect(() => {
        setIsChecked(
            getProperty<boolean>(attrPath, object)
        );
    }, [object]);

    useEffect(() => {
        setProperty(attrPath, isChecked, object);
        onChange();
    }, [isChecked]);

    return (
        <FormGroup className="CheckboxField">
            <Helper text={helpText} placement="right" arrow>
                <FormControlLabel
                    className="CheckboxField-label"
                    label={label}
                    disabled={readOnly}
                    control={
                        <Checkbox
                            className="CheckboxField-input"
                            onChange={evt => setIsChecked(evt.target.checked)}
                            checked={isChecked}
                        />
                    }
                />
            </Helper>
        </FormGroup>
    );
}

export default CheckboxField;