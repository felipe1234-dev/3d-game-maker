import * as THREE from "three";

export default [
    {
        label: "None",
        value: THREE.NoToneMapping
    },
    {
        label: "Linear",
        value: THREE.LinearToneMapping
    },
    {
        label: "Reinhard",
        value: THREE.ReinhardToneMapping
    },
    {
        label: "Cineon",
        value: THREE.CineonToneMapping
    },
    {
        label: "ACESFilmic",
        value: THREE.ACESFilmicToneMapping
    }
];