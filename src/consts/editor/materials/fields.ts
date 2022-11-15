import {
    MaterialSelector,
    ColorField,
    CheckboxField,
    SingleNumberField,
    OptionsField,
    RangeField,
    MapField,
} from "@local/fields";
import { Game } from "@local/classes";

export default [
    {
        key: "type",
        Component: MaterialSelector,
        attributes: [],
        labels: ["Material type"]
    },
    {
        key: "side",
        Component: OptionsField,
        attributes: ["side"],
        labels: ["Render side"],
        options: [
            {
                label: "Front",
                value: Game.FrontSide
            },
            {
                label: "Back",
                value: Game.BackSide
            },
            {
                label: "Both",
                value: Game.DoubleSide
            }
        ],
        helpText: ""
    },
    {
        key: "blending",
        Component: OptionsField,
        attributes: ["blending"],
        labels: ["Blending"],
        options: [
            {
                label: "No blending",
                value: Game.NoBlending
            },
            {
                label: "Normal blending",
                value: Game.NormalBlending
            },
            {
                label: "Additive blending",
                value: Game.AdditiveBlending
            },
            {
                label: "Subtractive blending",
                value: Game.SubtractiveBlending
            },
            {
                label: "Multiply blending",
                value: Game.MultiplyBlending
            }
        ]
    },
    {
        key: "color",
        Component: ColorField,
        attributes: ["color"],
        labels: ["Color"]
    },
    {
        key: "emissive",
        Component: ColorField,
        attributes: ["emissive"],
        labels: ["Emission color"]
    },
    {
        key: "specularColor",
        Component: ColorField,
        attributes: ["specularColor"],
        labels: ["Specular color"]
    },
    {
        key: "attenuationColor",
        Component: ColorField,
        attributes: ["attenuationColor"],
        labels: ["Attenuation color"]
    },
    {
        key: "emissiveIntensity",
        Component: RangeField,
        attributes: ["emissiveIntensity"],
        labels: ["Emissive intensity"],
        max: 1,
        min: 0,
        step: 0.01
    },
    {
        key: "reflectivity",
        Component: RangeField,
        attributes: ["reflectivity"],
        labels: ["Reflectivity"],
        max: 1,
        min: 0,
        step: 0.01
    },
    {
        key: "roughness",
        Component: RangeField,
        attributes: ["roughness"],
        labels: ["Roughness"],
        max: 1,
        min: 0,
        step: 0.01
    },
    {
        key: "metalness",
        Component: RangeField,
        attributes: ["metalness"],
        labels: ["Metalness"],
        max: 1,
        min: 0,
        step: 0.01
    },
    {
        key: "clearcoat",
        Component: RangeField,
        attributes: ["clearcoat"],
        labels: ["Clearcoat"],
        max: 1,
        min: 0,
        step: 0.01
    },
    {
        key: "clearcoatRoughness",
        Component: RangeField,
        attributes: ["clearcoatRoughness"],
        labels: ["Clearcoat roughness"],
        max: 1,
        min: 0,
        step: 0.01
    },
    {
        key: "transmission",
        Component: RangeField,
        attributes: ["transmission"],
        labels: ["Transmission"],
        max: 1,
        min: 0,
        step: 0.01
    },
    {
        key: "attenuationDistance",
        Component: SingleNumberField,
        attributes: ["attenuationDistance"],
        labels: ["Attenuation distance"],
    },
    {
        key: "thickness",
        Component: SingleNumberField,
        attributes: ["thickness"],
        labels: ["thickness"],
    },
    {
        key: "shininess",
        Component: SingleNumberField,
        attributes: ["shininess"],
        labels: ["Shininess"],
    },
    {
        key: "opacity",
        Component: RangeField,
        attributes: ["opacity"],
        labels: ["Opacity"],
        max: 1,
        min: 0,
        step: 0.01
    },
    {
        key: "alphaTest",
        Component: RangeField,
        attributes: ["alphaTest"],
        labels: ["Alpha test"],
        max: 1,
        min: 0,
        step: 0.01
    },

    {
        key: "vertexColors",
        Component: CheckboxField,
        attributes: ["vertexColors"],
        labels: ["Vertex colors"]
    },
    {
        key: "flatShading",
        Component: CheckboxField,
        attributes: ["flatShading"],
        labels: ["Flat shading"]
    },
    {
        key: "depthTest",
        Component: CheckboxField,
        attributes: ["depthTest"],
        labels: ["Depth test"]
    },
    {
        key: "depthWrite",
        Component: CheckboxField,
        attributes: ["depthWrite"],
        labels: ["Depth write"]
    },



    {
        key: "map",
        Component: MapField,
        attributes: ["map"],
        labels: ["Map"]
    },/*
    {
        Component: "MapField",
        attributes: [ "envMap" ],
        labels: "Mapa de Ambiente",
        "has_refr": true,
        "has_types": true
    },
    {
        Component: "MapField",
        attributes: [ "matcap" ],
        labels: "Mapeamento Esférico do Amb.",
        "has_refr": false,
        "has_types": false
    },
    
    
    
    {
        Component: "MapField",
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
        Component: "MapField",
        attributes: [ "specularMap" ],
        labels: "Mapa Especular",
        "has_refr": false,
        "has_types": false
    },
    
    
    
    {
        Component: "MapField",
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
        Component: "MapField",
        attributes: [ "emissiveMap" ],
        labels: "Mapa de Emissão",
        "has_refr": false,
        "has_types": false
    },
    
    
    
    {
        Component: "MapField",
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
        Component: "MapField",
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
        Component: "MapField",
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
        Component: "MapField",
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
        Component: "MapField",
        attributes: [ "roughnessMap" ],
        labels: "Mapa de Aspereza",
        "has_refr": false,
        "has_types": false
    },
    {
        Component: "MapField",
        attributes: [ "metalnessMap" ],
        labels: "Mapa da Metalicidade",
        "has_refr": false,
        "has_types": false
    },
    {
        Component: "MapField",
        attributes: [ "gradientMap" ],
        labels: "Mapa de Gradiente",
        "has_refr": false,
        "has_types": false
    },
    {
        Component: "MapField",
        attributes: [ "alphaMap" ],
        labels: "Mapa Alfa",
        "has_refr": false,
        "has_types": false
    } */
];