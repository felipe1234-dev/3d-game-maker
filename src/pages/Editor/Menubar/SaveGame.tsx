import { Button } from "@mui/material";
import { SaveEdit } from "@styled-icons/fluentui-system-regular";
import { useNavigate } from "react-router-dom";

import { t, getLang } from "@local/i18n";
import {
    useMetadata,
    useEditor,
    useLoader,
    useAlert
} from "@local/contexts";
import { games } from "@local/api";
import { Game as GameMetadata } from "@local/api/models";
import { isAlert } from "@local/functions";

function SaveGame() {
    const { metadata, updateMetadata } = useMetadata();
    const { setSeverity, setMessage } = useAlert();
    const { editor } = useEditor();
    const navigate = useNavigate();
    const lang = getLang();
    const loader = useLoader();

    const saveGame = async () => {
        if (!editor) return;
        if (!metadata) return;

        loader.show();

        try {
            const [format, imageFile] = await editor.saveGame();
            const gameUid = metadata.uid;
            if (!gameUid) return;

            const gameExists = !!(await games.byUid(gameUid));
            let newMetadata: GameMetadata;

            if (gameExists) {
                newMetadata = await games.update(format.uuid, {
                    imageFile,
                    metadata,
                    format
                });
            } else {
                newMetadata = await games.create({
                    imageFile,
                    metadata,
                    format
                });
                
                navigate(`/${lang}/editor/${newMetadata.uid}`, {
                    state: { useLoader: true }
                });
            }

            updateMetadata(newMetadata);
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
    };

    return (
        <Button
            startIcon={<SaveEdit width={15} />}
            onClick={saveGame}
        >
            {t("Save")}
        </Button>
    );
}

export default SaveGame;