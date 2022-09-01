import React, { 
    useContext, 
    useEffect, 
    useState 
} from "react";
import {
    Grid,
    Slider,
    Input,
    InputProps
} from "@mui/material";

import { EditorContext } from "@local/contexts";
import { FieldProps } from "../index";
import { t } from "@local/i18n";
import { getProperty, setProperty } from "@local/functions";

import * as THREE from "three";

import "@local/styles/fields/RangeField.scss";

function RangeField(props: FieldProps & InputProps) {
    const {
        attributes,
        labels,
        step,
        min = 0,
        max = 1,
        scope,
        ...inputProps
    } = props;
    const attrPath = attributes[0];
    const label = labels[0];
    const editor = useContext(EditorContext);

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
        setValue(
            !Array.isArray(newValue) 
                ? validateNumber(newValue) 
                : min
        );
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
        if (!editor) {
            return;
        }

        const object = getProperty<Object | undefined>(scope, editor.transformControls);

        if (object) {
            setValue(
                getProperty<number>(attrPath, object)
            );
        }
    }, [editor?.transformControls.object]);

    useEffect(() => {
        if (!editor) {
            return;
        }

        const object = getProperty<Object | undefined>(scope, editor.transformControls);
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
        <Grid 
            className="RangeField"
            container 
            spacing={2} 
            alignItems="center"
        >
            <Grid item>
                {t(label)}
            </Grid>
            <Grid item xs>
                <Slider
                    onChange={onSliderChange}
                    value={value}

                    step={step}
                    min={min}
                    max={max}
                />
            </Grid>
            <Grid item>
                <Input
                    size="small"

                    onChange={onInputChange}
                    value={value}
                    onBlur={onInputBlur}

                    inputProps={{
                        step,
                        min,
                        max,
                        type: "number"
                    }}
                    {...inputProps}
                />
            </Grid>
        </Grid>
    );
}

export default RangeField;