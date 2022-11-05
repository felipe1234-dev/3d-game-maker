import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { auth, games } from "@local/api";
import { Game } from "@local/api/models";
import { useAlert } from "@local/contexts";
import { getLang } from "@local/i18n";
import { Alert } from "@local/interfaces";

function GameList() {
    const [gameList, setGameList] = useState<Game[]>([]);
    const alert = useAlert();

    useEffect(() => {
        (async () => {
            try {
                const user = await auth.currentUser();
                if (!user) return;

                const list = await games.list({
                    where: [
                        ["createdBy", "==", user.uid]
                    ]
                });

                setGameList([...list]);
            } catch (err) {
                const error = err as Alert;
                alert.setSeverity(error.severity);
                alert.setMessage(error.message);
            }
        })();
    }, []);

    const lang = getLang();

    return (
        <>
            {gameList.map(game => (
                <Link
                    key={game.uid}
                    to={`/${lang}/editor/${game.uid}`}
                    state={{ useLoader: true }}
                >
                    {game.name} - {game.description}
                </Link>
            ))}
        </>
    );
}

export default GameList;