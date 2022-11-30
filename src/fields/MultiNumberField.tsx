import { FormControl, FormLabel, FormGroup } from "@mui/material";

import { FieldProps, SingleNumberField } from "@local/fields";
import { t } from "@local/i18n";

import "@local/styles/fields/MultiNumberField.scss";

function MultiNumberField(props: FieldProps) {
    const {
        object,
        labels,
        attributes,
        helpTexts = [],
        ...rest
    } = props;

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
                            key={`${attrPath}-${i}`}
                            object={object}
                            className="MultiNumberField-row-input"
                            labels={[labels[i + 1]]}
                            attributes={[attrPath]}
                            helpTexts={[helpTexts[i]]}
                            {...rest}
                        />
                    ))}
            </FormGroup>
        </FormControl>
    );
}

export default MultiNumberField;