import { Rectangle } from "react-leaflet";
import { alpha } from "@mui/material";
import { black, white } from "@/app/app/theme";

export default function Pixel({ x, y, c, opacity = 1, b = true }) {
    const pixelColor = c ? alpha(c, opacity) : "transparent";
    const thickness = 0.05;
    const blendOpacity = 1;

    if (b) {
        return (
            <>

                {/* Light on top inner */}
                <Rectangle
                    bounds={[[y, x], [y + 1, x + 1]]}
                    pathOptions={{ color: alpha(black, blendOpacity), weight: 0, fillOpacity: 1 }}
                />
                {/* Light on left inner */}
                <Rectangle
                    bounds={[[y + thickness, x + thickness], [y + 1 - thickness, x + 1 - + thickness]]}
                    pathOptions={{ color: alpha(white, blendOpacity), weight: 0, fillOpacity: 1 }}
                />
                {/* Dark on bottom inner */}
                <Rectangle
                    bounds={[[y, x + 4 * thickness], [y + 1, x + 1 - 4 * thickness]]}
                    pathOptions={{ color: pixelColor, weight: 0, fillOpacity: 1 }}
                />
                {/* Dark on right inner */}
                <Rectangle
                    bounds={[[y + 4 * thickness, x], [y + 1 - 4 * thickness, x + 1]]}
                    pathOptions={{ color: pixelColor, weight: 0, fillOpacity: 1 }}
                />
                <Rectangle
                    bounds={[[y + 2 * thickness, x + 2 * thickness], [y + 1 - 2 * thickness, x + 1 - 2 * thickness]]}
                    pathOptions={{ color: pixelColor, weight: 0, fillOpacity: 1 }}
                />
            </>
        );
    }

    return (
        <Rectangle
            bounds={[[y, x], [y + 1, x + 1]]}
            pathOptions={{ color: pixelColor, weight: 1, opacity: 1, fillOpacity: 1 }}
        />
    );
}