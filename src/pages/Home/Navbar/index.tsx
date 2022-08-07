import { 
    AppBar, 
    Avatar, 
    Box, 
    Button, 
    Container, 
    IconButton, 
    Menu, 
    MenuItem, 
    Toolbar, 
    Tooltip, 
    Typography
} from "@mui/material";
import { ReactComponent as Logo } from "@local/images/logo.svg";

function Navbar() {
    return (
        <AppBar 
            component="nav" 
            className="HomePage-navbar" 
            position="fixed"
        >
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Logo className="HomePage-navbar-logo" />
                </Toolbar>
                <Box sx={{ display: "flex", flexGrow: 1 }} />
            </Container>
        </AppBar>
    );
}

export default Navbar;