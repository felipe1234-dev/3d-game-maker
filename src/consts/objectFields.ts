import { 
    ColorField,
    CheckboxField,
    MultiNumberField,
    // SingleNumberField,
    // RangeField
} from "@local/fields";

const objectFields = [
    {
        key: "color",
        Component: ColorField,
        attributes: [ "color" ],
        labels: [ "Color" ]
    },
    {
        key: "groundColor",
        Component: ColorField,
        attributes: [ "groundColor" ],
        labels: [ "Ground color" ]
    },
    {
        key: "position",
        Component: MultiNumberField,
        attributes: [
            "position.x",
            "position.y",
            "position.z"
        ],
        labels: [
            "Position",
            "X",
            "Y",
            "Z"
        ],
        step: 0.01
    },
    // {
    //     Component: MultiNumberField,
    //     attributes: [ "rotation" ],
    //     labels: [ "Rotation" ],
    //     step: 0.01,
    //     data_type: "Float"
    // },
    // {
    //     Component: MultiNumberField,
    //     attributes: [ "scale" ],
    //     labels: [ "Escala" ],
    //     step: 0.01,
    //     data_type: "Float"
    // },
    // {
    //     Component: SingleNumberField,
    //     attributes: [ "intensidade",
    //     labels: [ "Intensidade",
    //     data_type: "Float",
    //     step: 0.01
    // },
    // {
    //     Component: SingleNumberField,
    //     attributes: [ "distance",
    //     labels: [ "Distância",
    //     data_type: "Float",
    //     step: 0.01,
    //     min: 0.00
    // },
    // {
    //     Component: RangeField,
    //     attributes: [ "angle",
    //     labels: [ "Ângulo (radianos)",
    //     data_type: "Float",
    //     step: 0.001,
    //     max: 1.571,
    //     min: 0.000
    // },
    // {
    //     Component: RangeField,
    //     attributes: [ "angle",
    //     labels: [ "Ângulo (radianos)",
    //     data_type: "Float",
    //     step: 0.001,
    //     max: 1.571,
    //     min: 0.000
    // },
    // {
    //     Component: RangeField,
    //     attributes: [ "penumbra",
    //     labels: [ "Penumbra",
    //     data_type: "Float",
    //     step: 0.01,
    //     max: 1.00,
    //     min: 0.00
    // },
    // {
    //     Component: SingleNumberField,
    //     attributes: [ "decay",
    //     labels: [ "Decaimento",
    //     data_type: "Float",
    //     step: 0.01,
    //     min: 0.00
    // },
    // {
    //     Component: SingleNumberField,
    //     attributes: [ "shadowBias",
    //     labels: [ "Viés da Sombra",
    //     data_type: "Float",
    //     step: 0.00001
    // },
    // {
    //     Component: SingleNumberField,
    //     attributes: [ "shadowBias",
    //     labels: [ "Viés da Sombra",
    //     data_type: "Float",
    //     step: 0.00001
    // },
    // {
    //     Component: SingleNumberField,
    //     attributes: [ "shadowNormalBias",
    //     labels: [ "Viés Normal da Sombra",
    //     data_type: "Float",
    //     step: 0.01
    // },
    // {
    //     Component: SingleNumberField,
    //     attributes: [ "shadowNormalBias",
    //     labels: [ "Viés Normal da Sombra",
    //     data_type: "Float",
    //     step: 0.01
    // },
    // {
    //     Component: SingleNumberField,
    //     attributes: [ "shadowRadius",
    //     labels: [ "Raio da Sombra",
    //     data_type: "Float",
    //     step: 0.01
    // },
    {
        key: "visible",
        Component: CheckboxField,
        attributes: [ "visible" ],
        labels: [ "Visible" ],
        data_type: "Bool"
    },
    {
        key: "frustumCulled",
        Component: CheckboxField,
        attributes: [ "frustumCulled" ],
        labels: [ "Frustum Culled" ],
        helpText: "If checked, this object will not be rendered if it is out of the camera field of view"
    }
];

export default objectFields;