import { Box } from "@mui/material";
import Top from "./Top";
import Center from "./Center";
import Bottom from "./Bottom";

function RightColumn() {
    return (
        <Box className="Editor-toolbar-rightContainer" component="aside">
            <Top />
            <Center />
            <Bottom />
        </Box>
    );
}

export default RightColumn;