import React from "react";
import { Box, Typography } from "@mui/material";
import { ReactComponent as Logo } from "@local/images/logo.svg";
import { useLocation } from "react-router-dom";
import { isRouteState } from "@local/functions";

import Login from "./Login";
import Register from "./Register";

import "@local/styles/pages/AuthPage.scss";

function AuthPage() {
	const [tab, setTab] = React.useState<number>(0);
	
    const { state, pathname: pathNow } = useLocation();
    let from = "/";
    
    if (isRouteState(state) && "from" in state) {
        if (state.from!.pathname !== pathNow) {
            from = state.from!.pathname;
        }
    }

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
				{tab === 0 && (
					<>
						<Login redirect={from} />
						<Box component="footer" className="AuthPage-container-footer">
							<span onClick={() => setTab(1)}>
								Create an account?
							</span>
							&#8226;
							<span>Recover password </span>
						</Box>
					</>
				)}
				{tab === 1 && (
					<>
						<Register redirect={from} />
						<Box component="footer" className="AuthPage-container-footer">
							<span onClick={() => setTab(0)}>
								Have an account?
							</span>
							&#8226;
							<span>Recover password </span>
						</Box>
					</>
				)}
			</div>
		</div>
	);
}

export default AuthPage;