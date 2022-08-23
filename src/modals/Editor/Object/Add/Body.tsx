import { Grid } from "@mui/material";
import { Flashlight } from "@styled-icons/fluentui-system-filled";

function Body() {
    return (
        <Grid container spacing={2}>
            <Grid item xs={6}>
                <Flashlight width={100} />
            </Grid>
        </Grid>
    );
}

export default Body;