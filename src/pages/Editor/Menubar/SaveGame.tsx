import { Button } from "@mui/material";
import { SaveEdit } from "@styled-icons/fluentui-system-regular";

import { t } from "@local/i18n";
import { useMetadata, useEditor, useLoader, useAlert } from "@local/contexts";
import { games } from "@local/api";
import { isAlert } from "@local/functions";

function SaveGame() {
    const { metadata, updateMetadata } = useMetadata();
    const { setSeverity, setMessage } = useAlert();

    const editor = useEditor();
    const loader = useLoader();

    const saveGame = () => {
        editor.saveGame(async (format) => {
            loader.show();

            try {
                const gameUid = metadata.uid;
                if (!gameUid) return;
                const gameExists = !!(await games.byUid(gameUid));

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
            startIcon={<SaveEdit width={15} />}
            onClick={saveGame}
        >
            {t("Save")}
        </Button>
    );
}

export default SaveGame;