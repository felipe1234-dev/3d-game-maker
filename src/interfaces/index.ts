import { Location } from "react-router-dom";
import { 
    Severity, 
    WhereClasule, 
    OrderByClasule 
} from "@local/types";

export interface Alert { 
    severity: Severity,
    message: string
}

export interface RouteState { 
    from?: Location, 
    background?: Location, 
    useLoader?: boolean
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