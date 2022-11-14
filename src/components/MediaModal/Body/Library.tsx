import {
    Box,
    ImageList,
    ImageListItem,
    Tooltip,
    Typography,
} from "@mui/material";
import { useMediaModal } from "../Context";

interface LibraryProps {
    search: string;
}

function Library(props: LibraryProps) {
    const { mediaList, setSelectedMedia, selectedMedia, folders } =
        useMediaModal();
    const { search } = props;
    const tags = search.toLowerCase().split(" ");

    const filteredList = mediaList.filter(media =>
        tags.some(tag => (tag ? media.tags.includes(tag) : true))
    );

    return filteredList.length > 0 ? (
        <ImageList
            className="MediaModal-gallery"
            variant="quilted"
            cols={4}
            gap={8}
            rowHeight={150}
        >
            {filteredList.map(media => (
                <Tooltip
                    key={media.uid}
                    title={media.title + ": " + media.description}
                    placement="bottom"
                    arrow
                >
                    <ImageListItem
                        className={
                            "MediaModal-gallery-media" +
                            (selectedMedia?.uid === media.uid
                                ? " MediaModal-gallery-media--isSelected"
                                : "")
                        }
                        cols={1}
                        rows={1}
                        onClick={() =>
                            setSelectedMedia(prev => {
                                if (prev?.uid === media.uid) {
                                    return undefined;
                                }

                                return media;
                            })
                        }
                    >
                        <img
                            src={media.url}
                            alt={media.title}
                            loading="lazy"
                        />
                    </ImageListItem>
                </Tooltip>
            ))}
        </ImageList>
    ) : (
        <Box
            sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                paddingTop: "20%",
            }}
        >
            <Typography variant="h6">
                {mediaList.length > 0
                    ? `No files correspond to "${search}"`
                    : `There are no files in ${folders}. Try adding a new one in the "Upload files" tab`}
            </Typography>
        </Box>
    );
}

export default Library;