import objects from "../objects/list";

export default objects.filter(object => object.Constructor.name.match(/group/gi));