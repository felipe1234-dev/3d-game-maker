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

interface MenubarProps {
    open: boolean, // If sidebar is open
    setOpen: (open: boolean) => void
}

function Menubar({ open, setOpen }: MenubarProps) {
    return (
        <AppBar className="Editor-menubar" component="header">
            <Toolbar>
                <FileItem />
                <EditItem />
                <AddItem />
                <Box flexGrow={1} />
                {!open && (
                    <IconButton
                        onClick={() => setOpen(true)}
                        aria-label="open sidebar"
                    >
                        <ArrowLeftIcon />
                    </IconButton>
                )}
            </Toolbar>
        </AppBar>
    );
}

export default Menubar;