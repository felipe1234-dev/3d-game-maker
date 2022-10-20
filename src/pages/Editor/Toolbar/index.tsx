import { Box } from "@mui/material";
import LeftColumn from "./LeftColumn";
import RightColumn from "./RightColumn";

function Toolbar() {
    return (
        <Box className="Editor-toolbar">
            <LeftColumn />
            <RightColumn />
        </Box>
    );
}

export default Toolbar;