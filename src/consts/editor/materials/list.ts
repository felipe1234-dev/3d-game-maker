import { Game } from "@local/classes";

export default [
    {
        Constructor: Game.MeshStandardMaterial,
        label: "3D Standard Material",
        description: `
            Physically realistic 3D material. 
            Note that for best results you should always specify an environment map when using this material.
        `,
        attributes: [
            "type",
            "uuid",
            "name",
            "color",
            "side",
            "emissive",
            "emissiveIntensity",
            "roughness",
            "metalness",
            "flatShading",
            "vortexColors",
            "blending",
            "opacity",
            "alphaTest",
            "depthTest",
            "depthWrite",
            "alphaMap",
            "aoMap",
            "aoMapIntensity",
            "envMap",
            "lightMap",
            "lightMapIntensity",
            "emissiveMap",
            "metalnessMap",
            "displacementMap",
            "displacementBias",
            "displacementScale",
            "roughnessMap",
            "bumpMap",
            "bumpScale",
            "map"
        ]
    },
    {
        Constructor: Game.MeshPhysicalMaterial,
        label: "Physical Material",
        description: "",
        attributes: [
            "type",
            "uuid",
            "name",
            "color",
            "attenuationColor",
            "thickness",
            "side",
            "blending",
            "map",
            "clearcoatNormalMap",
            "emissiveMap",
            "metalnessMap",
            "displacementMap",
            "emissive",
            "transmission",
            "emissiveIntensity",
            "roughness",
            "reflectivity",
            "metalness",
            "clearcoat",
            "clearcoatRoughness",
            "opacity",
            "alphaTest",
            "clearcoatNormalScale.x",
            "clearcoatNormalScale.y",
            "vortexColors",
            "flatShading",
            "depthTest",
            "depthWrite",
            "alphaMap",
            "aoMap",
            "aoMapIntensity",
            "envMap",
            "lightMap",
            "lightMapIntensity",
            "displacementBias",
            "displacementScale",
            "roughnessMap",
            "bumpMap",
            "bumpScale",
        ]
    },
    {
        Constructor: Game.LineBasicMaterial,
        label: "Line Basic Material",
        description: "",
        attributes: [
            "type",
            "uuid",
            "name",
            "color",
            "fog",
            "linewidth",
            "linecap",
            "linejoin"
        ]
    },
    {
        Constructor: Game.LineDashedMaterial,
        label: "Line Dashed Material",
        description: "",
        attributes: [
            "type",
            "uuid",
            "name",
            "color",
            "fog",
            "linewidth",
            "linecap",
            "linejoin",
            "dashSize",
            "gapSize",
            "scale"
        ]
    },
    {
        Constructor: Game.MeshBasicMaterial,
        label: "Basic Material",
        description: "",
        attributes: [
            "type",
            "uuid",
            "name",
            "side",
            "color",
            "vortexColors",
            "opacity",
            "alphaTest",
            "depthWrite",
            "reflectivity",
            "depthTest",
            "blending",
            "map",
            "aoMap",
            "aoMapIntensity",
            "envMap",
            "alphaMap",
            "lightMap",
            "lightMapIntensity",
            "specularMap"
        ]
    },
    {
        Constructor: Game.MeshDepthMaterial,
        label: "Depth Material",
        description: "",
        attributes: [
            "type",
            "uuid",
            "name",
            "vortexColors",
            "map",
            "alphaMap",
            "displacementMap",
            "displacementScale",
            "side",
            "blending",
            "opacity",
            "transparent",
            "alphaTest",
            "depthTest",
            "depthWrite",
            "wireframe"
        ]
    },
    {
        Constructor: Game.MeshLambertMaterial,
        label: "Lambert Material",
        description: "",
        attributes: [
            "type",
            "uuid",
            "name",
            "color",
            "side",
            "emissive",
            "emissiveIntensity",
            "reflectivity",
            "vortexColors",
            "blending",
            "opacity",
            "alphaTest",
            "depthTest",
            "depthWrite",
            "alphaMap",
            "aoMap",
            "aoMapIntensity",
            "envMap",
            "lightMap",
            "lightMapIntensity",
            "emissiveMap",
            "specularMap",
            "map"
        ]
    },
    {
        Constructor: Game.MeshMatcapMaterial,
        label: "Matcap Material",
        description: "",
        attributes: [
            "type",
            "uuid",
            "name",
            "color",
            "side",
            "flatShading",
            "vortexColors",
            "blending",
            "opacity",
            "alphaTest",
            "depthTest",
            "depthWrite",
            "alphaMap",
            "matcap",
            "bumpMap",
            "bumpScale",
            "normalMap",
            "normalScale.x",
            "normalScale.y",
            "displacementMap",
            "displacementBias",
            "displacementScale",
            "map"
        ]
    },
    {
        Constructor: Game.MeshPhongMaterial,
        label: "Blinn-Phong Material",
        description: "",
        attributes: [
            "type",
            "uuid",
            "name",
            "color",
            "specular",
            "shininess",
            "side",
            "emissive",
            "emissiveIntensity",
            "reflectivity",
            "flatShading",
            "vortexColors",
            "blending",
            "opacity",
            "alphaTest",
            "depthTest",
            "depthWrite",
            "alphaMap",
            "aoMap",
            "aoMapIntensity",
            "envMap",
            "emissiveMap",
            "displacementMap",
            "displacementBias",
            "displacementScale",
            "normalMap",
            "normalScale.x",
            "normalScale.y",
            "specularMap",
            "bumpMap",
            "bumpScale",
            "map"
        ]
    },
    {
        Constructor: Game.MeshToonMaterial,
        label: "Cartoon Material",
        description: "",
        attributes: [
            "type",
            "uuid",
            "name",
            "color",
            "side",
            "emissive",
            "emissiveIntensity",
            "vortexColors",
            "blending",
            "opacity",
            "alphaTest",
            "depthTest",
            "depthWrite",
            "alphaMap",
            "aoMap",
            "aoMapIntensity",
            "emissiveMap",
            "displacementMap",
            "displacementBias",
            "displacementScale",
            "normalMap",
            "normalScale.x",
            "normalScale.y",
            "lightMap",
            "lightMapIntensity",
            "gradientMap",
            "bumpMap",
            "bumpScale",
            "map"
        ]
    }
];