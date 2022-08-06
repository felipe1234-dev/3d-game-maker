import React from "react";
import { 
    AppBar, 
    Box, 
    Toolbar, 
    IconButton 
} from "@mui/material";
import { ChevronLeft as ArrowLeftIcon } from "@mui/icons-material";

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
            </Toolbar>
        </AppBar>
    );
}

export default Menubar;