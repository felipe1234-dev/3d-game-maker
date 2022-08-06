import React from "react";
import { Box } from "@mui/material";

import Menubar from "./Menubar";
import Viewport from "../Editor/Viewport";
import Toolbar from "./Toolbar";
import Sidebar from "../Editor/Sidebar";

import "@local/styles/pages/EditorPage.scss";

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