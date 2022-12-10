import { Game } from "@local/classes";

export default [
    {
        Constructor: Game.ClassicalControls,
        label: "Classical Controls",
        attributes: [
            "type",
            "name",
            "uuid",
            "id",
            "person",
            "jumpVelocity",
            "enableJump",
            "doubleJump",
            "movementVelocity",
            "sensitivity",
        ]
    },
    {
        Constructor: Game.RotationControls,
        label: "Rotation Controls",
        attributes: [
            "type",
            "name",
            "uuid",
            "id",
            "sensitivity",
        ]
    }
];