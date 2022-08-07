import React from "react";
import { Box, TextField } from "@mui/material";
import { LoadingButton as Button } from "@mui/lab";
import * as auth from "@local/api/auth";
import { AlertContext } from "@local/contexts";
import { Alert } from "@local/interfaces";
import { useNavigate } from "react-router-dom";

function RecoverPassword() {
    const [formIsLoading, setFormIsLoading] = React.useState<boolean>(false);
    const [submitIsDisabled, setSubmitIsDisabled] = React.useState<boolean>(false);

    const navigate  = useNavigate();
    const { setSeverity, setMessage } = React.useContext(AlertContext);

    const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault(); 
        // Prevents page from being redirected
        
        if (submitIsDisabled) {
            return;
        }
        
        setFormIsLoading(true);
        
        const data  = new FormData(event.currentTarget);
        const email = data.get("email")?.toString() || "";

        try {
            await auth.recoverPassword(email);

            setSeverity("success");
            setMessage("Password reset email sent successfully");
            setTimeout(() => navigate("/auth", { replace: true }), 3000);
        } catch (error) {
            const err = error as Alert;

            setSeverity(err.severity);
            setMessage(err.message);
        } finally {
            setTimeout(() => setFormIsLoading(false), 3000);
        }
    } 
    
    const onChange = (event: React.ChangeEvent<HTMLFormElement>) => {
        const data = new FormData(event.currentTarget);

        setSubmitIsDisabled(!data.get("email"));
    }

    return (
        <Box
            component="form"
            onSubmit={onSubmit}
            onChange={onChange}
        >
            <TextField
                className="AuthPage-container-input"
                margin="normal"
                variant="standard"
                type="email"
                label="Email"
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
                Send password reset email 
            </Button>
        </Box>
    );
}

export default RecoverPassword;