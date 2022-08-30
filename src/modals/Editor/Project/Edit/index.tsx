import { Modal } from "@local/components";
import { t } from "@local/i18n";

import Body from "./Body";

function EditProjectModal() {
    return (
        <Modal
            placement="center"
            height={300}
            width={300}
            header={t("Project")}
            body={<Body />}
            draggable
        />
    );
}

export default EditProjectModal;