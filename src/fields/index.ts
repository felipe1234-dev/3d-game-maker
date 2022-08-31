export interface FieldProps {
    scope: "object" | "object.geometry" | "object.material";
    labels: string[];
    attributes: string[];
    step?: number;
    min?: number;
    max?: number;
    maxLength?: number;
    minLength?: number;
    options?: Array<{
        label: string;
        value: any;
    }>
}

export { default as CheckboxField } from "./CheckboxField";
export { default as ColorField } from "./ColorField";
export { default as MultiNumberField } from "./MultiNumberField";
export { default as OptionsField } from "./OptionsField";
export { default as SingleNumberField } from "./SingleNumberField";
export { default as TextField } from "./TextField";