import { Geometry, isGeometry } from "./Geometry.interface";

interface WireframeGeometry extends Geometry {
    type: "WireframeGeometry";
    geometry: Geometry;
}

function isWireframeGeometry(json: any): json is WireframeGeometry {
    return (
        json.type === "WireframeGeometry" &&
        isGeometry(json.geometry) &&
        isGeometry(json)
    );
}

export type { WireframeGeometry };
export { isWireframeGeometry };