import { ChangeEvent, FormEvent, useState } from "react";
import { TextField } from "@mui/material";
import { LoadingButton as Button } from "@mui/lab";
import { useNavigate } from "react-router-dom";

import { auth } from "@local/api";
import { useAlert } from "@local/contexts";
import { Alert } from "@local/interfaces";
import { t } from "@local/i18n";

function RecoverPassword() {
    const [formIsLoading, setFormIsLoading] = useState<boolean>(false);
    const [submitIsDisabled, setSubmitIsDisabled] = useState<boolean>(false);

    const alert = useAlert();
    const navigate = useNavigate();

    const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        // Prevents page from being redirected

        if (submitIsDisabled) {
            return;
        }

        setFormIsLoading(true);

        const data = new FormData(event.currentTarget);
        const email = data.get("email")?.toString() || "";

        try {
            await auth.recoverPassword(email);

            alert.setSeverity("success");
            alert.setMessage(t("Password reset email sent successfully"));
            setTimeout(() => navigate("/auth", { replace: true }), 3000);
        } catch (error) {
            const err = error as Alert;

            alert.setSeverity(err.severity);
            alert.setMessage(err.message);
        } finally {
            setTimeout(() => setFormIsLoading(false), 3000);
        }
    };

    const onChange = (event: ChangeEvent<HTMLFormElement>) => {
        const data = new FormData(event.currentTarget);

        setSubmitIsDisabled(!data.get("email"));
    };

    return (
        <form onSubmit={onSubmit} onChange={onChange}>
            <TextField
                className="AuthPage-container-input"
                margin="normal"
                variant="standard"
                type="email"
                label={t("Email")}
                name="email"
                fullWidth
                required
            />
            <Button
                className="AuthPage-container-button"
                variant="contained"
                type="submit"
                disabled={submitIsDisabled}
                loading={formIsLoading}
                fullWidth
                disableElevation
                sx={{ mt: 3, mb: 2 }}
            >
                {t("Send password reset email")}
            </Button>
        </form>
    );
}

export default RecoverPassword;