import { TextField } from "@mui/material";

import { useMetadata } from "@local/contexts";
import { useForceUpdate } from "@local/hooks";
import { t } from "@local/i18n";

function Body() {
    const { metadata, updateMetadata } = useMetadata();
    const { forceUpdate } = useForceUpdate();

    const onChangeName = (name: string) => {
        updateMetadata({ name });
        forceUpdate();
    };

    const onChangeDescription = (description: string) => {
        updateMetadata({ description });
        forceUpdate();
    };

    return (
        <>
            <TextField
                label={t("Name")}
                variant="outlined"
                onChange={evt => onChangeName(evt.target.value)}
                value={metadata?.name || ""}
                sx={{ mb: 2 }}
            />
            <TextField
                multiline
                label={t("Description")}
                variant="outlined"
                onChange={evt => onChangeDescription(evt.target.value)}
                value={metadata?.description || ""}
                minRows={4}
            />
        </>
    );
}

export default Body;