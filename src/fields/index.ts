import { Game } from "@local/classes";

export interface FieldProps {
    object: any;
    labels: string[];
    attributes: string[];
    onChange?: () => void;
    forceUpdate?: () => void;
    step?: number;
    min?: number;
    max?: number;
    maxLength?: number;
    minLength?: number;
    helpTexts?: string[];
    readOnly?: boolean;
    options?: Array<{
        label: string;
        value: any;
    }>
}

export { default as MaterialSelector } from "./MaterialSelector";
export { default as CheckboxField } from "./CheckboxField";
export { default as ColorField } from "./ColorField";
export { default as MultiNumberField } from "./MultiNumberField";
export { default as OptionsField } from "./OptionsField";
export { default as PointsField } from "./PointsField";
export { default as RangeField } from "./RangeField";
export { default as SingleNumberField } from "./SingleNumberField";
export { default as TextField } from "./TextField";
export { default as MapField } from "./MapField";