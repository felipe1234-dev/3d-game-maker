import React from "react";
import { 
    AppBar, 
    Avatar, 
    Box, 
    Button, 
    Toolbar, 
    IconButton, 
    Menu, 
    MenuItem, 
    Tooltip, 
    Typography
} from "@mui/material";
import { Link } from "react-router-dom";
import { ReactComponent as Logo } from "@local/images/logo.svg";
import { t, getLang } from "@local/i18n";

function Navbar() {
    const lang = getLang();

    return (
        <AppBar 
            component="nav" 
            className="HomePage-navbar" 
            position="fixed"
        >
            <Toolbar>
                <IconButton 
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    sx={{ mr: 2 }}
                >
                    <Logo className="HomePage-navbar-logo" />
                </IconButton>
                <Box sx={{ display: "flex", flexGrow: 1 }} />
                <Button
                    component={Link}
                    className="HomePage-navbar-goToEditor"
                    to={`/${lang}/editor`}
                >
                    {t("Create a game")}
                </Button>
            </Toolbar>
        </AppBar>
    );
}

export default Navbar;