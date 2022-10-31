import { Game } from "@local/classes";

export default [
    {
        Constructor: Game.Body,
        label: "Physical Body",
        attributes: [
            "type",
            "mass",
            "linearDamping",
            "collisionFilterGroup",
            "collisionFilterMask",
        ],
    }
];