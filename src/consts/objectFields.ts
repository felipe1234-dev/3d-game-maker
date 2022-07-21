import { 
    ColorField,
    CheckboxField,
    // TriadNumberField,
    // SingleNumberField,
    // RangeField
} from "@local/fields";

export default [
    {
        Component: ColorField,
        attribute: "color",
        label: "Cor"
    },
    {
        Component: ColorField,
        attribute: "groundColor",
        label: "Cor do Solo"
    },
    // {
    //     Component: TriadNumberField,
    //     attribute: "position",
    //     label: "Posição",
    //     step: 0.01,
    //     data_type: "Float"
    // },
    // {
    //     Component: TriadNumberField,
    //     attribute: "rotation",
    //     label: "Rotação",
    //     step: 0.01,
    //     data_type: "Float"
    // },
    // {
    //     Component: TriadNumberField,
    //     attribute: "scale",
    //     label: "Escala",
    //     step: 0.01,
    //     data_type: "Float"
    // },
    // {
    //     Component: SingleNumberField,
    //     attribute: "intensidade",
    //     label: "Intensidade",
    //     data_type: "Float",
    //     step: 0.01
    // },
    // {
    //     Component: SingleNumberField,
    //     attribute: "distance",
    //     label: "Distância",
    //     data_type: "Float",
    //     step: 0.01,
    //     min: 0.00
    // },
    // {
    //     Component: RangeField,
    //     attribute: "angle",
    //     label: "Ângulo (radianos)",
    //     data_type: "Float",
    //     step: 0.001,
    //     max: 1.571,
    //     min: 0.000
    // },
    // {
    //     Component: RangeField,
    //     attribute: "angle",
    //     label: "Ângulo (radianos)",
    //     data_type: "Float",
    //     step: 0.001,
    //     max: 1.571,
    //     min: 0.000
    // },
    // {
    //     Component: RangeField,
    //     attribute: "penumbra",
    //     label: "Penumbra",
    //     data_type: "Float",
    //     step: 0.01,
    //     max: 1.00,
    //     min: 0.00
    // },
    // {
    //     Component: SingleNumberField,
    //     attribute: "decay",
    //     label: "Decaimento",
    //     data_type: "Float",
    //     step: 0.01,
    //     min: 0.00
    // },
    // {
    //     Component: SingleNumberField,
    //     attribute: "shadowBias",
    //     label: "Viés da Sombra",
    //     data_type: "Float",
    //     step: 0.00001
    // },
    // {
    //     Component: SingleNumberField,
    //     attribute: "shadowBias",
    //     label: "Viés da Sombra",
    //     data_type: "Float",
    //     step: 0.00001
    // },
    // {
    //     Component: SingleNumberField,
    //     attribute: "shadowNormalBias",
    //     label: "Viés Normal da Sombra",
    //     data_type: "Float",
    //     step: 0.01
    // },
    // {
    //     Component: SingleNumberField,
    //     attribute: "shadowNormalBias",
    //     label: "Viés Normal da Sombra",
    //     data_type: "Float",
    //     step: 0.01
    // },
    // {
    //     Component: SingleNumberField,
    //     attribute: "shadowRadius",
    //     label: "Raio da Sombra",
    //     data_type: "Float",
    //     step: 0.01
    // },
    {
        Component: CheckboxField,
        attribute: "visible",
        label: "Visível",
        data_type: "Bool"
    },
    {
        Component: CheckboxField,
        attribute: "frustumCulled",
        label: "Frustum Cull",
        data_type: "Bool"
    }
];