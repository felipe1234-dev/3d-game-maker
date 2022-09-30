import rendererToJSON from "./rendererToJSON.function";
import rendererFromJSON from "./rendererFromJSON.function";

const renderer = {
    toJSON: rendererToJSON,
    fromJSON: rendererFromJSON,
};

export default renderer;