import cameras from "./cameras.object";
import lights from "./lights.object";
import controls from "./controls.object";

const objects3D = [
    "BaseObject3D",
    "Group",
    "Mesh",
    ...cameras,
    ...lights,
    ...controls,
    "Scene",
] as const;

export default objects3D;