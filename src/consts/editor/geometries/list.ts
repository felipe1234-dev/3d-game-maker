import * as THREE from "three";

export default [
    {
        Constructor: THREE.BufferGeometry,
        label: "Free shape",
        attributes: [
            "points"
        ]
    },
    {
        Constructor: THREE.BoxGeometry,
        label: "Cube",
        attributes: [
            "type",
            "name",
            "uuid",
            "parameters.width",
            "parameters.height",
            "parameters.depth",
            "parameters.widthSegments",
            "parameters.heightSegments",
            "parameters.depthSegments"
        ]
    },
    {
        Constructor: THREE.CircleGeometry,
        label: "Circle",
        attributes: [
            "type",
            "name",
            "uuid",
            "parameters.radius",
            "parameters.segments",
            "parameters.thetaStart",
            "parameters.thetaLength"
        ]
    },
    {
        Constructor: THREE.CylinderGeometry,
        label: "Cylinder",
        attributes: [
            "type",
            "name",
            "uuid",
            "parameters.radiusTop",
            "parameters.radiusBottom",
            "parameters.height",
            "parameters.radialSegments",
            "parameters.heightSegments",
            "parameters.openEnded"
        ]
    },
    {
        Constructor: THREE.DodecahedronGeometry,
        label: "Dodecahedron",
        attributes: ["type", "name", "uuid", "parameters.radius", "parameters.detail"]
    },
    {
        Constructor: THREE.IcosahedronGeometry,
        label: "Icosahedron",
        attributes: ["type", "name", "uuid", "parameters.radius", "parameters.detail"]
    },
    {
        Constructor: THREE.LatheGeometry,
        label: "Lathe",
        attributes: [
            "type",
            "name",
            "uuid",
            "parameters.points",
            "parameters.segments",
            "parameters.phiStart",
            "parameters.phiLength"
        ]
    },
    {
        Constructor: THREE.OctahedronGeometry,
        label: "Octahedron",
        attributes: ["type", "name", "uuid", "parameters.radius", "parameters.detail"]
    },
    {
        Constructor: THREE.PlaneGeometry,
        label: "Plane",
        attributes: [
            "type",
            "name",
            "uuid",
            "parameters.width",
            "parameters.height",
            "parameters.widthSegments",
            "parameters.heightSegments"
        ]
    },
    {
        Constructor: THREE.RingGeometry,
        label: "Ring",
        attributes: [
            "type",
            "name",
            "uuid",
            "parameters.innerRadius",
            "parameters.outerRadius",
            "parameters.thetaSegments",
            "parameters.phiSegments",
            "parameters.thetaStart",
            "parameters.thetaLength"
        ]
    },
    {
        Constructor: THREE.SphereGeometry,
        label: "Sphere",
        attributes: [
            "type",
            "name",
            "uuid",
            "parameters.radius",
            "parameters.widthSegments",
            "parameters.heightSegments",
            "parameters.phiStart",
            "parameters.phiLength",
            "parameters.thetaStart",
            "parameters.thetaLength"
        ]
    },
    {
        Constructor: THREE.TetrahedronGeometry,
        label: "Tetrahedron",
        attributes: ["type", "name", "uuid", "parameters.radius", "parameters.detail"]
    },
    {
        Constructor: THREE.TorusGeometry,
        label: "Torus",
        attributes: [
            "type",
            "name",
            "uuid",
            "parameters.radius",
            "parameters.tube",
            "parameters.radialSegments",
            "parameters.tubularSegments",
            "parameters.arc"
        ]
    },
    {
        Constructor: THREE.TorusKnotGeometry,
        label: "Torus knot",
        attributes: [
            "type",
            "name",
            "uuid",
            "parameters.radius",
            "parameters.tube",
            "parameters.tubularSegments",
            "parameters.radialSegments",
            "parameters.p",
            "parameters.q"
        ]
    }
];