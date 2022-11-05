import { useEffect, useState } from "react";

import { useEditor } from "@local/contexts";
import { FieldProps } from "@local/fields";
import { Helper } from "@local/components";
import { getProperty, setProperty } from "@local/functions";
import { t } from "@local/i18n";

import ColorPicker from "material-ui-color-picker";
import * as THREE from "three";

import "@local/styles/fields/ColorField.scss";

function ColorField(props: FieldProps) {
    const defaultColor = "#fff";
    const [color, setColor] = useState(new THREE.Color(defaultColor));

    const {
        labels,
        attributes,
        helpTexts = [],
        scope
    } = props;
    const label = t(labels[0]);
    const attrPath = attributes[0];
    const helpText = t(helpTexts[0]);
    const { editor } = useEditor();

    useEffect(() => {
        if (!editor) return;

        const object = getProperty<object | undefined | null>(
            scope,
            editor.transformControls
        );

        if (object) {
            setColor(getProperty<THREE.Color>(attrPath, object));
        }
    }, [editor?.transformControls.object]);

    useEffect(() => {
        if (!editor) return;

        const object = getProperty<object | undefined | null>(
            scope,
            editor.transformControls
        );

        if (object) {
            setProperty(attrPath, color, object);

            if (object instanceof THREE.Material) {
                object.needsUpdate = true;
            }
        }
    }, [color]);

    const hexValue = "#" + color.getHexString();

    return (
        <Helper text={helpText} placement="right" arrow>
            <ColorPicker
                className="ColorField"
                variant="outlined"
                label={label}
                onChange={value => setColor(new THREE.Color(value))}
                value={hexValue}
                InputProps={{
                    style: {
                        color: hexValue,
                    },
                    value: hexValue,
                }}
            />
        </Helper>
    );
}

export default ColorField;