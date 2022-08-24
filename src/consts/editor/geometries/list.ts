export default [
    {
        className: "BoxGeometry",
        label: "Cube",
        props: [
            "type",
            "name",
            "uuid",
            "width",
            "height",
            "depth",
            "widthSegments",
            "heightSegments",
            "depthSegments"
        ]
    },
    {
        className: "CircleGeometry",
        label: "Circle",
        props: [
            "type",
            "name",
            "uuid",
            "radius",
            "segments",
            "thetaStart",
            "thetaLength"
        ]
    },
    {
        className: "CylinderGeometry",
        label: "Cylinder",
        props: [
            "type",
            "name",
            "uuid",
            "radiusTop",
            "radiusBottom",
            "height",
            "radialSegments",
            "heightSegments",
            "openEnded"
        ]
    },
    {
        className: "DodecahedronGeometry",
        label: "Dodecahedron",
        props: ["type", "name", "uuid", "radius", "detail"]
    },
    {
        className: "IcosahedronGeometry",
        label: "Icosahedron",
        props: ["type", "name", "uuid", "radius", "detail"]
    },
    {
        className: "LatheGeometry",
        label: "Lathe",
        props: [
            "type",
            "name",
            "uuid",
            "points",
            "segments",
            "phiStart",
            "phiLength"
        ]
    },
    {
        className: "OctahedronGeometry",
        label: "Octahedron",
        props: ["type", "name", "uuid", "radius", "detail"]
    },
    {
        className: "PlaneGeometry",
        label: "Plane",
        props: [
            "type",
            "name",
            "uuid",
            "width",
            "height",
            "widthSegments",
            "heightSegments"
        ]
    },
    {
        className: "RingGeometry",
        label: "Ring",
        props: [
            "type",
            "name",
            "uuid",
            "innerRadius",
            "outerRadius",
            "thetaSegments",
            "phiSegments",
            "thetaStart",
            "thetaLength"
        ]
    },
    {
        className: "SphereGeometry",
        label: "Sphere",
        props: [
            "type",
            "name",
            "uuid",
            "radius",
            "widthSegments",
            "heightSegments",
            "phiStart",
            "phiLength",
            "thetaStart",
            "thetaLength"
        ]
    },
    {
        className: "TetrahedronGeometry",
        label: "Tetrahedron",
        props: ["type", "name", "uuid", "radius", "detail"]
    },
    {
        className: "TorusGeometry",
        label: "Torus",
        props: [
            "type",
            "name",
            "uuid",
            "radius",
            "tube",
            "radialSegments",
            "tubularSegments",
            "arc"
        ]
    },
    {
        className: "TorusKnotGeometry",
        label: "Torus knot",
        props: [
            "type",
            "name",
            "uuid",
            "radius",
            "tube",
            "tubularSegments",
            "radialSegments",
            "p",
            "q"
        ]
    }
];