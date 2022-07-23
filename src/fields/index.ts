export interface FieldProps {
    scope: "object" | "object.geometry" | "object.material",
    labels: Array<string>,
    attributes: Array<string>,
    step?: number
}

export { default as CheckboxField } from "./CheckboxField";
export { default as ColorField } from "./ColorField";
export { default as MultiNumberField } from "./MultiNumberField";
export { default as SingleNumberField } from "./SingleNumberField";