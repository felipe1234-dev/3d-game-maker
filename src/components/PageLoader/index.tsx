import "@local/styles/components/PageLoader.scss";

interface PageLoaderProps {
    hidden?: boolean
}

function PageLoader(props: PageLoaderProps) {
    const { hidden } = props;

    return (
        <div className={`PageLoader ${hidden ? "PageLoader--isHidden" : ""}`.trim()}>
            <div className="PageLoader-container">
                <span className="PageLoader-container-dot"></span>
                <span className="PageLoader-container-dot"></span>
                <span className="PageLoader-container-dot"></span>
                <span className="PageLoader-container-dot"></span>
            </div>
        </div>
    );
}

export default PageLoader;
export type { PageLoaderProps };