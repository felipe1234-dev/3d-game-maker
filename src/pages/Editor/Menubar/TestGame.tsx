import { useState, useEffect } from "react";
import { Button } from "@mui/material";
import { Games } from "@styled-icons/fluentui-system-regular";
import { Link } from "react-router-dom";

import { games } from "@local/api";
import { Helper } from "@local/components";
import { useMetadata } from "@local/contexts";
import { t, getLang } from "@local/i18n";

function TestGame() {
    const { metadata } = useMetadata();
    const [gameExists, setGameExists] = useState(false);

    const lang = getLang();
    const gameUid = metadata?.uid || "";
    const disabled = !gameUid || !gameExists;
    const helpText = disabled ? t("You need to save your game before testing") : undefined;

    useEffect(() => {
        (async () => {
            const exists = !!(await games.byUid(gameUid));
            setGameExists(exists);
        })();
    }, [gameUid]);

    return (
        <Helper text={helpText} placement="bottom" arrow>
            <span>
                <Button
                    component={Link}
                    to={`/${lang}/test/${gameUid}`}
                    state={{ useLoader: true }}

                    target="_blank"
                    rel="noopener noreferrer"

                    startIcon={<Games width={15} />}
                    disabled={disabled}
                >
                    {t("Test")}
                </Button>
            </span>
        </Helper>
    );
}

export default TestGame;