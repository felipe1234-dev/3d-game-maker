import { Object3D, isObject3D } from "./Object3D.interface";

interface Mesh extends Object3D {
    type: "Mesh";
    geometry?: string;
    material?: string;
    body?: string;
}

function isMesh(json: any): json is Mesh {
    const isObj3D = isObject3D(json);
    const isType = json.type === "Mesh";

    const hasGeometry = !!json.geometry;
    const isGeometry = typeof json.geometry === "string";

    const hasMaterial = !!json.material;
    const isMaterial = typeof json.material === "string";

    const hasBody = !!json.body;
    const isBody = typeof json.body === "string";

    return (
        isObj3D &&
        isType &&
        (hasGeometry ? isGeometry : true) &&
        (hasMaterial ? isMaterial : true) &&
        (hasBody ? isBody : true)
    );
}

export type { Mesh };
export { isMesh };