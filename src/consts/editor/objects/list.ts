import * as THREE from "three";

export default [
    {
        Constructor: THREE.Mesh,
        label: "Mesh",
        props: [
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
        props: [
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
        props: [
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
        props: [
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
        props: [
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
        props: [
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