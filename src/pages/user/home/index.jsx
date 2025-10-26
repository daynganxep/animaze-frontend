import MyMapComponent from "@/components/ui/map";

export default function Home() {
    return (
        <div style={{ padding: '20px' }}>
            <h1 style={{ marginBottom: '20px', textAlign: 'center' }}>
                Animaze - Bản đồ tương tác
            </h1>
            <MyMapComponent />
        </div>
    );
}
