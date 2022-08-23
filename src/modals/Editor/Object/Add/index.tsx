import { Modal } from "@local/components";
import { t } from "@local/i18n";
import Body from "./Body";

function AddObjectModal() {
    return (
        <Modal
            placement="bottom-left"
            header={t("Add object")}
            body={<Body />}
            height={500}
            width={400}
            draggable
        />
    );
}

export default AddObjectModal;