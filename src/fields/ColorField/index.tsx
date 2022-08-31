
import { useContext, useEffect, useState } from "react";
import { EditorContext } from "@local/contexts";
import { FieldProps } from "../index";
import { getProperty, setProperty } from "@local/functions";
import { t } from "@local/i18n";
import ColorPicker from "material-ui-color-picker";
import * as THREE from "three";

function ColorField(props: FieldProps) {
    const defaultColor = "#fff";
    const [color, setColor] = useState<THREE.Color>(
        new THREE.Color(defaultColor)
    );

    const { labels, attributes, scope } = props;
    const label = t(labels[0]);
    const attrPath = attributes[0];
    const editor = useContext(EditorContext);

    useEffect(() => {
        if (!editor) {
            return;
        }

        const object = getProperty<object | undefined | null>(scope, editor.transformControls);

        if (object) {
            setColor(
                getProperty<THREE.Color>(attrPath, object)
            );
        }
    }, [editor?.transformControls.object]);

    useEffect(() => {
        if (!editor) {
            return;
        }

        const object = getProperty<object | undefined | null>(scope, editor.transformControls);

        if (object) {
            setProperty(attrPath, color, object);

            if (object instanceof THREE.Material) {
                object.needsUpdate = true;
            }
        }
    }, [color]);

    return (
        <ColorPicker 
            variant="outlined"
            label={label}

            onChange={value => setColor(new THREE.Color(value))}
            value={"#" + color.getHexString()}

            InputProps={{
                style: {
                    color: "#" + color.getHexString()
                },
                value: "#" + color.getHexString()
            }}
        />
    );
}

export default ColorField;