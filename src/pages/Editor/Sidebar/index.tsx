import React from "react";
import { 
    SwipeableDrawer, 
    SwipeableDrawerProps,
    Box,
    IconButton,
    Divider,
    List
} from "@mui/material";
import {
    ChevronRight as ArrowRightIcon
} from "@mui/icons-material";

function Sidebar(props: Omit<SwipeableDrawerProps, "open">) {
    const iOS = navigator && /iPad|iPhone|iPod/.test(navigator.userAgent);
    
    return (
        <SwipeableDrawer
            className="Editor-sidebar"
            variant="persistent"
            anchor="left"
            open={true}
            disableBackdropTransition={!iOS} 
            disableDiscovery={iOS}
            {...props}
        >
            <Box component="header" className="Editor-sidebar-header">
                {props["aria-expanded"] && (
                    <IconButton onClick={props.onClose}>
                        <ArrowRightIcon />
                    </IconButton>
                )}
            </Box>
            <Divider />
            <List>
                
            </List>
        </SwipeableDrawer>
    );
}

export default Sidebar;