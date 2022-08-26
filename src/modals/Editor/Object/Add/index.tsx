import { Modal } from "@local/components";
import { t } from "@local/i18n";
import Body from "./Body";
import "@local/styles/modals/AddObject.scss";

function AddObjectModal() {
    return (
        <Modal
            className="AddObjectModal"
            placement="top-left"
            header={t("Add object")}
            body={<Body />}
            height={345}
            width={300}
            draggable
        />
    );
}

export default AddObjectModal;