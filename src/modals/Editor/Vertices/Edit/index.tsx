import { Modal } from "@local/components";
import { t } from "@local/i18n";

function EditVerticesModal() {
    return (
        <Modal
            placement="center-left"
            header={t("Vertex editor")}
            height={500}
            width={400}
            draggable
        />
    );
}

export default EditVerticesModal;