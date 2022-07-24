import React from "react";
import { Modal } from "@local/components";
import { EditorContext } from "@local/contexts";
import Form from "./Form";

function EditSceneModal() {
    const editor = React.useContext(EditorContext);
    const game = editor ? editor.game : null;

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