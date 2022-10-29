import { Box } from "@mui/material";
import Navbar from "./Navbar";
import GameList from "./GameList";
import "@local/styles/pages/HomePage.scss";

function HomePage() {
    return (
        <Box className="HomePage">
            <Navbar />
            <GameList />
        </Box>
    );
}

export default HomePage;