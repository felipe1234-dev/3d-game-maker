import React from "react";
import { Box } from "@mui/material";

import Menubar from "./Menubar";
import Viewport from "../Editor/Viewport";
import Toolbar from "./Toolbar";
import Sidebar from "../Editor/Sidebar";

import "@local/styles/pages/EditorPage.scss";

function EditorPage() {
    const [open, setOpen] = React.useState<boolean>(true);
    
    return (
        <Box component="div" className="Editor">
            <Menubar
                open={open}
                setOpen={setOpen}
            /> 
            <Viewport />
            <Toolbar />
            <Sidebar
                aria-expanded={open}
                onClose={() => setOpen(false)}
                onOpen={() => setOpen(true)}
            />
        </Box>
    );
}

export default EditorPage;