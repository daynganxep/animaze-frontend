import { useSelector } from "react-redux";
import Tracker from "./tracker";
import PaintMode from "../paint-mode";
import { useMap, useMapEvent } from "react-leaflet";
import { MIN_VISIBLE_ZOOM } from "@/configs/const.config";
import { useState } from "react";

function PaintSide() {
    const { paintMode } = useSelector(s => s.ui);
    const map = useMap();
    const [visible, setVisible] = useState(map.getZoom() >= MIN_VISIBLE_ZOOM);

    useMapEvent("zoomend", () => {
        setVisible(map.getZoom() >= MIN_VISIBLE_ZOOM)
    });

    if (!visible) return;

    return paintMode ? <PaintMode /> : <Tracker />;
}

export default PaintSide;