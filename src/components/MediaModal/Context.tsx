import React, {
    createContext,
    useContext,
    useEffect,
    useState
} from "react";
import { gallery } from "@local/api";
import { Media } from "@local/api/models";
import { useAlert } from "@local/contexts";
import { Alert, Filter } from "@local/interfaces";

interface MediaModalValue {
    folders: string;
    mediaList: Media[];
    selectedMedia?: Media;

    setFolders: React.Dispatch<React.SetStateAction<string>>;
    setMediaList: React.Dispatch<React.SetStateAction<Media[]>>;
    setSelectedMedia: React.Dispatch<React.SetStateAction<Media | undefined>>;
}

const MediaModalContext = createContext<MediaModalValue | undefined>(undefined);

function MediaModalProvider(props: { children: React.ReactNode }) {
    const { setSeverity, setMessage } = useAlert();

    const [mediaList, setMediaList] = useState<Media[]>([]);
    const [selectedMedia, setSelectedMedia] = useState<Media>();
    const [folders, setFolders] = useState("");

    useEffect(() => {
        const filter: Filter = {
            orderBy: [
                ["createdAt", "desc"]
            ]
        };

        if (folders) {
            filter.where = [
                ["folders", "==", folders]
            ];
        }

        gallery
            .list(filter)
            .then(resp => {
                setMediaList(resp);
            })
            .catch((error: Alert) => {
                setSeverity(error.severity);
                setMessage(error.message);
            });
    }, [folders]);

    return (
        <MediaModalContext.Provider
            value={{
                folders,
                mediaList,
                selectedMedia,

                setFolders,
                setMediaList,
                setSelectedMedia,
            }}
        >
            {props.children}
        </MediaModalContext.Provider>
    );
}

function useMediaModal() {
    const context = useContext(MediaModalContext);

    if (!context) {
        throw new Error(
            "useMediaModal must be used within a MediaModalProvider"
        );
    }

    return context;
}

export { useMediaModal, MediaModalProvider };
export type { MediaModalValue };