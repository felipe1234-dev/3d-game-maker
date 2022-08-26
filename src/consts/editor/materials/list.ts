import * as THREE from "three";

export default [
    {
        Constructor: THREE.MeshStandardMaterial,
        label: "Material 3D Padão",
        props: [
            "list",
            "type",
            "name",
            "uuid",
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
        Constructor: THREE.MeshPhysicalMaterial,
        label: "Material Físico",
        props: [
            "list",
            "type",
            "name",
            "uuid",
            "color",
            "attenuationColor",
            "thickness",
            "transmission",
            "side",
            "emissive",
            "emissiveIntensity",
            "roughness",
            "reflectivity",
            "metalness",
            "clearcoat",
            "clearcoatRoughness",
            "clearcoatNormalMap",
            "clearcoatNormalScale.x",
            "clearcoatNormalScale.y",
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
        Constructor: THREE.LineBasicMaterial,
        label: "Linha Comum",
        props: ["type", "name", "uuid"]
    },
    {
        Constructor: THREE.LineDashedMaterial,
        label: "Linha Tracejada",
        props: ["type", "name", "uuid"]
    },
    {
        Constructor: THREE.MeshBasicMaterial,
        label: "Material Básico",
        props: [
            "list",
            "type",
            "name",
            "uuid",
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
        Constructor: THREE.MeshDepthMaterial,
        label: "Material de Profundidade",
        props: ["type", "name", "uuid"]
    },
    {
        Constructor: THREE.MeshLambertMaterial,
        label: "Material Lambertiano",
        props: [
            "list",
            "type",
            "name",
            "uuid",
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
        Constructor: THREE.MeshMatcapMaterial,
        label: "Material Matcap",
        props: [
            "list",
            "type",
            "name",
            "uuid",
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
        Constructor: THREE.MeshPhongMaterial,
        label: "Material de Blinn-Phong",
        props: [
            "list",
            "type",
            "name",
            "uuid",
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
        Constructor: THREE.MeshToonMaterial,
        label: "Material Cartoonizado",
        props: [
            "list",
            "type",
            "name",
            "uuid",
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