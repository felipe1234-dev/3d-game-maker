import React from "react";
import { ImageList, ImageListItem, Tooltip } from "@mui/material";
import { MediaModalContext } from "./Context";

function Library() {
    const { mediaList, selectedMedia, setSelectedMedia } = React.useContext(MediaModalContext);

    return (
        <ImageList
            className="MediaModal-gallery"
            variant="quilted"
            cols={4} rowHeight={150}
        >
            {mediaList.map((item, i) => (
                <Tooltip key={i} title={item.title + ": " + item.description} placement="bottom" arrow>
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
    );
}

export default Library;