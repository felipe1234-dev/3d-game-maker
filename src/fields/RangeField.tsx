import React, { useEffect, useState } from "react";
import {
    Grid,
    Slider,
    Input,
    InputProps
} from "@mui/material";

import { getProperty, setProperty } from "@local/functions";
import { Helper } from "@local/components";
import { FieldProps } from "@local/fields";
import { t } from "@local/i18n";

import "@local/styles/fields/RangeField.scss";

function RangeField(props: FieldProps & InputProps) {
    const {
        object,
        attributes,
        labels,
        onChange = () => { },
        step,
        min = 0,
        max = 1,
        helpTexts = [],
        readOnly = false,
        ...inputProps
    } = props;
    const attrPath = attributes[0];
    const label = labels[0];
    const helpText = helpTexts[0];

    const [value, setValue] = useState<number>(0);

    const validateNumber = (num: number) => {
        if (num < min) {
            return min;
        } else if (num > max) {
            return max;
        } else {
            return num;
        }
    };

    const onSliderChange = (evt: Event, newValue: number | number[]) => {
        setValue(!Array.isArray(newValue) ? validateNumber(newValue) : min);
    };

    const onInputChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
        setValue(
            !evt.target.value.trim().length
                ? min
                : validateNumber(Number(evt.target.value))
        );
    };

    const onInputBlur = () => {
        setValue(validateNumber(value));
    };

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
        <Grid className="RangeField" container spacing={2} alignItems="center">
            <Helper text={t(helpText)} placement="right" arrow>
                <Grid item xs={12}>
                    {t(label)}
                </Grid>
            </Helper>
            <Grid item xs={10}>
                <Slider
                    onChange={onSliderChange}
                    value={value}
                    step={step}
                    min={min}
                    max={max}
                    disabled={readOnly}
                />
            </Grid>
            <Grid item xs={2}>
                <Input
                    size="small"
                    onChange={onInputChange}
                    value={value}
                    onBlur={onInputBlur}
                    inputProps={{
                        type: "number",
                        step,
                        min,
                        max,
                        readOnly
                    }}
                    {...inputProps}
                />
            </Grid>
        </Grid>
    );
}

export default RangeField;