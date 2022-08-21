import React from "react";
import {
    Button,
    Menu,
    MenuItem,
    Fade
} from "@mui/material";
import { t } from "@local/i18n";

function EditItem() {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    
    const label = "Edit";
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
                {t(label)}
            </Button>
            <Menu
                id={menuId}
                MenuListProps={{ "aria-labelledby": buttonId }}
                anchorEl={anchorEl}
                open={open}
                onClose={onClose}
                TransitionComponent={Fade}
            >
                <MenuItem onClick={onClose}>ProEdit</MenuItem>
                <MenuItem onClick={onClose}>My account</MenuItem>
                <MenuItem onClick={onClose}>Logout</MenuItem>
            </Menu>
        </>
    );
}

export default EditItem;