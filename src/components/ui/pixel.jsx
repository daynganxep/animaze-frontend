import { Rectangle } from "react-leaflet";
import { alpha } from "@mui/material";
import { black, white } from "@/app/app/theme";

export default function Pixel({ x, y, c, opacity = 1, b = true }) {

    const pixelColor = c ? alpha(c, opacity) : "transparent";

    if (b) {
        return <>
            <Rectangle
                bounds={[
                    [y, x],
                    [y + 1, x + 1],
                ]}
                pathOptions={{ color: pixelColor, weight: 1, opacity: 1, fillOpacity: 1 }}
            />
            <Rectangle
                bounds={[
                    [y, x],
                    [y + 0.25, x + 0.25],
                ]}
                pathOptions={{ color: alpha(black, opacity), weight: 1, opacity: 1, fillOpacity: 1 }}
            />
            <Rectangle
                bounds={[
                    [y + 0.125, x + 0.125],
                    [y + 0.375, x + 0.375],
                ]}
                pathOptions={{ color: alpha(white, opacity), weight: 1, opacity: 1, fillOpacity: 1 }}
            />

            <Rectangle
                bounds={[
                    [y, x + 0.75],
                    [y + 0.25, x + 1],
                ]}
                pathOptions={{ color: alpha(black, opacity), weight: 1, opacity: 1, fillOpacity: 1 }}
            />
            <Rectangle
                bounds={[
                    [y + 0.125, x + 0.625],
                    [y + 0.375, x + 0.875],
                ]}
                pathOptions={{ color: alpha(white, opacity), weight: 1, opacity: 1, fillOpacity: 1 }}
            />

            <Rectangle
                bounds={[
                    [y + 0.75, x],
                    [y + 1, x + 0.25],
                ]}
                pathOptions={{ color: alpha(black, opacity), weight: 1, opacity: 1, fillOpacity: 1 }}
            />
            <Rectangle
                bounds={[
                    [y + 0.625, x + 0.125],
                    [y + 0.875, x + 0.375],
                ]}
                pathOptions={{ color: alpha(white, opacity), weight: 1, opacity: 1, fillOpacity: 1 }}
            />

            <Rectangle
                bounds={[
                    [y + 0.75, x + 0.75],
                    [y + 1, x + 1],
                ]}
                pathOptions={{ color: alpha(black, opacity), weight: 1, opacity: 1, fillOpacity: 1 }}
            />
            <Rectangle
                bounds={[
                    [y + 0.625, x + 0.625],
                    [y + 0.875, x + 0.875],
                ]}
                pathOptions={{ color: alpha(white, opacity), weight: 1, opacity: 1, fillOpacity: 1 }}
            />
        </>
    }

    return <Rectangle
        bounds={[
            [y, x],
            [y + 1, x + 1],
        ]}
        pathOptions={{ color: pixelColor, weight: 1, opacity: 1, fillOpacity: 1 }}
    />
}