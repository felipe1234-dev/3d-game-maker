import { Box } from "@mui/material";
import Top from "./Top";
import Bottom from "./Bottom";

function LeftColumn() {
    return (
        <Box className="Editor-toolbar-leftContainer" component="aside">
            <Top />
            <Bottom />
        </Box>
    );
}

export default LeftColumn;