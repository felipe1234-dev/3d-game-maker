import React from "react";
import { Box } from "@mui/material";

import Menubar from "./Menubar";
import Viewport from "./Viewport";
import Toolbar from "./Toolbar";

import "@local/styles/pages/EditorPage/index.scss";

function EditorPage() {
    return (
        <Box component="div" className="Editor">
            <Menubar /> 
            <Viewport />
            <Toolbar />
        </Box>
    );
}

export default EditorPage;