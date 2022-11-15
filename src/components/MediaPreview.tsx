import { Typography, Button } from "@mui/material";

import { t } from "@local/i18n";
import { Media } from "@local/api/models";

import "@local/styles/components/MediaPreview.scss";

interface MediaPreviewProps {
    onChange: () => void;
    value: Media;
    disabled?: boolean;
}

function MediaPreview(props: MediaPreviewProps) {
    const {
        value: media,
        onChange,
        disabled = false
    } = props;

    return (
        <div className="MediaPreview">
            <figure className="MediaPreview-image">
                <img
                    src={media.url}
                    alt={media.title}
                />
            </figure>
            <div className="MediaPreview-info">
                <Typography variant="subtitle1" component="p">
                    {media.title} ({media.mimeType})
                </Typography>

                <Button onClick={onChange} disabled={disabled}>
                    {t("Change image")}
                </Button>
            </div>
        </div>
    );
}

export default MediaPreview;
export type { MediaPreviewProps };