import {
    AppBar,
    Box,
    Button,
    Toolbar,
    IconButton
} from "@mui/material";
import { Link } from "react-router-dom";

import { t, getLang } from "@local/i18n";
import { ReactComponent as Logo } from "@local/images/logo.svg";
import { SvgIcon } from "@local/components";

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
                    <SvgIcon
                        className="HomePage-navbar-logo"
                        Svg={Logo}
                    />
                </IconButton>
                <Box sx={{ display: "flex", flexGrow: 1 }} />
                <Button
                    component={Link}
                    className="HomePage-navbar-goToEditor"
                    to={`/${lang}/editor/new-game`}
                >
                    {t("Create a game")}
                </Button>
            </Toolbar>
        </AppBar>
    );
}

export default Navbar;