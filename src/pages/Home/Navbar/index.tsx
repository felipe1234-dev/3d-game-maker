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
import { I18nContext } from "@local/contexts";

function Navbar() {
    const scope = "pages.home.navbar.";
    const i18n = React.useContext(I18nContext);
    const lang = i18n.lang();

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
                    {i18n.get(scope + "goToEditor")}
                </Button>
            </Toolbar>
        </AppBar>
    );
}

export default Navbar;