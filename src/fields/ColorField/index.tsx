
import { useContext, useEffect, useState } from "react";
import { EditorContext } from "@local/contexts";
import { FieldProps } from "../index";
import { getProperty, setProperty } from "@local/functions";
import { t } from "@local/i18n";
import ColorPicker from "material-ui-color-picker";

function ColorField(props: FieldProps) {
    const defaultColor = "#fff";
    const [color, setColor] = useState<string>(defaultColor);

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
            setColor(getProperty<string>(attrPath, object));
        }
    }, [editor?.transformControls.object]);

    useEffect(() => {
        if (!editor) {
            return;
        }

        const object = getProperty<object | undefined | null>(scope, editor.transformControls);

        if (object) {
            setProperty(attrPath, color, object);
        }
    }, [color]);

    return (
        <ColorPicker 
            variant="outlined"
            onChange={(value) => setColor(value)}
            value={color}
        />
    );
}

export default ColorField;