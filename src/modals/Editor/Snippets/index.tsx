import { t } from "@local/i18n";
import { Modal } from "@local/components";
import Body from "./Body";
import "@local/styles/modals/Snippets.scss";

function SnippetsModal() {
    return (
        <Modal
            draggable
            disableClose
            className="SnippetsModal"
            placement="center"
            header={t("Snippets")}
            body={<Body />}
            footer={t("Choose a snippet to create your game")}
            width={800}
            height={500}
        />
    );
}

export default SnippetsModal;