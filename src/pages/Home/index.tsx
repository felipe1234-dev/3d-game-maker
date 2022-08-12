import { Box } from "@mui/material";
import Navbar from "./Navbar";
import "@local/styles/pages/HomePage.scss";

function HomePage() {
    return (
        <Box className="HomePage">
            <Navbar />
        </Box>
    );
}

export default HomePage;