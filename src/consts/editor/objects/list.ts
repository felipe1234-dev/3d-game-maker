export default [
    {
        className: "Mesh",
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
        className: "AmbientLight",
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
        className: "DirectionalLight",
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
        className: "HemisphereLight",
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
        className: "PointLight",
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
        className: "SpotLight",
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