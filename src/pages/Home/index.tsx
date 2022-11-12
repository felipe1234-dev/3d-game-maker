import Navbar from "./Navbar";
import GameList from "./GameList";
import "@local/styles/pages/HomePage.scss";

function HomePage() {
    return (
        <div className="HomePage">
            <Navbar />
            <GameList />
        </div>
    );
}

export default HomePage;