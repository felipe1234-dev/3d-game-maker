import { FormControl, FormLabel, FormGroup } from "@mui/material";

import { useEditor } from "@local/contexts";
import { getProperty } from "@local/functions";
import { FieldProps, SingleNumberField } from "@local/fields";
import { t } from "@local/i18n";

import "@local/styles/fields/MultiNumberField.scss";

function MultiNumberField(props: FieldProps) {
    const {
        labels,
        attributes,
        helpTexts = [],
        scope,
        ...rest
    } = props;

    const { editor } = useEditor();
    const object = editor ? getProperty<Object | undefined>(
        scope,
        editor.transformControls
    ) : undefined;

    return (
        <FormControl className="MultiNumberField">
            {object && labels.length > 0 && (
                <FormLabel className="MultiNumberField-label">
                    {t(labels[0])}
                </FormLabel>
            )}
            <FormGroup className="MultiNumberField-row" row>
                {object &&
                    (attributes || []).map((attrPath, i) => (
                        <SingleNumberField
                            key={i}
                            className="MultiNumberField-row-input"
                            labels={[labels[i + 1]]}
                            attributes={[attrPath]}
                            helpTexts={[helpTexts[i]]}
                            scope={scope}
                            {...rest}
                        />
                    ))}
            </FormGroup>
        </FormControl>
    );
}

export default MultiNumberField;