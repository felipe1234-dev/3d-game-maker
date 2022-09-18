import { Button } from "@mui/material";
import { Ren as RendererIcon } from "@styled-icons/crypto";
import { useLocation, Link } from "react-router-dom";
import { t } from "@local/i18n";

function Renderer() {
    const location = useLocation();

    return (
        <Button
            component={Link}
            startIcon={<RendererIcon width={15} />}
            to="renderer/edit"
            state={{
                background: location,
                useLoader: false,
            }}
        >
            {t("Renderer")}
        </Button>
    );
}

export default Renderer;