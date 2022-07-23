import React from "react";
import { FormGroup, FormControlLabel, Checkbox } from "@mui/material";
import { EditorContext } from "@local/contexts";
import { getProperty, setProperty } from "@local/functions";
import { FieldProps } from "../index";
import "@local/styles/fields/CheckboxField.scss";

const CheckboxField = React.forwardRef((props: FieldProps, ref) => {
    const [isChecked, setIsChecked] = React.useState<boolean>(false);

    const { labels, attributes, scope } = props;
    const label = labels[0];
    const attrPath = attributes[0];
    const editor = React.useContext(EditorContext);

    React.useEffect(() => {
        if (!editor) {
            return;
        }

        const object = getProperty<object | undefined | null>(scope, editor.transformControls);

        if (object) {
            setIsChecked(getProperty<boolean>(attrPath, object));
        }
    }, [editor?.transformControls.object]);

    React.useEffect(() => {
        if (!editor) {
            return;
        }

        const object = getProperty<object | undefined | null>(scope, editor.transformControls);
        
        if (object) {
            setProperty(attrPath, isChecked, object);
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
                        onChange={(evt) => setIsChecked(evt.target.checked)}
                        checked={isChecked}
                    />
                }  
            />
        </FormGroup>
    );
});

export default CheckboxField;