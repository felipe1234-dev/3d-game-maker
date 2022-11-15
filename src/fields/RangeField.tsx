import React, { useEffect, useState } from "react";
import {
    Grid,
    Slider,
    Input,
    InputProps
} from "@mui/material";

import { Game } from "@local/classes";
import { useEditor } from "@local/contexts";
import { getProperty, setProperty } from "@local/functions";
import { Helper } from "@local/components";
import { FieldProps } from "@local/fields";
import { t } from "@local/i18n";

import "@local/styles/fields/RangeField.scss";

function RangeField(props: FieldProps & InputProps) {
    const {
        attributes,
        labels,
        step,
        min = 0,
        max = 1,
        helpTexts = [],
        readOnly = false,
        scope,
        ...inputProps
    } = props;
    const attrPath = attributes[0];
    const label = labels[0];
    const helpText = helpTexts[0];
    const { editor } = useEditor();

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
        if (!editor) return;

        const object = getProperty<Object | undefined>(
            scope,
            editor.transformControls
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