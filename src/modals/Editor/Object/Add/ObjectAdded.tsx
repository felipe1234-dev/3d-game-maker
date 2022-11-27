import { Button } from "@mui/material";
import { Modal } from "@local/components";
import { t } from "@local/i18n";

interface ObjectAddedProps {
    onHide: () => void;
}

function ObjectAdded(props: ObjectAddedProps) {
    return (
        <Modal
            placement="center"
            height={130}
            header={t("Object added")}
            footer={(
                <Button onClick={props.onHide}>
                    {t("Ok")}
                </Button>
            )}
        />
    );
}

export default ObjectAdded;