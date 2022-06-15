import React from "react";
import { AppBar, Box, Toolbar } from "@mui/material";

import FileItem from "./FileItem";
import EditItem from "./EditItem";
import AddItem from "./AddItem";

function Menubar() {
    return (
        <AppBar className="Editor-menubar" component="header">
            <Toolbar>
                <FileItem />
                <EditItem />
                <AddItem />
                <Box flexGrow={1} />
            </Toolbar>
        </AppBar>
    );
}

export default Menubar;