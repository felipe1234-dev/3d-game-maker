export default {
    HotSpot: {
        label: "HotSpot",
        fields: [
            "type",
            "name",
            "uuid",
            "position",
            "scale",
            "rotation",
            "visible",
            "frustumCulled",
            "renderOrder"
        ]
    },
    Mesh: {
        label: "Mesh",
        fields: [
            "type",
            "name",
            "uuid",
            "position",
            "scale",
            "rotation",
            "scale",
            "shadow",
            "visible",
            "frustumCulled",
            "renderOrder"
        ]
    },
    AmbientLight: {
        label: "Ambient light",
        fields: [
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
    DirectionalLight: {
        label: "Directional light",
        fields: [
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
    HemisphereLight: {
        label: "Luz de Hemisfério",
        fields: [
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
    PointLight: {
        label: "Lâmpada",
        fields: [
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
    SpotLight: {
        label: "Holofote",
        fields: [
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
};