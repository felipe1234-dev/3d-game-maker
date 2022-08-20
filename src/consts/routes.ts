import { 
    AuthPage, 
    HomePage, 
    EditorPage 
} from "@local/pages";
import { 
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

const pageRoutes: RouteInfo[] = [
    {
        path: "/auth",
        Element: AuthPage,
        wrappers: [],
        providers: []
    },
    {
        path: "/home",
        Element: HomePage,
        wrappers: [
            RequireAuth
        ],
        providers: []
    },
    {
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
        path: "/editor/object",
        Element: EditObjectModal,
        wrappers: [
            RequireAuth,
        ],
        providers: []
    },
    {
        path: "/editor/scene",
        Element: EditSceneModal,
        wrappers: [
            RequireAuth,
        ],
        providers: []
    },
    {
        path: "/editor/scene-tree",
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