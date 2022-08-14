import React from "react";
import { 
    Box, 
    ImageList, 
    ImageListItem, 
    Tooltip, 
    Typography 
} from "@mui/material";
import { MediaModalContext } from "../Context";

interface LibraryProps {
    search: string;
}

function Library(props: LibraryProps) {
    const {
        mediaList,
        setSelectedMedia,
        selectedMedia,
        folders
    } = React.useContext(MediaModalContext);
    const { search } = props;
    const tags = search.toLowerCase().split(" ");

    const filteredList = mediaList.filter(item => (
        tags.some(tag => (
            tag ? item.tags.includes(tag) : true
        ))
    ));

    return filteredList.length > 0 ? (
        <ImageList
            className="MediaModal-gallery"
            variant="quilted"
            cols={4} rowHeight={150}
        >
            {filteredList.map((item, i) => (
                <Tooltip
                    key={i}
                    title={item.title + ": " + item.description}
                    placement="bottom"
                    arrow
                >
                    <ImageListItem
                        className={
                            "MediaModal-gallery-media" +
                            (selectedMedia?.uid === item.uid ? (
                                " MediaModal-gallery-media--isSelected"
                            ) : ""
                            )}

                        cols={1} rows={1}
                        onClick={() => setSelectedMedia((prev) => {
                            if (prev?.uid === item.uid) {
                                return undefined;
                            }

                            return item;
                        })}
                    >
                        <img
                            src={item.url}
                            alt={item.title}
                            loading="lazy"
                        />
                    </ImageListItem>
                </Tooltip>
            ))}
        </ImageList>
    ) : (
        <Box sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            paddingTop: "20%"
        }}>
            <Typography variant="h6">
                {mediaList.length > 0 ? (
                    `No files correspond to "${search}"`
                ) : (
                    `There are no files in ${folders}. Try adding a new one in the "Upload files" tab`
                )}
            </Typography>
        </Box>
    );
}

export default Library;