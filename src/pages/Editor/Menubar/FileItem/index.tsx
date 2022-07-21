import React from "react";
import {
    Button,
    Menu,
    MenuItem,
    Fade
} from "@mui/material";

function FileItem() {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    
    const label = "File";
    const buttonId = label.toLowerCase() + "-button";
    const menuId = label.toLowerCase() + "-menu";
    
    const onOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    
    const onClose = () => {
        setAnchorEl(null);
    };
    
    return (
        <>
            <Button
                id={buttonId}
                aria-controls={open ? menuId : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={onOpen}
            >
                {label}
            </Button>
            <Menu
                id={menuId}
                MenuListProps={{ "aria-labelledby": buttonId }}
                anchorEl={anchorEl}
                open={open}
                onClose={onClose}
                TransitionComponent={Fade}
            >
                <MenuItem onClick={onClose}>Profile</MenuItem>
                <MenuItem onClick={onClose}>My account</MenuItem>
                <MenuItem onClick={onClose}>Logout</MenuItem>
            </Menu>
        </>
    );
}

export default FileItem;