import { Modal } from "@local/components";
import { t } from "@local/i18n";
import Body from "./Body";

function EditRendererModal() {
    return (
        <Modal
            placement="center"
            height={300}
            width={300}
            header={t("Renderer")}
            body={<Body />}
            draggable
        />
    );
}

export default EditRendererModal;