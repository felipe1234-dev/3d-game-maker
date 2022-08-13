import { 
    AuthPage, 
    HomePage, 
    EditorPage 
} from "@local/pages";
import { 
    EditObjectModal, 
    EditSceneModal 
} from "@local/modals";
import { RouteInfo } from "@local/interfaces";
import { RequireAuth } from "@local/components";
import { GameProvider, EditorProvider } from "@local/contexts";

const pageRoutes: RouteInfo[] = [
    {
        path: "/auth",
        Element: AuthPage,
        wrappers: []
    },
    {
        path: "/home",
        Element: HomePage,
        wrappers: [
            RequireAuth
        ]
    },
    {
        path: "/editor",
        Element: EditorPage,
        wrappers: [
            RequireAuth,
            GameProvider,
            EditorProvider
        ]
    },

];

const modalRoutes: RouteInfo[] = [
    {
        path: "/editor/object",
        Element: EditObjectModal,
        wrappers: [
            RequireAuth,
            GameProvider,
            EditorProvider
        ]
    },
    {
        path: "/editor/scene",
        Element: EditSceneModal,
        wrappers: [
            RequireAuth,
            GameProvider,
            EditorProvider
        ]
    }
];

export default {
    pages: pageRoutes,
    modals: modalRoutes
};