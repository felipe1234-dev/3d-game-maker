import { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import { LoadingButton as Button } from "@mui/lab";
import {
    VerifiedUser as VerifiedUserIcon,
    Error as ErrorIcon,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { UserCredential } from "firebase/auth";
import { FirebaseError } from "firebase/app";

import { auth, users } from "@local/api";
import { useAlert } from "@local/contexts";
import { Alert } from "@local/interfaces";
import { toAlert } from "@local/api/functions";
import { t } from "@local/i18n";

function VerifyEmail() {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [userCredential, setUserCredential] = useState<UserCredential>();
    const [state, setState] = useState<string>("processing");

    const alert = useAlert();
    const navigate = useNavigate();

    useEffect(() => {
        const params = new URLSearchParams(
            "?" + window.location.href.replace(/^[^\?]+\/\?/g, "")
        );
        const email = params.get("email");
        const password = params.get("password");

        if (email && password) {
            setTimeout(async () => {
                try {
                    const credential = await auth.logIn(email, password);
                    setUserCredential(credential);

                    if (credential.user.emailVerified) {
                        await users.update(credential.user.uid, {
                            emailVerified: true,
                        });

                        alert.setSeverity("success");
                        alert.setMessage(t("Email verified"));

                        setState("verified");

                        setTimeout(
                            () => navigate("/", { replace: true }),
                            3000
                        );
                    } else {
                        await auth.logOut();

                        setState("not-verified");

                        alert.setSeverity("info");
                        alert.setMessage(
                            t(
                                "Your email is not verified. Try resending a verification email or checking your spam box."
                            )
                        );
                    }
                } catch (error) {
                    const err = error as Alert;

                    setState("error");

                    alert.setSeverity(err.severity);
                    alert.setMessage(err.message);
                }
            }, 3000);
        } else {
            alert.setSeverity("error");
            alert.setMessage(t("You're not authorized to access this page."));

            setState("error");

            setTimeout(() => navigate("/auth", { replace: true }), 3000);
        }
    }, []);

    const resend = async () => {
        if (!userCredential) {
            return;
        }

        const params = new URLSearchParams(
            "?" + window.location.href.replace(/^[^\?]+\/\?/g, "")
        );
        const email = params.get("email");
        const password = params.get("password");

        if (!email || !password) {
            return;
        }

        setIsLoading(true);

        try {
            await auth.sendConfirmationEmail(userCredential, email, password);

            alert.setSeverity("success");
            alert.setMessage(
                t("Email verification sent successfully. Check your spam box.")
            );

            setTimeout(() => navigate("/auth"), 3000);
        } catch (error) {
            const err = toAlert(error as FirebaseError);
            alert.setSeverity(err.severity);
            alert.setMessage(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    return state === "processing" ? (
        <Typography component="h2" variant="h6">
            {t("Processing...")}
        </Typography>
    ) : state === "error" ? (
        <Typography component="h2" variant="h6">
            {t("An error occurred")} <ErrorIcon color="error" />
        </Typography>
    ) : state === "verified" ? (
        <Typography component="h2" variant="h6">
            {t("Email verified")} <VerifiedUserIcon color="success" />
        </Typography>
    ) : state === "not-verified" ? (
        <div className="AuthPage-container-verify">
            <Typography component="h2" variant="h6">
                {t("Your email is not verified yet")}
            </Typography>
            <Button
                className="AuthPage-container-button"
                variant="contained"
                loading={isLoading}
                onClick={resend}
            >
                {t("Resend Email Verification")}
            </Button>
        </div>
    ) : (
        <></>
    );
}

export default VerifyEmail;