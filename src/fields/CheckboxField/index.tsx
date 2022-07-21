import React from "react";
import { FormGroup, FormControlLabel, Checkbox } from "@mui/material";
import { EditorContext } from "@local/contexts";
import { getProperty, setProperty } from "@local/functions";
import { FieldProps } from "../index";

function CheckboxField(props: FieldProps) {
    const [isChecked, setIsChecked] = React.useState<boolean>(false);

    const { label, attribute: attrPath } = props;
    const editor = React.useContext(EditorContext);

    React.useEffect(() => {
        const { object } = editor?.transformControls || {};

        setIsChecked(
            object ? (
                getProperty<boolean>(attrPath, object)
            ) : false
        );
    }, [editor?.transformControls.object]);

    React.useEffect(() => {
        const { object } = editor?.transformControls || {};

        if (object) {
            setProperty(attrPath, isChecked, object);
        }
    }, [isChecked]);

    return (
        <FormGroup>
            <FormControlLabel 
                label={label}
                control={
                    <Checkbox 
                        onChange={(evt) => setIsChecked(evt.target.checked)}
                        checked={isChecked}
                    />
                }  
            />
        </FormGroup>
    );
}

export default CheckboxField;