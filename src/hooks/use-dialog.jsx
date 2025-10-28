import { useState } from "react";

function useDialog() {
    const [opening, setOpening] = useState(false);
    return {
        opening,
        close: () => setOpening(false),
        open: () => setOpening(true),
    };
}

export default useDialog;