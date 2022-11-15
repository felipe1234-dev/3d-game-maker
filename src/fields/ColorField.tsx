import { useEffect, useState } from "react";

import { Game } from "@local/classes";
import { useEditor } from "@local/contexts";
import { FieldProps } from "@local/fields";
import { Helper, ColorInput } from "@local/components";
import { getProperty, setProperty } from "@local/functions";
import { t } from "@local/i18n";

import "@local/styles/fields/ColorField.scss";

function ColorField(props: FieldProps) {
    const defaultColor = "#fff";
    const [color, setColor] = useState(new Game.Color(defaultColor));

    const {
        labels,
        attributes,
        helpTexts = [],
        readOnly = false,
        scope
    } = props;
    const label = labels[0];
    const attrPath = attributes[0];
    const helpText = helpTexts[0];
    const { editor } = useEditor();

    useEffect(() => {
        if (!editor) return;

        const object = getProperty<object | undefined | null>(
            scope,
            editor.transformControls
        );

        if (object) {
            setColor(getProperty<Game.Color>(attrPath, object));
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

            if (Game.isMaterial(object)) {
                object.needsUpdate = true;
            }
        }
    }, [color]);

    const hexValue = "#" + color.getHexString();

    return (
        <Helper text={t(helpText)} placement="right" arrow>
            <ColorInput
                variant="outlined"

                className="ColorField"
                label={t(label)}

                onChange={color => setColor(new Game.Color(color))}
                value={hexValue}
            />
        </Helper>
    );
}

export default ColorField;