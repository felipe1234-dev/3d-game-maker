import { useContext } from "react";
import { Modal } from "@local/components";
import { GameContext } from "@local/contexts";
import { t } from "@local/i18n";
import Body from "./Body";

function EditSceneModal() {
    const game = useContext(GameContext);
    const sceneName = game?.currentScene?.name || "";
    const sceneUuid = game?.currentScene?.uuid || "";

    return (
        <Modal
            placement="center"
            height={500}
            width={300}
            draggable

            header={`${t("Scene")}: ${sceneName || sceneUuid}`}
            body={<Body />}
        />
    );
}

export default EditSceneModal;