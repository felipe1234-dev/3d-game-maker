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
    },
    {
        key: "linearDamping",
        Component: SingleNumberField,
        attributes: ["linearDamping"],
        labels: ["Linear damping"],
        helpTexts: [
            "How much to damp the body velocity each step. It can go from 0 to 1"
        ],
        step: 0.01,
        min: 0.00,
        max: 1.00
    },
    {
        key: "collisionFilterGroup",
        Component: SingleNumberField,
        attributes: ["collisionFilterGroup"],
        labels: ["Collision group"],
        helpTexts: [
            "The collision group the body belongs to"
        ],
        step: 1.00
    },
    {
        key: "collisionFilterMask",
        Component: SingleNumberField,
        attributes: ["collisionFilterMask"],
        labels: ["Collision mask"],
        helpTexts: [
            "The collision group the body can collide with"
        ],
        step: 1.00
    }
];