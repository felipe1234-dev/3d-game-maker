import objectList from "../objects/list";

export default objectList.filter(obj => obj.Constructor.name.match(/light/ig));