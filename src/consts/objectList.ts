const objectList: {
    [objectName: string]: {
        label: string,
        keys: Array<string>
    }
} = {
    HotSpot: {
        label: "HotSpot",
        keys: [
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
        keys: [
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
    AmbientLight: {
        label: "Ambient light",
        keys: [
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
        keys: [
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
        keys: [
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
        keys: [
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
        keys: [
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

export default objectList;