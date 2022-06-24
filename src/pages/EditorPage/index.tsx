import React from "react";
import { Box } from "@mui/material";

import Menubar from "./Menubar";
import Viewport from "./Viewport";
import Toolbar from "./Toolbar";
import Sidebar from "./Sidebar";

import "@local/styles/pages/EditorPage.scss";

function EditorPage() {
    const [open, setOpen] = React.useState<boolean>(true);
    const sidebarIsExpanded = open;
    const mainIsExpanded = !sidebarIsExpanded;
    
    return (
        <Box component="div" className="Editor">
            <Box 
                component="main" 
                className="Editor-main"
                aria-expanded={mainIsExpanded}
            >
                <Menubar
                    open={open}
                    setOpen={setOpen}
                /> 
                <Viewport />
                <Toolbar />
            </Box>
            <Sidebar
                aria-expanded={sidebarIsExpanded}
                onClose={() => setOpen(false)}
                onOpen={() => setOpen(true)}
            />
        </Box>
    );
}

export default EditorPage;