import React from "react";
import { Box, Typography } from "@mui/material";
import { ReactComponent as Logo } from "@local/images/logo.svg";
import { useLocation } from "react-router-dom";
import { isRouteState } from "@local/functions";
import { I18nContext } from "@local/contexts";

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
	const [tab, setTab] = React.useState<number>(LOGIN);

	const { pathname: pathNow } = useLocation();

	const i18n = React.useContext(I18nContext);
	const lang = i18n.lang();
	const redirect = `/${lang}/home`;
	const scope = "pages.auth.index.";

	React.useEffect(() => {
		const params = new URLSearchParams("?" + window.location.href.replace(/^[^\?]+\/\?/g, ""));
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
					{i18n.get(scope + "catchline")}
				</Typography>
				{tab === LOGIN && (
					<>
						<Login redirect={redirect} />
						<Box component="footer" className="AuthPage-container-footer">
							<span onClick={() => setTab(REGISTER)}>
								{i18n.get(scope + "createAnAccount")}
							</span>
							&#8226;
							<span onClick={() => setTab(RECOVER)}>
								{i18n.get(scope + "recoverPassword")}
							</span>
						</Box>
					</>
				)}
				{tab === REGISTER && (
					<>
						<Register redirect={redirect} />
						<Box component="footer" className="AuthPage-container-footer">
							<span onClick={() => setTab(LOGIN)}>
								{i18n.get(scope + "haveAnAccount")}
							</span>
							&#8226;
							<span onClick={() => setTab(RECOVER)}>
								{i18n.get(scope + "recoverPassword")}
							</span>
						</Box>
					</>
				)}
				{tab === RECOVER && (
					<>
						<RecoverPassword />
						<Box component="footer" className="AuthPage-container-footer">
							<span onClick={() => setTab(LOGIN)}>
								{i18n.get(scope + "haveAnAccount")}
							</span>
							&#8226;
							<span onClick={() => setTab(REGISTER)}>
								{i18n.get(scope + "createAnAccount")}
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