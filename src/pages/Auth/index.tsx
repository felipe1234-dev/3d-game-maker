import { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import { ReactComponent as Logo } from "@local/images/logo.svg";
import { useLocation } from "react-router-dom";
import { t, getLang } from "@local/i18n";

import Login from "./Login";
import RecoverPassword from "./RecoverPassword";
import Register from "./Register";
import VerifyEmail from "./VerifyEmail";

import "@local/styles/pages/AuthPage.scss";

const VERIFY = 3;
const RECOVER = 2;
const REGISTER = 1;
const LOGIN = 0;

function AuthPage() {
    const [tab, setTab] = useState(LOGIN);
    const { pathname: pathNow } = useLocation();

    const lang = getLang();
    const redirect = `/${lang}/home`;

    useEffect(() => {
        const params = new URLSearchParams(
            "?" + window.location.href.replace(/^[^\?]+\/\?/g, "")
        );
        const verify = params.get("verify") === "true";

        setTab(verify ? VERIFY : LOGIN);
    }, [pathNow]);

    return (
        <div className="AuthPage">
            <div className="AuthPage-container">
                <Logo className="AuthPage-container-logo" />
                <Typography
                    component="h1"
                    variant="h5"
                    className="AuthPage-container-catchline"
                >
                    {t("Where games come true")}
                </Typography>
                {tab === LOGIN && (
                    <>
                        <Login redirect={redirect} />
                        <Box
                            component="footer"
                            className="AuthPage-container-footer"
                        >
                            <span onClick={() => setTab(REGISTER)}>
                                {t("Create an account")}
                            </span>
                            &#8226;
                            <span onClick={() => setTab(RECOVER)}>
                                {t("Recover password")}
                            </span>
                        </Box>
                    </>
                )}
                {tab === REGISTER && (
                    <>
                        <Register redirect={redirect} />
                        <Box
                            component="footer"
                            className="AuthPage-container-footer"
                        >
                            <span onClick={() => setTab(LOGIN)}>
                                {t("Already have an account?")}
                            </span>
                            &#8226;
                            <span onClick={() => setTab(RECOVER)}>
                                {t("Recover password")}
                            </span>
                        </Box>
                    </>
                )}
                {tab === RECOVER && (
                    <>
                        <RecoverPassword />
                        <Box
                            component="footer"
                            className="AuthPage-container-footer"
                        >
                            <span onClick={() => setTab(LOGIN)}>
                                {t("Already have an account?")}
                            </span>
                            &#8226;
                            <span onClick={() => setTab(REGISTER)}>
                                {t("Create an account")}
                            </span>
                        </Box>
                    </>
                )}
                {tab === VERIFY && <VerifyEmail />}
            </div>
        </div>
    );
}

export default AuthPage;