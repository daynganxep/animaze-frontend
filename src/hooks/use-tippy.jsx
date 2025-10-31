import { useState } from "react";

function useTippy() {
    const [opening, setOpening] = useState(false);
    return {
        opening,
        close: () => setOpening(false),
        open: () => setOpening(true),
    };
}

export default useTippy;