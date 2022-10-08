import cameras from "./cameras.object";
import lights from "./lights.object";

const objects3D = [
    ...cameras,
    ...lights,
    "Mesh",
    "Group",
] as const;

export default objects3D;