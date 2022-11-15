import { Game } from "@local/classes";

export default [
    {
        label: "None",
        value: Game.NoToneMapping
    },
    {
        label: "Linear",
        value: Game.LinearToneMapping
    },
    {
        label: "Reinhard",
        value: Game.ReinhardToneMapping
    },
    {
        label: "Cineon",
        value: Game.CineonToneMapping
    },
    {
        label: "ACESFilmic",
        value: Game.ACESFilmicToneMapping
    }
];