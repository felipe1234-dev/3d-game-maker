import { Box } from "@mui/material";

import { default as TopRight } from "./right/Top";
import { default as BottomRight } from "./right/Bottom";

import { default as TopLeft } from "./left/Top";
import { default as BottomLeft } from "./left/Bottom";

function Toolbar() {
    return (
        <Box className="Editor-toolbar">
            <Box className="Editor-toolbar-rightContainer" component="aside">
                <TopRight />
                <BottomRight />
            </Box>
            <Box className="Editor-toolbar-leftContainer" component="aside">
                <TopLeft />
                <BottomLeft />
            </Box>
        </Box>
    );
}

export default Toolbar;