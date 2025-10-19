import { useTheme } from "@/emotion/react";

function useIsDark() {
    const theme = useTheme();
    return theme.palette.mode === 'dark';
}

export default useIsDark;