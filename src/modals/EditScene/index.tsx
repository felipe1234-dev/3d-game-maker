import React from "react";
import { Modal } from "@local/components";
import { GameContext } from "@local/contexts";
import Form from "./Form";

function EditSceneModal() {
    const game = React.useContext(GameContext);

    return (
        <Modal
            placement="center"
            height={500}
            width={300}
            draggable

            header={`Scene ${game?.currentScene.name ?? ""}`}
            body={<Form />}
            
        />
    );
}

export default EditSceneModal;