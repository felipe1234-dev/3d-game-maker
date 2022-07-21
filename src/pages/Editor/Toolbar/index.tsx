import { Box } from "@mui/material";

import Top from "./Top";
import Bottom from "./Bottom";

function Toolbar() {
    return (
        <Box className="Editor-toolbar" component="aside">
            <Top />
            <Bottom />
        </Box>
    );
}

export default Toolbar;