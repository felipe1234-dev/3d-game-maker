import { useState } from "react";
import { MenuItem, TextField } from "@mui/material";

import { MediaModal } from "@local/components";
import { t } from "@local/i18n";

import mappingTypes from "@local/consts/editor/types/mapping";

import "@local/styles/fields/MapField.scss";

function MapField() {
    const [open, setOpen] = useState(false);

    return (
        <div className="MapField">
            <TextField
                label="Test"
                onClick={() => setOpen(true)}
                InputProps={{
                    readOnly: true,
                    startAdornment: (
                        <img
                            src="https://via.placeholder.com/180x150/200"
                            alt="Caption this"
                        />
                    )
                }}
                disabled
            />

            <TextField
                select
                className="OptionsField"
                label="Mapping"
            //value={value}
            //onChange={evt => setValue(evt.target.value)}
            >
                {mappingTypes.map(mapping => (
                    <MenuItem key={mapping} value={mapping}>
                        {t(mapping)}
                    </MenuItem>
                ))}
            </TextField>

            {open && (
                <MediaModal
                    title="test"
                    onClose={() => setOpen(false)}
                    onFinish={console.log}
                    folders="textures/uv"
                />
            )}
        </div>
    );
}

export default MapField;