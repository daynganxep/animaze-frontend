import { Box, IconButton, Tooltip } from "@mui/material";
import L from 'leaflet';
import { X } from "lucide-react";
import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";


function Window({ close, children, sx = {} }) {
    const { t } = useTranslation();
    const ref = useRef(null);

    useEffect(() => {
        if (ref.current) L.DomEvent.disableClickPropagation(ref.current);
    }, []);

    return (<Box ref={ref} padding={2} borderRadius={6} sx={{
        backdropFilter: 'blur(5px)',
        bgcolor: "background.default",
        position: "relative",
        minWidth: 300,
        minHeight: 100,
        ...sx
    }}>
        <Tooltip arrow placement="left" title={t("common.close")}>
            <IconButton size="small" onClick={close} sx={{ position: "absolute", top: 12, right: 12 }}>
                <X></X>
            </IconButton>
        </Tooltip>
        {children}
    </Box>);
}

export default Window;