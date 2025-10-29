import { Close } from "@mui/icons-material";
import { Box, IconButton } from "@mui/material";
import L from 'leaflet';
import { useEffect, useRef } from "react";


function Window({ close, children, sx = {} }) {
    const ref = useRef(null);

    useEffect(() => {
        if (ref.current) L.DomEvent.disableClickPropagation(ref.current);
    }, []);

    return (<Box ref={ref} padding={2} borderRadius={6} sx={{
        backdropFilter: 'blur(5px)',
        bgcolor: "background.paper",
        position: "relative",
        minWidth: 300,
        minHeight: 100,
        ...sx
    }}>
        <IconButton size="small" onClick={close} sx={{ position: "absolute", top: 12, right: 12 }}>
            <Close></Close>
        </IconButton>
        {children}
    </Box>);
}

export default Window;