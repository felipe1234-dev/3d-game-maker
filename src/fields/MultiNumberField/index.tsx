import { useContext } from "react";
import { 
    FormControl,
    FormLabel,
    FormGroup
} from "@mui/material";
import { getProperty } from "@local/functions";
import { EditorContext } from "@local/contexts";
import { FieldProps, SingleNumberField } from "../index";
import { t } from "@local/i18n";
import "@local/styles/fields/MultiNumberField.scss";

function MultiNumberField(props: FieldProps) {
    const { labels, attributes, scope, step } = props;

    const editor = useContext(EditorContext);
    const object = editor ? getProperty<Object | undefined>(scope, editor.transformControls) : null;

    return (
        <FormControl className="MultiNumberField">
            {(object && labels.length > 0) && (
                <FormLabel className="MultiNumberField-label">
                    {t(labels[0])}
                </FormLabel>
            )}
            <FormGroup className="MultiNumberField-row" row>
                {object && (
                    (attributes || []).map((attrPath, i) => (
                        <SingleNumberField 
                            key={i}
                            className="MultiNumberField-row-input"
                            labels={[ t(labels[i + 1]) ]}
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