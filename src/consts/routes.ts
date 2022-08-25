import { 
    AuthPage, 
    HomePage, 
    EditorPage 
} from "@local/pages";
import { 
    AddObjectModal,
    EditObjectModal, 
    EditSceneModal,
    EditSceneTreeModal
} from "@local/modals";
import { 
    GameProvider, 
    EditorProvider 
} from "@local/contexts";
import { RouteInfo } from "@local/interfaces";
import { RequireAuth } from "@local/components";
import app from "./app";

const pageRoutes: RouteInfo[] = [
    {
        pageTitle: `Auth - ${app.name}`,
        path: "/auth",
        Element: AuthPage,
        wrappers: [],
        providers: []
    },
    {
        pageTitle: `Home - ${app.name}`,
        path: "/home",
        Element: HomePage,
        wrappers: [
            RequireAuth
        ],
        providers: []
    },
    {
        pageTitle: `Editor - ${app.name}`,
        path: "/editor",
        Element: EditorPage,
        wrappers: [
            RequireAuth,
        ],
        providers: [
            GameProvider,
            EditorProvider
        ]
    },

];

const modalRoutes: RouteInfo[] = [
    {
        path: "/editor/object/edit",
        Element: EditObjectModal,
        wrappers: [
            RequireAuth,
        ],
        providers: []
    },
    {
        path: "/editor/object/add",
        Element: AddObjectModal,
        wrappers: [
            RequireAuth,
        ],
        providers: []
    },
    {
        path: "/editor/scene/edit",
        Element: EditSceneModal,
        wrappers: [
            RequireAuth,
        ],
        providers: []
    },
    {
        path: "/editor/scene-tree/edit",
        Element: EditSceneTreeModal,
        wrappers: [
            RequireAuth,
        ],
        providers: []
    }
];

export default {
    pages: pageRoutes,
    modals: modalRoutes
};