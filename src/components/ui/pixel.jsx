import { Rectangle } from "react-leaflet"

export default function Pixel({ x, y, color = "transparent" }) {

    return <>
        <Rectangle
            bounds={[
                [y, x],
                [y + 1, x + 1],
            ]}
            pathOptions={{ color, weight: 1, fillOpacity: 1 }}
        />
        <Rectangle
            bounds={[
                [y, x],
                [y + 0.25, x + 0.25],
            ]}
            pathOptions={{ color: 'black', weight: 1, fillOpacity: 1 }}
        />
        <Rectangle
            bounds={[
                [y + 0.125, x + 0.125],
                [y + 0.375, x + 0.375],
            ]}
            pathOptions={{ color: 'white', weight: 1, fillOpacity: 1 }}
        />

        <Rectangle
            bounds={[
                [y, x + 0.75],
                [y + 0.25, x + 1],
            ]}
            pathOptions={{ color: 'black', weight: 1, fillOpacity: 1 }}
        />
        <Rectangle
            bounds={[
                [y + 0.125, x + 0.625],
                [y + 0.375, x + 0.875],
            ]}
            pathOptions={{ color: 'white', weight: 1, fillOpacity: 1 }}
        />

        <Rectangle
            bounds={[
                [y + 0.75, x],
                [y + 1, x + 0.25],
            ]}
            pathOptions={{ color: 'black', weight: 1, fillOpacity: 1 }}
        />
        <Rectangle
            bounds={[
                [y + 0.625, x + 0.125],
                [y + 0.875, x + 0.375],
            ]}
            pathOptions={{ color: 'white', weight: 1, fillOpacity: 1 }}
        />

        <Rectangle
            bounds={[
                [y + 0.75, x + 0.75],
                [y + 1, x + 1],
            ]}
            pathOptions={{ color: 'black', weight: 1, fillOpacity: 1 }}
        />
        <Rectangle
            bounds={[
                [y + 0.625, x + 0.625],
                [y + 0.875, x + 0.875],
            ]}
            pathOptions={{ color: 'white', weight: 1, fillOpacity: 1 }}
        />
    </>
}