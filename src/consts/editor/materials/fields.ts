import * as THREE from "three";
import { 
    ColorField,
    CheckboxField,
    MultiNumberField,
    SingleNumberField,
    OptionsField,
    RangeField
} from "@local/fields";

export default [
    {
        key: "side",
        Component: OptionsField,
        attributes: [ "side" ],
        labels: [ "Render side" ],
        options: [
            {
                label: "Front",
                value: THREE.FrontSide
            },
            {
                label: "Back",
                value: THREE.BackSide
            },
            {
                label: "Both",
                value: THREE.DoubleSide
            }
        ],
        helpText: ""
    },
    {
        key: "blending",
        Component: OptionsField,
        attributes: [ "blending" ],
        labels: [ "Blending" ],
        options: [
            {
                label: "No blending",
                value: THREE.NoBlending
            },
            {
                label: "Normal blending",
                value: THREE.NormalBlending
            },
            {
                label: "Additive blending",
                value: THREE.AdditiveBlending
            },
            {
                label: "Subtractive blending",
                value: THREE.SubtractiveBlending
            },
            {
                label: "Multiply blending",
                value: THREE.MultiplyBlending
            }
        ]
    },
    {
        key: "color",
        Component: ColorField,
        attributes: [ "color" ],
        labels: [ "Color" ]
    },
    {
        key: "emissive",
        Component: ColorField,
        attributes: [ "emissive" ],
        labels: [ "Emission color" ]
    },
    {
        key: "specularColor",
        Component: ColorField,
        attributes: [ "specularColor" ],
        labels: [ "Specular color" ] 
    },
    {
        key: "attenuationColor",
        Component: ColorField,
        attributes: [ "attenuationColor" ],
        labels: [ "Attenuation color" ]
    },
    {
        key: "emissiveIntensity",
        Component: RangeField,
        attributes: [ "emissiveIntensity" ],
        labels: [ "Emissive intensity" ],
        max: 1,
        min: 0,
        step: 0.01
    },
    {
        key: "reflectivity",
        Component: RangeField,
        attributes: [ "reflectivity" ],
        labels: [ "Reflectivity" ],
        max: 1,
        min: 0,
        step: 0.01
    },
    {
        key: "roughness",
        Component: RangeField,
        attributes: [ "roughness" ],
        labels: [ "Roughness" ],
        max: 1,
        min: 0,
        step: 0.01
    },
    {
        key: "metalness",
        Component: RangeField,
        attributes: [ "metalness" ],
        labels: [ "Metalness" ],
        max: 1,
        min: 0,
        step: 0.01
    },
    {
        key: "clearcoat",
        Component: RangeField,
        attributes: [ "clearcoat" ],
        labels: [ "Clearcoat" ],
        max: 1,
        min: 0,
        step: 0.01
    },
    {
        key: "clearcoatRoughness",
        Component: RangeField,
        attributes: [ "clearcoatRoughness" ],
        labels: [ "Clearcoat roughness" ],
        max: 1,
        min: 0,
        step: 0.01
    },
    {
        key: "transmission",
        Component: RangeField,
        attributes: [ "transmission" ],
        labels: [ "Transmission" ],
        max: 1,
        min: 0,
        step: 0.01
    },
    {
        key: "attenuationDistance",
        Component: SingleNumberField,
        attributes: [ "attenuationDistance" ],
        labels: [ "Attenuation distance" ],
    },
    {
        key: "thickness",
        Component: SingleNumberField,
        attributes: [ "thickness" ],
        labels: [ "thickness" ],
    },
    {
        key: "shininess",
        Component: SingleNumberField,
        attributes: [ "shininess" ],
        labels: [ "Shininess" ],
    },
    {
        key: "opacity",
        Component: RangeField,
        attributes: [ "opacity" ],
        labels: [ "Opacity" ],
        max: 1,
        min: 0,
        step: 0.01
    },
    {
        key: "alphaTest",
        Component: RangeField,
        attributes: [ "alphaTest" ],
        labels: [ "Alpha test" ],
        max: 1,
        min: 0,
        step: 0.01
    },
    
    
    
    {
        key: "vertexColors",
        Component: CheckboxField,
        attributes: [ "vertexColors" ],
        labels: [ "Vertex colors" ]
    },
    {
        key: "flatShading",
        Component: CheckboxField,
        attributes: [ "flatShading" ],
        labels: [ "Flat shading" ]
    },
    {
        key: "depthTest",
        Component: CheckboxField,
        attributes: [ "depthTest" ],
        labels: [ "Depth test" ]
    },
    {
        key: "depthWrite",
        Component: CheckboxField,
        attributes: [ "depthWrite" ],
        labels: [ "Depth write" ]
    },
    
    
    
    /*{
        Component: "ImageField",
        attributes: [ "map" ],
        labels: [ "labelura" ],
        "has_refr": false,
        "has_types": false
    },
    {
        Component: "ImageField",
        attributes: [ "envMap" ],
        labels: "Mapa de Ambiente",
        "has_refr": true,
        "has_types": true
    },
    {
        Component: "ImageField",
        attributes: [ "matcap" ],
        labels: "Mapeamento Esférico do Amb.",
        "has_refr": false,
        "has_types": false
    },
    
    
    
    {
        Component: "ImageField",
        attributes: [ "lightMap" ],
        labels: "Mapa de Iluminação",
        "has_refr": false,
        "has_types": false
    },
    {
        Component: SingleNumberField,
        attributes: [ "lightMapIntensity" ],
        labels: [ "Intensidade" ],
        max: 1, 
        min: 0,
        step: 0.01
    },
    
    
    
    {
        Component: "ImageField",
        attributes: [ "specularMap" ],
        labels: "Mapa Especular",
        "has_refr": false,
        "has_types": false
    },
    
    
    
    {
        Component: "ImageField",
        attributes: [ "aoMap" ],
        labels: "Mapa de oclusão ambiental",
        "has_refr": false,
        "has_types": false
    },
    {
        Component: SingleNumberField,
        attributes: [ "aoMapIntensity" ],
        labels: [ "Intensidade" ],
        max: 1, 
        min: 0,
        step: 0.01
    },
    
    
    
    {
        Component: "ImageField",
        attributes: [ "emissiveMap" ],
        labels: "Mapa de Emissão",
        "has_refr": false,
        "has_types": false
    },
    
    
    
    {
        Component: "ImageField",
        attributes: [ "displacementMap" ],
        labels: "Mapa de Deslocamento",
        "has_refr": false,
        "has_types": false
    },
    {
        Component: SingleNumberField,
        attributes: [ "displacementBias" ],
        labels: "Viés",
    },
    {
        Component: SingleNumberField,
        attributes: [ "displacementScale" ],
        labels: [ "Escala" ],
    },
    
    
    
    {
        Component: "ImageField",
        attributes: [ "normalMap" ],
        labels: "Mapa Normal",
        "has_refr": false,
        "has_types": false
    },
    {
        Component: SingleNumberField,
        attributes: "normalScale.x",
        labels: "Escala (x)",
    },
    {
        Component: SingleNumberField,
        attributes: "normalScale.y",
        labels: "Escala (y)",
    },
    
    
    {
        Component: "ImageField",
        attributes: [ "clearcoatNormalMap" ],
        labels: "Mapa Normal do Verniz",
        "has_refr": false,
        "has_types": false
    },
    {
        Component: SingleNumberField,
        attributes: "clearcoatNormalScale.x",
        labels: "Escala (x)",
        
    },
    {
        Component: SingleNumberField,
        attributes: "clearcoatNormalScale.y",
        labels: "Escala (y)",
    },
    
    
    {
        Component: "ImageField",
        attributes: [ "bumpMap" ],
        labels: "Mapa de Bumping",
        "has_refr": false,
        "has_types": false
    },
    {
        Component: SingleNumberField,
        attributes: [ "bumpScale" ],
        labels: [ "Escala" ],
    },
    
    
    
    {
        Component: "ImageField",
        attributes: [ "roughnessMap" ],
        labels: "Mapa de Aspereza",
        "has_refr": false,
        "has_types": false
    },
    {
        Component: "ImageField",
        attributes: [ "metalnessMap" ],
        labels: "Mapa da Metalicidade",
        "has_refr": false,
        "has_types": false
    },
    {
        Component: "ImageField",
        attributes: [ "gradientMap" ],
        labels: "Mapa de Gradiente",
        "has_refr": false,
        "has_types": false
    },
    {
        Component: "ImageField",
        attributes: [ "alphaMap" ],
        labels: "Mapa Alfa",
        "has_refr": false,
        "has_types": false
    } */
];