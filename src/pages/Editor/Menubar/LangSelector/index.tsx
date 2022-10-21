import React, { useState } from "react";
import {
    Button,
    Menu,
    MenuItem,
    Fade,
    ListItemIcon
} from "@mui/material";
import { Language } from "@styled-icons/ionicons-outline";
import { CheckCircle } from "@styled-icons/feather";
import { useNavigate } from "react-router-dom";
import { langs, getLang } from "@local/i18n";

const labelLang = (lang: string) => lang.replace("_", " ").replace(/\s(\w+)$/, " ($1)");

function LangSelector() {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const navigate = useNavigate();

    const label = "Language";
    const buttonId = label.toLowerCase() + "-button";
    const menuId = label.toLowerCase() + "-menu";

    const currentLang = getLang();

    const onOpen = (evt: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(evt.currentTarget);
    };

    const onClose = () => {
        setAnchorEl(null);
    };

    const changeLang = (lang: string) => {
        navigate(`/${lang}/editor`, {
            state: {
                useLoader: false
            }
        });
    };

    return (
        <>
            <Button
                id={buttonId}
                aria-controls={open ? menuId : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}

                startIcon={<Language width={20} />}
                onClick={onOpen}
            >
                {labelLang(currentLang)}
            </Button>
            <Menu
                id={menuId}
                MenuListProps={{ "aria-labelledby": buttonId }}
                anchorEl={anchorEl}
                open={open}
                onClose={onClose}
                TransitionComponent={Fade}
            >
                {Object.keys(langs).map((lang, i) => (
                    <MenuItem key={i} onClick={() => changeLang(lang)}>
                        <ListItemIcon>
                            {currentLang === lang && <CheckCircle width={20} />}
                        </ListItemIcon>
                        {labelLang(lang)}
                    </MenuItem>
                ))}
            </Menu>
        </>
    );
}

export default LangSelector;