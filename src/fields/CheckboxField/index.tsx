import { forwardRef, useEffect, useState } from "react";
import { FormGroup, FormControlLabel, Checkbox } from "@mui/material";

import { useEditor } from "@local/contexts";
import { getProperty, setProperty } from "@local/functions";
import { FieldProps } from "../index";
import { t } from "@local/i18n";

import * as THREE from "three";

import "@local/styles/fields/CheckboxField.scss";

const CheckboxField = forwardRef((props: FieldProps, ref) => {
    const [isChecked, setIsChecked] = useState(false);

    const { labels, attributes, scope } = props;
    const label = t(labels[0]);
    const attrPath = attributes[0];
    const editor = useEditor();

    useEffect(() => {
        const object = getProperty<object | undefined | null>(
            scope,
            editor.transformControls
        );

        if (object) {
            setIsChecked(getProperty<boolean>(attrPath, object));
        }
    }, [editor?.transformControls.object]);

    useEffect(() => {
        const object = getProperty<object | undefined | null>(
            scope,
            editor.transformControls
        );

        if (object) {
            setProperty(attrPath, isChecked, object);

            if (object instanceof THREE.Material) {
                object.needsUpdate = true;
            }
        }
    }, [isChecked]);

    return (
        <FormGroup ref={ref} {...props} className="CheckboxField">
            <FormControlLabel
                className="CheckboxField-label"
                label={label}
                control={
                    <Checkbox
                        className="CheckboxField-input"
                        onChange={evt => setIsChecked(evt.target.checked)}
                        checked={isChecked}
                    />
                }
            />
        </FormGroup>
    );
});

export default CheckboxField;