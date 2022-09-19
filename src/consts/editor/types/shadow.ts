import * as THREE from "three";

export default [
    {
        label: "Basic",
        value: THREE.BasicShadowMap
    },
    {
        label: "PCF",
        value: THREE.PCFShadowMap
    },
    {
        label: "PCFSoft",
        value: THREE.PCFSoftShadowMap
    },
    {
        label: "VSM",
        value: THREE.VSMShadowMap
    }
];