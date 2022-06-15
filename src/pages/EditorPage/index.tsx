import { Box } from "@mui/material";

import Menubar from "./Menubar";
import Viewport from "./Viewport";

import "@local/styles/pages/EditorPage.scss";

function EditorPage() {
    return (
        <Box component="main" className="Editor">
            <Menubar /> 
            <Viewport />
        </Box>
    );
}

export default EditorPage;