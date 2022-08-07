import React from "react";
import { Box, Typography } from "@mui/material";
import { ReactComponent as Logo } from "@local/images/logo.svg";
import { useLocation } from "react-router-dom";
import { isRouteState } from "@local/functions";

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

	const { state, pathname: pathNow } = useLocation();
	let from = "/";

	if (isRouteState(state) && "from" in state) {
		if (state.from!.pathname !== pathNow) {
			from = state.from!.pathname;
		}
	}

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
					Where games come true
				</Typography>
				{tab === LOGIN && (
					<>
						<Login redirect={from} />
						<Box component="footer" className="AuthPage-container-footer">
							<span onClick={() => setTab(1)}>
								Create an account?
							</span>
							&#8226;
							<span onClick={() => setTab(2)}>
								Recover password
							</span>
						</Box>
					</>
				)}
				{tab === REGISTER && (
					<>
						<Register redirect={from} />
						<Box component="footer" className="AuthPage-container-footer">
							<span onClick={() => setTab(0)}>
								Have an account?
							</span>
							&#8226;
							<span onClick={() => setTab(2)}>
								Recover password
							</span>
						</Box>
					</>
				)}
				{tab === RECOVER && (
					<>
						<RecoverPassword />
						<Box component="footer" className="AuthPage-container-footer">
							<span onClick={() => setTab(0)}>
								Have an account?
							</span>
							&#8226;
							<span onClick={() => setTab(1)}>
								Create an account?
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