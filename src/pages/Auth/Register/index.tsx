import React from "react";
import { 
    Box, 
    InputAdornment, 
    TextField,
    IconButton
} from "@mui/material";
import { TextFieldProps } from "@mui/material";
import { LoadingButton as Button } from "@mui/lab";
import {
    MailOutline as MailOutlineIcon, 
    Visibility as VisibilityOnIcon,
    VisibilityOff as VisibilityOffIcon
} from "@mui/icons-material";
import { AlertContext } from "@local/contexts";
import { useNavigate } from "react-router-dom";
import * as auth from "@local/api/auth";
import { Alert } from "@local/interfaces";

interface RegisterProps {
    redirect: string
}

function Register(props: RegisterProps) {
    const [formIsLoading, setFormIsLoading] = React.useState<boolean>(false);
    const [submitIsDisabled, setSubmitIsDisabled] = React.useState<boolean>(false);
    const [passIsMasked, setPassIsMasked] = React.useState<boolean>(true);

	const navigate  = useNavigate();
    const { setSeverity, setMessage } = React.useContext(AlertContext);

    const baseTextField: TextFieldProps = {
        className: "AuthPage-container-input",
        margin: "normal",
        fullWidth: false,
        required: true,
        variant: "standard"
    }

    const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault(); 
        // Prevents page from being redirected
        
        if (submitIsDisabled) {
            return;
        }
        
        setFormIsLoading(true);
        
        const data = new FormData(event.currentTarget);
        const firstName = data.get("fName")?.toString() || "";
        const lastName = data.get("lName")?.toString() || "";
        const email = data.get("email")?.toString() || "";
        const password = data.get("password")?.toString() || "";
        const confirmPassword = data.get("confirmPassword")?.toString() || "";

        try {
            if (password !== confirmPassword) {
                throw {
                    severity: "error",
                    message: '"Password" and "Confirm password" do not match'
                };
            }

            await auth.register({
                firstName,
                lastName,
                email, 
                password
            });

            setSeverity("success");
            setMessage("Logged in successfully");
            setTimeout(() => navigate(props.redirect, { replace: true }), 3000);
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

        setSubmitIsDisabled(
            !data.get("email") || !data.get("password") ||
            !data.get("confirmPassword") || 
            !data.get("fName") || !data.get("lName")
        );
    }

    return (
        <Box 
            component="form"
            className="AuthPage-container-form"
            onSubmit={onSubmit}
            onChange={onChange}
        >
            <Box className="AuthPage-container-row">
                <TextField 
                    {...baseTextField} 
                    name="fName"
                    label="First name"
                    type="text"
                />
                <TextField 
                    {...baseTextField}
                    name="lName"
                    label="Last name"
                    type="text" 
                />
            </Box>
            <TextField 
                {...baseTextField}
                name="email"
                label="Email"
                type="email"
                InputProps={{
                    endAdornment: (
                        <InputAdornment style={{ padding: "12px" }} position="end">
                            <MailOutlineIcon />
                        </InputAdornment>
                    )
                }}
            />
            <Box className="AuthPage-container-row">
                <TextField 
                    {...baseTextField} 
                    name="password"
                    label="Password"
                    type={passIsMasked ? "password" : "text"}
                    InputProps={{
                        autoComplete: "new-password",
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton onClick={() => setPassIsMasked(prevState => !prevState)}>
                                    {passIsMasked ? <VisibilityOffIcon /> : <VisibilityOnIcon />}
                                </IconButton>
                            </InputAdornment>
                        )
                    }}
                />
                <TextField 
                    {...baseTextField}
                    name="confirmPassword"
                    label="Confirm password"
                    type={passIsMasked ? "password" : "text"}
                />
            </Box>
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
                Register
            </Button>
        </Box>
    );
}

export default Register;