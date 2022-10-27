import { ChangeEvent, FormEvent, useState } from "react";
import { Box, TextField, InputAdornment, IconButton } from "@mui/material";
import { LoadingButton as Button } from "@mui/lab";
import { TextFieldProps } from "@mui/material";
import {
    MailOutline as MailOutlineIcon,
    Visibility as VisibilityOnIcon,
    VisibilityOff as VisibilityOffIcon,
} from "@mui/icons-material";
import { useNavigate } from "react-router";

import { auth } from "@local/api";
import { useAlert } from "@local/contexts";
import { Alert } from "@local/interfaces";
import { t } from "@local/i18n";

interface LoginProps {
    redirect: string;
}

function Login(props: LoginProps) {
    const [formIsLoading, setFormIsLoading] = useState<boolean>(false);
    const [submitIsDisabled, setSubmitIsDisabled] = useState<boolean>(false);
    const [passIsMasked, setPassIsMasked] = useState<boolean>(true);

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
        const password = data.get("password")?.toString() || "";

        try {
            await auth.logIn(email, password);

            alert.setSeverity("success");
            alert.setMessage(t("Logged in successfully"));
            setTimeout(() => navigate(props.redirect, { replace: true }), 3000);
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

        setSubmitIsDisabled(!data.get("email") || !data.get("password"));
    };

    const baseTextField: TextFieldProps = {
        className: "AuthPage-container-input",
        margin: "normal",
        fullWidth: true,
        required: true,
        variant: "standard",
    };

    return (
        <Box
            component="form"
            className="AuthPage-container-form"
            onSubmit={onSubmit}
            onChange={onChange}
        >
            <TextField
                {...baseTextField}
                name="email"
                label={t("Email")}
                type="email"
                InputProps={{
                    endAdornment: (
                        <InputAdornment
                            style={{ padding: "12px" }}
                            position="end"
                        >
                            <MailOutlineIcon />
                        </InputAdornment>
                    ),
                }}
            />
            <TextField
                {...baseTextField}
                name="password"
                label={t("Password")}
                type={passIsMasked ? "password" : "text"}
                InputProps={{
                    autoComplete: "new-password",
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton
                                onClick={() =>
                                    setPassIsMasked(prevState => !prevState)
                                }
                            >
                                {passIsMasked ? (
                                    <VisibilityOffIcon />
                                ) : (
                                    <VisibilityOnIcon />
                                )}
                            </IconButton>
                        </InputAdornment>
                    ),
                }}
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
                {t("Login")}
            </Button>
        </Box>
    );
}

export default Login;