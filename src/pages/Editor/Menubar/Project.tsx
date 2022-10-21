import { Button } from "@mui/material";
import { ProjectDiagram } from "@styled-icons/fa-solid";
import { Link, useLocation } from "react-router-dom";
import { t } from "@local/i18n";

function Project() {
    const location = useLocation();

    return (
        <Button
            component={Link}
            startIcon={<ProjectDiagram width={15} />}
            to="project/edit"
            state={{
                background: location,
                useLoader: false
            }}
        >
            {t("Project")}
        </Button>
    );
}

export default Project;