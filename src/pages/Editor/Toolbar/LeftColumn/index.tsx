import Top from "./Top";
import Bottom from "./Bottom";

function LeftColumn() {
    return (
        <aside className="Editor-toolbar-leftContainer">
            <Top />
            <Bottom />
        </aside>
    );
}

export default LeftColumn;