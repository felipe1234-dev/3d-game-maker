import * as THREE from "three";
import { 
    ColorField,
    CheckboxField,
    MultiNumberField,
    SingleNumberField,
    OptionsField,
    // RangeField
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
    },/*
    {
        Component: ColorField,
        "attribute": "emissive",
        "label": "Cor da Emissão"
    },
    {
        Component: ColorField,
        "attribute": "specularColor",
        "label": "Cor Especular"
    },
    {
        Component: ColorField,
        "attribute": "attenuationColor",
        "label": "Cor de Atenuação"
    },
    
    
    
    {
        Component: SingleNumberField,
        "attribute": "emissiveIntensity",
        "label": "Intensidade da Emissão",
        "data_type": "Float",
        "max": "1",
        "min": "0"
    },
    {
        Component: SingleNumberField,
        "attribute": "reflectivity",
        "label": "Reflexividade",
        "data_type": "Float",
        "max": "1",
        "min": "0"
    },
    {
        Component: SingleNumberField,
        "attribute": "roughness",
        "label": "Aspereza",
        "data_type": "Float",
        "max": "1",
        "min": "0"
    },
    {
        Component: SingleNumberField,
        "attribute": "metalness",
        "label": "Metalicidade",
        "data_type": "Float",
        "max": "1",
        "min": "0"
    },
    {
        Component: SingleNumberField,
        "attribute": "clearcoat",
        "label": "Efeito Verniz",
        "data_type": "Float",
        "max": "1",
        "min": "0"
    },
    {
        Component: SingleNumberField,
        "attribute": "clearcoatRoughness",
        "label": "Aspereza do Verniz",
        "data_type": "Float",
        "max": "1",
        "min": "0"
    },
    {
        Component: SingleNumberField,
        "attribute": "transmission",
        "label": "Transmissão",
        "data_type": "Float",
        "max": "1",
        "min": "0"
    },
    {
        Component: SingleNumberField,
        "attribute": "attenuationDistance",
        "label": "Distância da Atenuação",
        "data_type": "Float"
    },
    {
        Component: SingleNumberField,
        "attribute": "thickness",
        "label": "Espessura",
        "data_type": "Float"
    },
    {
        Component: SingleNumberField,
        "attribute": "shininess",
        "label": "Brilho",
        "data_type": "Float"
    },
    {
        Component: SingleNumberField,
        "attribute": "opacity",
        "label": "Opacidade",
        "data_type": "Float",
        "max": "1",
        "min": "0"
    },
    {
        Component: SingleNumberField,
        "attribute": "alphaTest",
        "label": "Teste Alfa",
        "data_type": "Float",
        "max": "1",
        "min": "0"
    },
    
    
    
    {
        Component: CheckboxField,
        "attribute": "vertexColors",
        "label": "Cores dos Vértices"
    },
    {
        Component: CheckboxField,
        "attribute": "flatShading",
        "label": "Sem sombreamento"
    },
    {
        Component: CheckboxField,
        "attribute": "depthTest",
        "label": "Teste de Profundidade"
    },
    {
        Component: CheckboxField,
        "attribute": "depthWrite",
        "label": "Assinatura de Profundidade"
    },
    
    
    
    {
        Component: "ImageField",
        "attribute": "map",
        "label": "labelura",
        "has_refr": false,
        "has_types": false
    },
    {
        Component: "ImageField",
        "attribute": "envMap",
        "label": "Mapa de Ambiente",
        "has_refr": true,
        "has_types": true
    },
    {
        Component: "ImageField",
        "attribute": "matcap",
        "label": "Mapeamento Esférico do Amb.",
        "has_refr": false,
        "has_types": false
    },
    
    
    
    {
        Component: "ImageField",
        "attribute": "lightMap",
        "label": "Mapa de Iluminação",
        "has_refr": false,
        "has_types": false
    },
    {
        Component: SingleNumberField,
        "attribute": "lightMapIntensity",
        "label": "Intensidade",
        "data_type": "Float",
        "max": "1", 
        "min": "0"
    },
    
    
    
    {
        Component: "ImageField",
        "attribute": "specularMap",
        "label": "Mapa Especular",
        "has_refr": false,
        "has_types": false
    },
    
    
    
    {
        Component: "ImageField",
        "attribute": "aoMap",
        "label": "Mapa de oclusão ambiental",
        "has_refr": false,
        "has_types": false
    },
    {
        Component: SingleNumberField,
        "attribute": "aoMapIntensity",
        "label": "Intensidade",
        "data_type": "Float",
        "max": "1", 
        "min": "0"              
    },
    
    
    
    {
        Component: "ImageField",
        "attribute": "emissiveMap",
        "label": "Mapa de Emissão",
        "has_refr": false,
        "has_types": false
    },
    
    
    
    {
        Component: "ImageField",
        "attribute": "displacementMap",
        "label": "Mapa de Deslocamento",
        "has_refr": false,
        "has_types": false
    },
    {
        Component: SingleNumberField,
        "attribute": "displacementBias",
        "label": "Viés",
        "data_type": "Float"
    },
    {
        Component: SingleNumberField,
        "attribute": "displacementScale",
        "label": "Escala",
        "data_type": "Float"
    },
    
    
    
    {
        Component: "ImageField",
        "attribute": "normalMap",
        "label": "Mapa Normal",
        "has_refr": false,
        "has_types": false
    },
    {
        Component: SingleNumberField,
        "attribute": "normalScale.x",
        "label": "Escala (x)",
        "data_type": "Float"
    },
    {
        Component: SingleNumberField,
        "attribute": "normalScale.y",
        "label": "Escala (y)",
        "data_type": "Float"
    },
    
    
    {
        Component: "ImageField",
        "attribute": "clearcoatNormalMap",
        "label": "Mapa Normal do Verniz",
        "has_refr": false,
        "has_types": false
    },
    {
        Component: SingleNumberField,
        "attribute": "clearcoatNormalScale.x",
        "label": "Escala (x)",
        "data_type": "Float"
        
    },
    {
        Component: SingleNumberField,
        "attribute": "clearcoatNormalScale.y",
        "label": "Escala (y)",
        "data_type": "Float"
    },
    
    
    {
        Component: "ImageField",
        "attribute": "bumpMap",
        "label": "Mapa de Bumping",
        "has_refr": false,
        "has_types": false
    },
    {
        Component: SingleNumberField,
        "attribute": "bumpScale",
        "label": "Escala",
        "data_type": "Float"
    },
    
    
    
    {
        Component: "ImageField",
        "attribute": "roughnessMap",
        "label": "Mapa de Aspereza",
        "has_refr": false,
        "has_types": false
    },
    {
        Component: "ImageField",
        "attribute": "metalnessMap",
        "label": "Mapa da Metalicidade",
        "has_refr": false,
        "has_types": false
    },
    {
        Component: "ImageField",
        "attribute": "gradientMap",
        "label": "Mapa de Gradiente",
        "has_refr": false,
        "has_types": false
    },
    {
        Component: "ImageField",
        "attribute": "alphaMap",
        "label": "Mapa Alfa",
        "has_refr": false,
        "has_types": false
    } */
];