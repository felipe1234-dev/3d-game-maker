import { Location } from "react-router-dom";

function isLocation(object: any): object is Location {
    return (
        ("pathname" in object && typeof object.pathname === "string") &&
        ("search" in object && typeof object.search === "string") &&
        ("hash" in object && typeof object.hash === "string") &&
        ("key" in object && typeof object.key === "string")
    );
}

export default isLocation;