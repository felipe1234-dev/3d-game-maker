import { Modal } from "@local/components";
import { t } from "@local/i18n";
import Body from "./Body";
import "@local/styles/modals/SceneTree.scss";

function EditSceneTreeModal() {
    return (
        <Modal
            className="SceneTreeModal"
            placement="center"
            height={500}
            width={500}
            header={t("Scene tree")}
            body={<Body />}
            draggable
        />
    );
}

export default EditSceneTreeModal;