import { useState, useEffect } from "react";
import { Button } from "@mui/material";
import { Games } from "@styled-icons/fluentui-system-regular";
import { Link } from "react-router-dom";

import { games } from "@local/api";
import { Helper } from "@local/components";
import { useMetadata } from "@local/contexts";
import { t, getLang } from "@local/i18n";

function TestGame() {
    const [disabled, setDisabled] = useState(false);
    const { metadata } = useMetadata();

    useEffect(() => {
        (async () => {
            const gameUid = metadata.uid;
            if (!gameUid) {
                setDisabled(true);
                return;
            }

            const gameWasSaved = !!(await games.byUid(gameUid));
            setDisabled(!gameWasSaved);
        })();
    }, [metadata]);

    const lang = getLang();
    const helpText = disabled ? t("You need to save your game before testing") : undefined;

    return (
        <Helper text={helpText} placement="bottom" arrow>
            <span>
                <Button
                    component={Link}
                    to={`/${lang}/test/${metadata.uid}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    state={{
                        useLoader: true,
                    }}

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