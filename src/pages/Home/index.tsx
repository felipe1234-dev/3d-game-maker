import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { GameList } from "@local/components";
import { auth } from "@local/api";
import UserModel from "@local/api/models/User.model";
import { getLang } from "@local/i18n";

import Navbar from "./Navbar";

import "@local/styles/pages/HomePage.scss";

function HomePage() {
    const [loggedUser, setLoggedUser] = useState<UserModel>();
    const navigate = useNavigate();
    const lang = getLang();

    useEffect(() => {
        (async () => {
            const user = await auth.currentUser();
            if (!user) return;
            setLoggedUser(user);
        })();
    }, []);

    return (
        <div className="HomePage">
            <Navbar />
            {loggedUser && (
                <GameList
                    className="HomePage-gameList"
                    where={[
                        ["createdBy", "==", loggedUser.uid]
                    ]}
                    orderBy={[
                        ["createdAt", "desc"]
                    ]}
                    handleClick={(evt, game) => {
                        navigate(`/${lang}/editor/${game.uid}`, {
                            state: {
                                useLoader: true,
                            }
                        });
                    }}
                />
            )}
        </div>
    );
}

export default HomePage;