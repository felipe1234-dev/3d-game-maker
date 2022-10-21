import { Game } from "@local/classes";

export default [
    {
        Constructor: Game.BoxGeometry,
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
        Constructor: Game.CircleGeometry,
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
        Constructor: Game.CylinderGeometry,
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
        Constructor: Game.DodecahedronGeometry,
        label: "Dodecahedron",
        attributes: ["type", "name", "uuid", "parameters.radius", "parameters.detail"]
    },
    {
        Constructor: Game.IcosahedronGeometry,
        label: "Icosahedron",
        attributes: ["type", "name", "uuid", "parameters.radius", "parameters.detail"]
    },
    {
        Constructor: Game.LatheGeometry,
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
        Constructor: Game.OctahedronGeometry,
        label: "Octahedron",
        attributes: ["type", "name", "uuid", "parameters.radius", "parameters.detail"]
    },
    {
        Constructor: Game.PlaneGeometry,
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
        Constructor: Game.RingGeometry,
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
        Constructor: Game.SphereGeometry,
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
        Constructor: Game.TetrahedronGeometry,
        label: "Tetrahedron",
        attributes: ["type", "name", "uuid", "parameters.radius", "parameters.detail"]
    },
    {
        Constructor: Game.TorusGeometry,
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
        Constructor: Game.TorusKnotGeometry,
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