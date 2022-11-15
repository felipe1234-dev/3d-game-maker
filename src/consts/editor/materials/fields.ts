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
        helpText: "",
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
        labels: ["Thickness"],
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
        labels: ["Texture"]
    },
    {
        key: "envMap",
        Component: MapField,
        attributes: ["envMap"],
        labels: ["Environment"],
    },
    {
        key: "matcap",
        Component: MapField,
        attributes: ["matcap"],
        labels: ["MatCap Map"],
    },
    {
        key: "lightMap",
        Component: MapField,
        attributes: ["lightMap"],
        labels: ["Light map"],
    },
    {
        key: "lightMapIntensity",
        Component: SingleNumberField,
        attributes: ["lightMapIntensity"],
        labels: ["Light map intensity"],
        max: 1,
        min: 0,
        step: 0.01
    },
    {
        key: "specularMap",
        Component: MapField,
        attributes: ["specularMap"],
        labels: ["Specular Map"],
    },
    {
        key: "aoMap",
        Component: MapField,
        attributes: ["aoMap"],
        labels: ["AO Map"],
    },
    {
        key: "aoMapIntensity",
        Component: SingleNumberField,
        attributes: ["aoMapIntensity"],
        labels: ["AO Map intensity"],
        max: 1,
        min: 0,
        step: 0.01
    },
    {
        key: "emissiveMap",
        Component: MapField,
        attributes: ["emissiveMap"],
        labels: ["Emissive Map"],
    },
    {
        key: "displacementMap",
        Component: MapField,
        attributes: ["displacementMap"],
        labels: ["Displacement Map"],
    },
    {
        key: "displacementBias",
        Component: SingleNumberField,
        attributes: ["displacementBias"],
        labels: ["Displacement bias"],
    },
    {
        key: "displacementScale",
        Component: SingleNumberField,
        attributes: ["displacementScale"],
        labels: ["Displacement scale"],
    },
    {
        key: "normalMap",
        Component: MapField,
        attributes: ["normalMap"],
        labels: ["Normal Map"],
    },
    {
        key: "normalScale.x",
        Component: SingleNumberField,
        attributes: ["normalScale.x"],
        labels: ["Normal scale (x)"],
    },
    {
        key: "normalScale.y",
        Component: SingleNumberField,
        attributes: ["normalScale.y"],
        labels: ["Normal scale (y)"],
    },
    {
        key: "clearcoatNormalMap",
        Component: MapField,
        attributes: ["clearcoatNormalMap"],
        labels: ["Clearcoat normal map"],
    },
    {
        key: "clearcoatNormalScale.x",
        Component: SingleNumberField,
        attributes: ["clearcoatNormalScale.x"],
        labels: ["Clearcoat normal map (x)"],

    },
    {
        key: "clearcoatNormalScale.y",
        Component: SingleNumberField,
        attributes: ["clearcoatNormalScale.y"],
        labels: ["Clearcoat normal map (y)"],
    },
    {
        key: "bumpMap",
        Component: MapField,
        attributes: ["bumpMap"],
        labels: ["Bumping map"],
    },
    {
        key: "bumpScale",
        Component: SingleNumberField,
        attributes: ["bumpScale"],
        labels: ["Escala"],
    },
    {
        key: "roughnessMap",
        Component: MapField,
        attributes: ["roughnessMap"],
        labels: ["Roughness map"],
    },
    {
        key: "metalnessMap",
        Component: MapField,
        attributes: ["metalnessMap"],
        labels: ["Metalness map"],
    },
    {
        key: "gradientMap",
        Component: MapField,
        attributes: ["gradientMap"],
        labels: ["Gradient map"],
    },
    {
        key: "alphaMap",
        Component: MapField,
        attributes: ["alphaMap"],
        labels: ["Alpha map"],
    }
];