import * as THREE from "three";

export default [
    {
        Constructor: THREE.BoxGeometry,
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
        Constructor: THREE.CircleGeometry,
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
        Constructor: THREE.CylinderGeometry,
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
        Constructor: THREE.DodecahedronGeometry,
        label: "Dodecahedron",
        props: ["type", "name", "uuid", "radius", "detail"]
    },
    {
        Constructor: THREE.IcosahedronGeometry,
        label: "Icosahedron",
        props: ["type", "name", "uuid", "radius", "detail"]
    },
    {
        Constructor: THREE.LatheGeometry,
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
        Constructor: THREE.OctahedronGeometry,
        label: "Octahedron",
        props: ["type", "name", "uuid", "radius", "detail"]
    },
    {
        Constructor: THREE.PlaneGeometry,
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
        Constructor: THREE.RingGeometry,
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
        Constructor: THREE.SphereGeometry,
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
        Constructor: THREE.TetrahedronGeometry,
        label: "Tetrahedron",
        props: ["type", "name", "uuid", "radius", "detail"]
    },
    {
        Constructor: THREE.TorusGeometry,
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
        Constructor: THREE.TorusKnotGeometry,
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