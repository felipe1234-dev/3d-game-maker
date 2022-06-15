import { Box } from "@mui/material";

import Menubar from "./Menubar";
import Viewport from "./Viewport";
import Accordions from "./Accordions";

import "@local/styles/pages/EditorPage.scss";

function EditorPage() {
    return (
        <Box component="main" className="Editor">
            <Menubar /> 
            <Viewport />
            <Accordions />
        </Box>
    );
}

export default EditorPage;