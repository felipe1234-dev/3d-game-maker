//import Heading from "./Heading";
//import Form from "./Form";
import { Typography } from "@mui/material";
import { ReactComponent as Logo } from "@local/images/logo.svg";

import Login from "./Login";


import "@local/styles/pages/AuthPage.scss";

function AuthPage() {
	return (
		<div className="AuthPage">
			<div className="AuthPage-container">
                <Logo className="AuthPage-container-logo" />
				<Typography component="h1" variant="h5">
					Where games come true
				</Typography>
				<Login />
			</div>
		</div>
	);
}

export default AuthPage;