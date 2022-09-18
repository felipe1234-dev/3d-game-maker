import {
    FormGroup,
    FormControlLabel,
    Checkbox,
    TextField,
    MenuItem,
    Divider,
} from "@mui/material";
import { t } from "@local/i18n";
import shadowTypes from "@local/consts/editor/types/shadow";
import toneMappingTypes from "@local/consts/editor/types/toneMapping";

function Body() {
    return (
        <>
            <FormGroup>
                <FormControlLabel
                    label={t("Physically correct lights")}
                    control={<Checkbox />}
                />
            </FormGroup>
            <FormGroup>
                <FormControlLabel
                    label={t("Enable shadows")}
                    control={<Checkbox />}
                />
            </FormGroup>
            <Divider />
            <TextField select label={t("Shadow map type")}>
                {shadowTypes.map(shadow => (
                    <MenuItem key={shadow} value={shadow}>
                        {t(shadow)}
                    </MenuItem>
                ))}
            </TextField>
            <Divider />
            <TextField
                label={t("Tone mapping exposure")}
                inputProps={{
                    type: "number",
                    step: 0.1,
                    min: 0,
                    max: 1,
                }}
            />
            <Divider />
            <TextField select label={t("Tone mapping type")}>
                {toneMappingTypes.map(shadow => (
                    <MenuItem key={shadow} value={shadow}>
                        {t(shadow)}
                    </MenuItem>
                ))}
            </TextField>
        </>
    );
}

export default Body;