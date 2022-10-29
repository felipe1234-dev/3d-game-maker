import { Button } from "@mui/material";
import { useLocation } from "react-router-dom";
import { TestTube } from "@styled-icons/boxicons-regular";

import { t, getLang } from "@local/i18n";
import {
    useGame,
    useMetadata,
    useEditor,
    useLoader,
    useAlert
} from "@local/contexts";
import { auth, games } from "@local/api";
import { isAlert } from "@local/functions";

function SaveGame() {
    const location = useLocation();
    const game = useGame();
    const { metadata, updateMetadata } = useMetadata();
    const editor = useEditor();
    const loader = useLoader();
    const { setSeverity, setMessage } = useAlert();
    const lang = getLang();

    const saveGame = () => {
        editor.saveGame(async (format) => {
            loader.show();

            try {
                const user = await auth.currentUser();
                const gameExists = (
                    await games.list({
                        where: [
                            ["uid", "==", metadata.uid],
                            ["createdBy", "==", user?.uid]
                        ]
                    })
                ).length > 0;

                const newMetadata = gameExists
                    ? await games.update(format.uuid, metadata, format)
                    : await games.create(metadata, format);

                updateMetadata(newMetadata);

                loader.hide();

                setSeverity("success");
                setMessage(t("Game saved"));
            } catch (error) {
                if (isAlert(error)) {
                    setSeverity(error.severity);
                    setMessage(t(error.message));
                } else {
                    console.error(error);
                }
            } finally {
                loader.hide();
            }
        });
    };

    return (
        <Button
            startIcon={<TestTube width={15} />}
            onClick={saveGame}
        >
            {t("Save")}
        </Button>
    );
}

export default SaveGame;