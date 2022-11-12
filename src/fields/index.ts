export interface FieldProps {
    scope: "object" | "object.geometry" | "object.material" | "object.body";
    labels: string[];
    attributes: string[];
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