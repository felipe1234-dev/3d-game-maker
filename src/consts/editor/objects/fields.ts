import { 
    ColorField,
    CheckboxField,
    MultiNumberField,
    SingleNumberField,
    TextField,
    RangeField
} from "@local/fields";

export default [
    {
        key: "name",
        Component: TextField,
        attributes: [ "name" ],
        labels: [ "Name" ]
    },
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
        step: 0.1
    },
    {
        key: "rotation",
        Component: MultiNumberField,
        attributes: [ 
            "rotation.x",
            "rotation.y",
            "rotation.z"
        ],
        labels: [ 
            "Rotation",
            "X",
            "Y",
            "Z"
        ],
        step: 0.1
    },
    {
        key: "scale",
        Component: MultiNumberField,
        attributes: [ 
            "scale.x", 
            "scale.y", 
            "scale.z", 
        ],
        labels: [ 
            "Scale", 
            "X",
            "Y",
            "Z"
        ],
        step: 0.1,
        min: 0.0
    },
    {
        key: "intensity",
        Component: SingleNumberField,
        attributes: [ "intensity" ],
        labels: [ "Intensity" ],
        step: 0.01
    },
    {
        key: "distance",
        Component: SingleNumberField,
        attributes: [ "distance" ],
        labels: [ "Distance" ],
        step: 0.01,
        min: 0.00
    },
    {
        key: "angle",
        Component: RangeField,
        attributes: [ "angle" ],
        labels: [ "Angle (radians)" ],
        step: 0.001,
        max: 1.571,
        min: 0.000
    },
    {
        key: "penumbra",
        Component: RangeField,
        attributes: [ "penumbra" ],
        labels: [ "Penumbra" ],
        step: 0.01,
        max: 1.00,
        min: 0.00
    },
    {
        key: "decay",
        Component: SingleNumberField,
        attributes: [ "decay" ],
        labels: [ "Decay" ],
        step: 0.01,
        min: 0.00
    },
    {
        key: "shadowBias",
        Component: SingleNumberField,
        attributes: [ "shadowBias" ],
        labels: [ "Shadow bias" ],
        step: 0.00001
    },
    {
        key: "shadowNormalBias",
        Component: SingleNumberField,
        attributes: [ "shadowNormalBias" ],
        labels: [ "Shadow normal bias" ],
        step: 0.01
    },
    {
        key: "shadowRadius",
        Component: SingleNumberField,
        attributes: [ "shadowRadius" ],
        labels: [ "Shadow radius" ],
        step: 0.01
    },
    {
        key: "visible",
        Component: CheckboxField,
        attributes: [ "visible" ],
        labels: [ "Visible" ],
        
    },
    {
        key: "frustumCulled",
        Component: CheckboxField,
        attributes: [ "frustumCulled" ],
        labels: [ "Frustum Culled" ],
        helpText: "If checked, this object will not be rendered if it is out of the camera field of view"
    },
    {
        key: "castShadow",
        Component: CheckboxField,
        attributes: [ "castShadow" ],
        labels: [ "Cast shadow" ]
    },
    {
        key: "receiveShadow",
        Component: CheckboxField,
        attributes: [ "receiveShadow" ],
        labels: [ "Receive shadow" ]
    },
    {
        key: "renderOrder",
        Component: SingleNumberField,
        attributes: [ "renderOrder" ],
        labels: [ "Render order" ],
        step: 1,
        min: 0
    },
];