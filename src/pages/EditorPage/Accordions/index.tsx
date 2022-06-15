import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Box,
    Typography
} from "@mui/material";
import { ExpandMore as ExpandMoreIcon } from "@mui/icons-material";

function Accordions() {
    return (
        <Box className="Editor-accordions" component="aside">
            <Accordion>
                <AccordionSummary
                    id="panel1a-header"
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                >
                    <Typography>Settings</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                        malesuada lacus ex, sit amet blandit leo lobortis eget.
                    </Typography>
                </AccordionDetails>
            </Accordion>
        </Box>
    );
}

export default Accordions;