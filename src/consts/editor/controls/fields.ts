import { Game } from "@local/classes";
import { 
    TextField,
    SingleNumberField,
    CheckboxField,
    OptionsField
} from "@local/fields";

export default [
    {
        key: "uuid",
        Component: TextField,
        attributes: ["uuid"],
        labels: ["UUID"],
        readOnly: true
    },
    {
        key: "id",
        Component: TextField,
        attributes: ["id"],
        labels: ["ID"],
        readOnly: true
    },
    {
        key: "name",
        Component: TextField,
        attributes: ["name"],
        labels: ["Name"]
    },
    {
        key: "jumpVelocity",
        Component: SingleNumberField,
        attributes: ["jumpVelocity"],
        labels: ["Jump Velocity"],
        step: 0.01,
    },
    {
        key: "enableJump",
        Component: CheckboxField,
        attributes: ["enableJump"],
        labels: ["Enable Jump"],
    },
    {
        key: "doubleJump",
        Component: CheckboxField,
        attributes: ["doubleJump"],
        labels: ["Double Jump"],
    },
    {
        key: "movementVelocity",
        Component: SingleNumberField,
        attributes: ["movementVelocity"],
        labels: ["Movement Velocity"],
    },
    {
        key: "sensitivity",
        Component: SingleNumberField,
        attributes: ["sensitivity"],
        labels: ["Sensitivity"],
        min: 0,
        step: 0.01,
    },
    {
        key: "person",
        Component: OptionsField,
        attributes: ["person"],
        labels: ["Person"],
        helpText: "",
        options: [
            {
                label: "First",
                value: Game.FirstPerson
            },
            {
                label: "Second",
                value: Game.SecondPerson
            },
            {
                label: "Third",
                value: Game.ThirdPerson
            }
        ],
    }
];