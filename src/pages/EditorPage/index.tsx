import { Box } from "@mui/material";

import Menubar from "./Menubar";
import Viewport from "./Viewport";
import Toolbar from "./Toolbar";

import "@local/styles/pages/EditorPage.scss";

function EditorPage() {
    return (
        <Box component="main" className="Editor">
            <Menubar /> 
            <Viewport />
            <Toolbar />
        </Box>
    );
}

export default EditorPage;