import { useNavigate } from "react-router-dom";

import { getLang } from "@local/i18n";
import { GameList } from "@local/components";
import GameModel from "@local/api/models/Game.model";
import UserModel from "@local/api/models/User.model";

interface Snippet extends GameModel {
    creator?: UserModel;
}

function Body() {
    const navigate = useNavigate();
    const lang = getLang();

    const createGameFromSnippet = (evt: React.MouseEvent, snippet: Snippet) => {
        navigate(`/${lang}/editor/${snippet.uid}`, {
            state: {
                useLoader: true,
            }
        });
    };

    return (
        <GameList
            where={[
                ["snippet", "==", true]
            ]}
            orderBy={[
                ["createdAt", "desc"]
            ]}
            handleClick={createGameFromSnippet}
        />
    );
}

export default Body;