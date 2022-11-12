import Top from "./Top";
import Center from "./Center";
import Bottom from "./Bottom";

function RightColumn() {
    return (
        <aside className="Editor-toolbar-rightContainer">
            <Top />
            <Center />
            <Bottom />
        </aside>
    );
}

export default RightColumn;