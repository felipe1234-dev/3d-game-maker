function openWindow(url: string) {
    Object.defineProperty(global, "window", {
        value: {
            ...window,
            location: {
                ...window.location,
                href: url
            },
        },
        writable: true,
    });
}

export default openWindow;