import LeftColumn from "./LeftColumn";
import RightColumn from "./RightColumn";

function Toolbar() {
    return (
        <div className="Editor-toolbar">
            <LeftColumn />
            <RightColumn />
        </div>
    );
}

export default Toolbar;