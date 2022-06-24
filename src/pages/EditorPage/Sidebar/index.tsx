import React from "react";
import { 
    SwipeableDrawer, 
    SwipeableDrawerProps,
    Box,
    IconButton
} from "@mui/material";
import {
    ChevronLeft as ArrowLeftIcon,
    ChevronRight as ArrowRightIcon
} from "@mui/icons-material";

function Sidebar(props: Omit<SwipeableDrawerProps, "open">) {
    const iOS = navigator && /iPad|iPhone|iPod/.test(navigator.userAgent);
    
    return (
        <SwipeableDrawer
            className="Editor-sidebar"
            variant="persistent"
            anchor="right"
            open={true}
            disableBackdropTransition={!iOS} 
            disableDiscovery={iOS}
            {...props}
        >
            <Box component="header" className="Editor-sidebar-header">
                <IconButton onClick={props.onClose}>
                    {props["aria-expanded"] ? <ArrowRightIcon /> : <ArrowLeftIcon />}
                </IconButton>
            </Box>
        </SwipeableDrawer>
    );
}

export default Sidebar;