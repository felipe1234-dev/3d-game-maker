import { Game } from "@local/classes";

export default [
    {
        Constructor: Game.Group,
        label: "Group",
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
        Constructor: Game.Mesh,
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
        Constructor: Game.AmbientLight,
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
            "castShadow",
            "visible",
            "frustumCulled",
            "renderOrder"
        ]
    },
    {
        Constructor: Game.DirectionalLight,
        label: "Directional light",
        attributes: [
            "type",
            "name",
            "uuid",
            "position",
            "scale",
            "rotation",
            "intensity",
            "castShadow",
            "shadowBias",
            "shadowRadius",
            "shadowNormalBias",
            "visible",
            "frustumCulled",
            "renderOrder"
        ]
    },
    {
        Constructor: Game.HemisphereLight,
        label: "Hemisphere light",
        attributes: [
            "type",
            "name",
            "uuid",
            "position",
            "scale",
            "rotation",
            "intensity",
            "skyColor",
            "groundColor",
            "visible",
            "frustumCulled",
            "renderOrder"
        ]
    },
    {
        Constructor: Game.PointLight,
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
            "castShadow",
            "shadowBias",
            "shadowRadius",
            "shadowNormalBias",
            "visible",
            "frustumCulled",
            "renderOrder"
        ]
    },
    {
        Constructor: Game.SpotLight,
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
            "castShadow",
            "shadowBias",
            "shadowRadius",
            "shadowNormalBias",
            "visible",
            "frustumCulled",
            "renderOrder"
        ]
    }
];