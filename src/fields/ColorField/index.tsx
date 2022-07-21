
import React from "react";
import { FormGroup, FormControlLabel, Checkbox } from "@mui/material";
import { EditorContext } from "@local/contexts";
import { FieldProps } from "../index";
import { getProperty, setProperty } from "@local/functions";
import ColorPicker from "material-ui-color-picker";

function ColorField(props: FieldProps) {
    const defaultColor = "#fff";
    const [color, setColor] = React.useState<string>(defaultColor);

    const { label, attribute: attrPath } = props;
    const editor = React.useContext(EditorContext);

    React.useEffect(() => {
        const { object } = editor?.transformControls || {};

        setColor(
            object ? (
                getProperty<string>(attrPath, object)
            ) : defaultColor
        );
    }, [editor?.transformControls.object]);

    React.useEffect(() => {
        const { object } = editor?.transformControls || {};

        if (object) {
            setProperty(attrPath, color, object);
        }
    }, [color]);

    return (
        <FormGroup>
            <FormControlLabel 
                label={label}
                control={
                    <ColorPicker 
                        variant="outlined"
                        onChange={(value) => setColor(value)}
                        value={color}
                        defaultValue={color}
                    />
                }  
            />
        </FormGroup>
    );
}

export default ColorField;