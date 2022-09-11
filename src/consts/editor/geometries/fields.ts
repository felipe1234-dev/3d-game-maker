import { 
    ColorField,
    CheckboxField,
    MultiNumberField,
    SingleNumberField,
    PointsField
    // RangeField
} from "@local/fields";

export default [
    {
        key: "points",
        Component: PointsField,
        attributes: [],
        labels: []
    },
    {
        key: "parameters.width",
        Component: SingleNumberField,
        attributes: [ "parameters.width" ],
        labels: [ "Width" ],
        helpText: "",
        min: 0.00
    },
    {
        key: "parameters.height",
        Component: SingleNumberField,
        attributes: [ "parameters.height" ],
        labels: [ "Height" ],
        min: 0.00
    },
    {
        key: "parameters.depth",
        Component: SingleNumberField,
        attributes: [ "parameters.depth" ],
        labels: [ "Depth" ],
        min: 0.00
    },
    {
        key: "parameters.detail",
        Component: SingleNumberField,
        attributes: [ "parameters.detail" ],
        labels: [ "Details" ],
        min: 0.00
    },
    {
        key: "parameters.segments",
        Component: SingleNumberField,
        attributes: [ "parameters.segments" ],
        labels: [ "Segments" ],
        min: 0.00
    },
    {
        key: "parameters.widthSegments",
        Component: SingleNumberField,
        attributes: [ "parameters.widthSegments" ],
        labels: [ "Width segments" ],
        min: 0.00
    },
    {
        key: "parameters.heightSegments",
        Component: SingleNumberField,
        attributes: [ "parameters.heightSegments" ],
        labels: [ "Height segments" ],
        min: 0.00
    },
    {
        key: "parameters.depthSegments",
        Component: SingleNumberField,
        attributes: [ "parameters.depthSegments" ],
        labels: [ "Depth segments" ],
        min: 0.00
    },
    {
        key: "parameters.radialSegments",
        Component: SingleNumberField,
        attributes: [ "parameters.radialSegments" ],
        labels: [ "Radial segments" ],
        min: 0.00
    },
    {
        key: "parameters.thetaSegments",
        Component: SingleNumberField,
        attributes: [ "parameters.thetaSegments" ],
        labels: [ "Theta segments (Θ)" ],
        min: 0.00
    },
    {
        key: "parameters.phiSegments",
        Component: SingleNumberField,
        attributes: [ "parameters.phiSegments" ],
        labels: [ "Phi segments (ϕ)" ],
        min: 0.00
    },
    {
        key: "parameters.tubularSegments",
        Component: SingleNumberField,
        attributes: [ "parameters.tubularSegments" ],
        labels: [ "Tubular segments" ],
        min: 0.00
    },
    {
        key: "parameters.radius",
        Component: SingleNumberField,
        attributes: [ "parameters.radius" ],
        labels: [ "Radius" ],
        min: 0.00
    },
    {
        key: "parameters.radiusTop",
        Component: SingleNumberField,
        attributes: [ "parameters.radiusTop" ],
        labels: [ "Top radius" ],
        min: 0.00
    },
    {
        key: "parameters.radiusBottom",
        Component: SingleNumberField,
        attributes: [ "parameters.radiusBottom" ],
        labels: [ "Bottom radius" ],
        min: 0.00
    },
    {
        key: "parameters.innerRadius",
        Component: SingleNumberField,
        attributes: [ "parameters.innerRadius" ],
        labels: [ "Inner radius" ],
        min: 0.00
    },
    {
        key: "parameters.outerRadius",
        Component: SingleNumberField,
        attributes: [ "parameters.outerRadius" ],
        labels: [ "Outer radius" ],
        min: 0.00
    },
    {
        key: "parameters.tube",
        Component: SingleNumberField,
        attributes: [ "parameters.tube" ],
        labels: [ "Tube radius" ],
        min: 0.00
    },
    {
        key: "parameters.thetaStart",
        Component: SingleNumberField,
        attributes: [ "parameters.thetaStart" ],
        labels: [ "Theta start (Θ)" ]
    },
    {
        key: "parameters.thetaLength",
        Component: SingleNumberField,
        attributes: [ "parameters.thetaLength" ],
        labels: [ "Theta length (Θ)" ],
        min: 0.00
    },
    {
        key: "parameters.phiStart",
        Component: SingleNumberField,
        attributes: [ "parameters.phiStart" ],
        labels: [ "Phi start (ϕ)" ]
    },
    {
        key: "parameters.phiLength",
        Component: SingleNumberField,
        attributes: [ "parameters.phiLength" ],
        labels: [ "Phi length (ϕ)" ]
    },
    {
        key: "parameters.openEnded",
        Component: CheckboxField,
        attributes: [ "parameters.openEnded" ],
        labels: [ "Open ended" ]
    },
    {
        key: "parameters.arc",
        Component: SingleNumberField,
        attributes: [ "parameters.arc" ],
        labels: [ "Arc" ],
    },
    {
        key: "parameters.p",
        Component: SingleNumberField,
        attributes: [ "parameters.p" ],
        labels: [ "Nodes" ],
        min: 0.00
    },
    {
        key: "parameters.q",
        Component: SingleNumberField,
        attributes: [ "parameters.q" ],
        labels: [ "Folds" ],
        min: 0.00
    }
];