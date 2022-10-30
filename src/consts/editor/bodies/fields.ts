import { SingleNumberField, OptionsField } from "@local/fields";
import * as CANNON from "cannon-es";

export default [
    {
        key: "type",
        Component: OptionsField,
        attributes: ["type"],
        labels: ["Type"],
        options: [
            {
                label: "Dynamic",
                value: CANNON.BODY_TYPES.DYNAMIC
            },
            {
                label: "Kinematic",
                value: CANNON.BODY_TYPES.KINEMATIC
            },
            {
                label: "Static",
                value: CANNON.BODY_TYPES.STATIC
            }
        ],
        helpTexts: [
            "Dynamic bodies are affected by forces, and can have a velocity and move around",
            "Kinematic bodies aren't affected by forces but can have a velocity and move around",
            "Static bodies can only be positioned in the world, but aren't affected by forces, have velocity nor can be moved"
        ],
    },
    {
        key: "mass",
        Component: SingleNumberField,
        attributes: ["mass"],
        labels: ["Mass (kg)"],
        step: 0.01,
        min: 0.00
    }
];