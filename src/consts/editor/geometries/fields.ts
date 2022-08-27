import { 
    ColorField,
    CheckboxField,
    MultiNumberField,
    SingleNumberField,
    // RangeField
} from "@local/fields";

export default [
    {
        key: "parameters.parameters.width",
        Component: SingleNumberField,
        attributes: [ "parameters.parameters.width" ],
        labels: [ "Width" ],
        helpText: ""
    },
    {
        key: "parameters.height",
        Component: SingleNumberField,
        attributes: [ "parameters.height" ],
        labels: [ "Height" ]
    },
    {
        key: "parameters.depth",
        Component: SingleNumberField,
        attributes: [ "parameters.depth" ],
        labels: [ "Depth" ]
    },
    {
        key: "parameters.detail",
        Component: SingleNumberField,
        attributes: [ "parameters.detail" ],
        labels: [ "Details" ]
    },
    {
        key: "parameters.segments",
        Component: SingleNumberField,
        attributes: [ "parameters.segments" ],
        labels: [ "Segments" ],
    },
    {
        key: "parameters.widthSegments",
        Component: SingleNumberField,
        attributes: [ "parameters.widthSegments" ],
        labels: [ "Width segments" ]
    },
    {
        key: "parameters.heightSegments",
        Component: SingleNumberField,
        attributes: [ "parameters.heightSegments" ],
        labels: [ "Height segments" ]
    },
    {
        key: "parameters.depthSegments",
        Component: SingleNumberField,
        attributes: [ "parameters.depthSegments" ],
        labels: [ "Depth segments" ]
    },
    {
        key: "parameters.radialSegments",
        Component: SingleNumberField,
        attributes: [ "parameters.radialSegments" ],
        labels: [ "Radial segments" ]
    },
    {
        key: "parameters.thetaSegments",
        Component: SingleNumberField,
        attributes: [ "parameters.thetaSegments" ],
        labels: [ "Theta segments (Θ)" ]
    },
    {
        key: "parameters.phiSegments",
        Component: SingleNumberField,
        attributes: [ "parameters.phiSegments" ],
        labels: [ "Phi segments (ϕ)" ]
    },
    {
        key: "parameters.tubularSegments",
        Component: SingleNumberField,
        attributes: [ "parameters.tubularSegments" ],
        labels: [ "Tubular segments" ]
    },
    {
        key: "parameters.radius",
        Component: SingleNumberField,
        attributes: [ "parameters.radius" ],
        labels: [ "Radius" ],
    },
    {
        key: "parameters.radiusTop",
        Component: SingleNumberField,
        attributes: [ "parameters.radiusTop" ],
        labels: [ "Top radius" ]
    },
    {
        key: "parameters.radiusBottom",
        Component: SingleNumberField,
        attributes: [ "parameters.radiusBottom" ],
        labels: [ "Bottom radius" ]
    },
    {
        key: "parameters.innerRadius",
        Component: SingleNumberField,
        attributes: [ "parameters.innerRadius" ],
        labels: [ "Inner radius" ]
    },
    {
        key: "parameters.outerRadius",
        Component: SingleNumberField,
        attributes: [ "parameters.outerRadius" ],
        labels: [ "Outer radius" ]
    },
    {
        key: "parameters.tube",
        Component: SingleNumberField,
        attributes: [ "parameters.tube" ],
        labels: [ "Tube radius" ]
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
        labels: [ "Theta length (Θ)" ]
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
        labels: [ "Nodes" ]
    },
    {
        key: "parameters.q",
        Component: SingleNumberField,
        attributes: [ "parameters.q" ],
        labels: [ "Folds" ],
    }
];