import { Location } from "react-router-dom";
import {
    Severity,
    WhereClasule,
    OrderByClasule
} from "@local/types";
import { Game } from "@local/api/models";

export interface Alert {
    severity: Severity;
    message: string;
}

export interface RouteState {
    from?: Location;
    background?: Location;
    useLoader?: boolean;
    game?: Game;
}

export interface Filter {
    where?: WhereClasule[];
    orderBy?: OrderByClasule[];
    startAfter?: string;
    limit?: number;
}

export interface RouteInfo {
    pageTitle?: string;
    path: string;
    Element: () => JSX.Element;
    wrappers: Function[];
    providers: Function[];
}