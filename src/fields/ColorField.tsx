import { useEffect, useState } from "react";

import { Game } from "@local/classes";
import { FieldProps } from "@local/fields";
import { Helper, ColorInput } from "@local/components";
import { getProperty, setProperty } from "@local/functions";
import { t } from "@local/i18n";

import "@local/styles/fields/ColorField.scss";

function ColorField(props: FieldProps) {
    const defaultColor = "#fff";
    const [color, setColor] = useState(new Game.Color(defaultColor));

    const {
        object,
        labels,
        attributes,
        onChange = () => { },
        helpTexts = [],
        readOnly = false,
    } = props;
    const label = labels[0];
    const attrPath = attributes[0];
    const helpText = helpTexts[0];

    useEffect(() => {
        setColor(
            getProperty<Game.Color>(attrPath, object)
        );
    }, [object]);

    useEffect(() => {
        setProperty(attrPath, color, object);
        onChange();
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