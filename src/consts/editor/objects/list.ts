import * as THREE from "three";

export default [
    {
        Constructor: THREE.Mesh,
        label: "Mesh",
        attributes: [
            "type",
            "name",
            "uuid",
            "position",
            "rotation",
            "scale",
            "castShadow",
            "receiveShadow",
            "visible",
            "frustumCulled",
            "renderOrder"
        ]
    },
    {
        Constructor: THREE.AmbientLight,
        label: "Ambient light",
        attributes: [
            "type",
            "name",
            "uuid",
            "position",
            "scale",
            "rotation",
            "intensity",
            "color",
            "shadow",
            "visible",
            "frustumCulled",
            "renderOrder"
        ]
    },
    {
        Constructor: THREE.DirectionalLight,
        label: "Directional light",
        attributes: [
            "type",
            "name",
            "uuid",
            "position",
            "scale",
            "rotation",
            "intensity",
            "shadow",
            "shadowBias",
            "shadowRadius",
            "shadowNormalBias",
            "visible",
            "frustumCulled",
            "renderOrder"
        ]
    },
    {
        Constructor: THREE.HemisphereLight,
        label: "Hemisphere light",
        attributes: [
            "type",
            "name",
            "uuid",
            "position",
            "scale",
            "rotation",
            "intensity",
            "color",
            "groundColor",
            "visible",
            "frustumCulled",
            "renderOrder"
        ]
    },
    {
        Constructor: THREE.PointLight,
        label: "Point light",
        attributes: [
            "type",
            "name",
            "uuid",
            "position",
            "scale",
            "rotation",
            "intensity",
            "color",
            "distance",
            "decay",
            "shadow",
            "shadowBias",
            "shadowRadius",
            "shadowNormalBias",
            "visible",
            "frustumCulled",
            "renderOrder"
        ]
    },
    {
        Constructor: THREE.SpotLight,
        label: "Spotlight",
        attributes: [
            "type",
            "name",
            "uuid",
            "position",
            "scale",
            "rotation",
            "intensity",
            "color",
            "distance",
            "angle",
            "penumbra",
            "decay",
            "shadow",
            "shadowBias",
            "shadowRadius",
            "shadowNormalBias",
            "visible",
            "frustumCulled",
            "renderOrder"
        ]
    }
];