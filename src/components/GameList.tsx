import { useState, useEffect } from "react";
import {
    Avatar,
    Card,
    CardActions,
    CardContent,
    CardMedia,
    Grid,
    GridProps,
    Typography
} from "@mui/material";

import { stringToAvatar } from "@local/functions";
import { Filter } from "@local/interfaces";
import { games, users } from "@local/api";

import GameModel from "@local/api/models/Game.model";
import UserModel from "@local/api/models/User.model";

import "@local/styles/components/GameList.scss";

interface Game extends GameModel {
    creator?: UserModel;
}

interface GameListProps extends GridProps, Filter {
    handleClick?: (evt: React.MouseEvent, game: Game) => void;
}

function GameList(props: GameListProps) {
    const {
        where = [],
        orderBy = [],
        startAfter,
        limit,
        handleClick = () => { },
        className = "",
        ...rest
    } = props;

    const [gameList, setGameList] = useState<Game[]>([]);

    useEffect(() => {
        (async () => {
            const results = await games.list({ where, orderBy, startAfter, limit });

            const list: Game[] = [];

            for (const resp of results) {
                const item: Game = resp;

                item.creator = await users.byUid(resp.createdBy);

                list.push(item);
            }

            setGameList([...list]);
        })();
    }, []);

    return (
        <Grid
            container
            spacing={2}
            {...rest}
            className={`GameList ${className}`.trim()}
        >
            {gameList.map(game => {
                const creator = game.creator;
                const fullName = `${creator?.firstName || ""} ${creator?.lastName || ""}`.trim();
                const avatarOptions = stringToAvatar(fullName);
                const { shortName } = avatarOptions;

                return (
                    <Grid key={game.uid} item xs={12} sm={6} md={4}>
                        <Card onClick={(evt) => handleClick(evt, game)}>
                            <CardMedia
                                component="img"
                                image={game.image}
                                alt={game.name}
                            />
                            <CardContent>
                                <Typography
                                    variant="h5"
                                    component="h5"
                                >
                                    {game.name}
                                </Typography>

                                <Typography
                                    variant="subtitle1"
                                    component="p"
                                >
                                    {game.description}
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

export default GameList;
export type { GameListProps };