import React from "react";
import { 
    FormControl,
    FormLabel,
    FormGroup
} from "@mui/material";
import { getProperty } from "@local/functions";
import { EditorContext } from "@local/contexts";
import { FieldProps, SingleNumberField } from "../index";
import "@local/styles/fields/MultiNumberField.scss";

function MultiNumberField(props: FieldProps) {
    const { labels, attributes, scope, step } = props;

    const editor = React.useContext(EditorContext);
    const object = editor ? getProperty<Object | undefined>(scope, editor.transformControls) : null;

    return (
        <FormControl className="MultiNumberField">
            {(object && labels.length > 0) && (
                <FormLabel className="MultiNumberField-label">
                    {labels[0]}
                </FormLabel>
            )}
            <FormGroup className="MultiNumberField-row" aria-label="position" row>
                {object && (
                    (attributes || []).map((attrPath, i) => (
                        <SingleNumberField 
                            key={i}
                            className="MultiNumberField-row-input"
                            labels={[ labels[i + 1] ]}
                            attributes={[ attrPath ]}
                            scope={scope}
                            step={step}                            
                        />
                    ))
                )}
            </FormGroup>
        </FormControl>
    );
}

export default MultiNumberField;