import { useEffect } from "react";

import { Game } from "@local/classes";
import { Modal } from "@local/components";
import { useUnmount } from "@local/hooks";
import { useEditor } from "@local/contexts";
import { t } from "@local/i18n";

import Body from "./Body";

function EditVerticesModal() {
    const editor = useEditor();

    useEffect(() => {
        const { object } = editor.transformControls || {};
        if (!object || !(object instanceof Game.Mesh)) return;
        editor.vertexHelper.select(object);
    }, []);

    useUnmount(() => {
        editor.vertexHelper.unselect();
    });

    return (
        <Modal
            placement="center-left"
            header={t("Vertex editor")}
            body={<Body />}
            height={500}
            width={350}
            disableBackdrop
            draggable
        />
    );
}

export default EditVerticesModal;