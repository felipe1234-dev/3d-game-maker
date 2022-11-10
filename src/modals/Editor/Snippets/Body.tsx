import { useState, useEffect } from "react";
import {
    Avatar,
    Grid,
    Card,
    CardContent,
    CardMedia,
    CardActions,
    Typography
} from "@mui/material";
import { useNavigate } from "react-router-dom";

import { games, users } from "@local/api";
import { Game, User } from "@local/api/models";
import { useAlert } from "@local/contexts";
import { isAlert, stringToAvatar } from "@local/functions";
import { getLang } from "@local/i18n";

interface Snippet extends Game {
    creator?: User;
}

function Body() {
    const [snippets, setSnippets] = useState<Snippet[]>([]);
    const alert = useAlert();
    const navigate = useNavigate();

    useEffect(() => {
        (async () => {
            try {
                const results = await games.list({
                    where: [
                        ["snippet", "==", true]
                    ],
                    orderBy: [
                        ["createdAt", "desc"]
                    ]
                });

                const list: Snippet[] = [];

                for (const resp of results) {
                    const item: Snippet = resp;

                    item.creator = await users.byUid(resp.createdBy);

                    list.push(item);
                }

                setSnippets(list);
            } catch (err) {
                if (isAlert(err)) {
                    alert.setSeverity(err.severity);
                    alert.setMessage(err.message);
                } else {
                    console.error(err);
                }
            }
        })();
    }, []);

    const lang = getLang();

    const createGameFromSnippet = (snippet: Snippet) => {
        navigate(`/${lang}/editor/${snippet.uid}`, {
            state: {
                useLoader: true,
            }
        });
    };

    return (
        <Grid container spacing={2}>
            {snippets.map(snippet => {
                const creator = snippet.creator;
                const fullName = `${creator?.firstName || ""} ${creator?.lastName || ""}`.trim();
                const avatarOptions = stringToAvatar(fullName);
                const { shortName } = avatarOptions;

                return (
                    <Grid key={snippet.uid} item xs={12} sm={6} md={4}>
                        <Card onClick={() => createGameFromSnippet(snippet)}>
                            <CardMedia
                                component="img"
                                image={snippet.image}
                                alt={snippet.name}
                            />
                            <CardContent>
                                <Typography
                                    variant="h5"
                                    component="h5"
                                >
                                    {snippet.name}
                                </Typography>

                                <Typography
                                    variant="subtitle1"
                                    component="p"
                                >
                                    {snippet.description}
                                </Typography>
                            </CardContent>
                            {creator && (
                                <CardActions disableSpacing>
                                    <Avatar
                                        alt={fullName}
                                        src={creator.photo}
                                    >
                                        {shortName}
                                    </Avatar>
                                    <span>{fullName}</span>
                                </CardActions>
                            )}
                        </Card>
                    </Grid>
                );
            })}
        </Grid>
    );
}

export default Body;