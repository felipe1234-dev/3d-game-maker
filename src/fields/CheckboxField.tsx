import {
    forwardRef,
    useEffect,
    useState
} from "react";
import {
    FormGroup,
    FormControlLabel,
    Checkbox
} from "@mui/material";

import { Game } from "@local/classes";
import { useEditor } from "@local/contexts";
import { getProperty, setProperty } from "@local/functions";
import { FieldProps } from "@local/fields";
import { Helper } from "@local/components";
import { t } from "@local/i18n";

import "@local/styles/fields/CheckboxField.scss";

const CheckboxField = forwardRef((props: FieldProps, ref) => {
    const [isChecked, setIsChecked] = useState(false);

    const {
        labels,
        attributes,
        helpTexts = [],
        scope
    } = props;
    const label = t(labels[0]);
    const attrPath = attributes[0];
    const helpText = t(helpTexts[0]);
    const { editor } = useEditor();

    useEffect(() => {
        if (!editor) return;

        const object = getProperty<object | undefined>(
            scope,
            editor.transformControls
        );

        if (object) {
            setIsChecked(getProperty<boolean>(attrPath, object));
        }
    }, [editor?.transformControls.object]);

    useEffect(() => {
        if (!editor) return;

        const object = getProperty<object | undefined>(
            scope,
            editor.transformControls
        );

        if (object) {
            setProperty(attrPath, isChecked, object);

            if (Game.isMaterial(object)) {
                object.needsUpdate = true;
            }
        }
    }, [isChecked]);

    return (
        <FormGroup ref={ref} {...props} className="CheckboxField">
            <Helper text={helpText} placement="right" arrow>
                <FormControlLabel
                    className="CheckboxField-label"
                    label={label}
                    control={
                        <Checkbox
                            className="CheckboxField-input"
                            onChange={evt => setIsChecked(evt.target.checked)}
                            checked={isChecked}
                        />
                    }
                />
            </Helper>
        </FormGroup>
    );
});

export default CheckboxField;