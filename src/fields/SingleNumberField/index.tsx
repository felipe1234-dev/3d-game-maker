import React from "react";
import { TextField } from "@mui/material";
import { EditorContext } from "@local/contexts";
import { getProperty, setProperty } from "@local/functions";
import { FieldProps } from "../index";

function SingleNumberField(props: FieldProps) {
    const { 
        attributes, 
        labels, 
        step,
        scope 
    } = props;
    const attrPath = attributes[0];
    const label = labels[0];
    const editor = React.useContext(EditorContext);

    const [value, setValue] = React.useState<number>(0);

    React.useEffect(() => {
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

    React.useEffect(() => {
        if (!editor) {
            return;
        }

        const object = getProperty<Object | undefined>(scope, editor.transformControls);
        const helper = editor.transformControls.helper || null;

        if (object) {
            setProperty(attrPath, value, object);
            helper?.update();
        }
    }, [value]);

    return (
        <TextField 
            label={label}

            onChange={evt => setValue(Number(evt.target.value))}
            value={value}

            inputProps={{
                type: "number",
                step: step || 1
            }}
        />
    );
}

export default SingleNumberField;