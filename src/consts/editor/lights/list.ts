import objectList from "../objects/list";

export default objectList.filter(obj => obj.className.match(/light/ig));