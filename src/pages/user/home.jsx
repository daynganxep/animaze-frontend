import GoogleLoginOauth2 from "@/components/ui/google-login-oauth2";
import SectorService from "@/services/sector.service";
import { Button } from "@mui/material";

export default function Home() {

    async function handleGetSector() {
        const [res, err] = await SectorService.getByPositon(0, 0);
        if (err) {
            console.log({ err })
            return;
        }
        console.log(res);
    }

    return (
        <div>
            <GoogleLoginOauth2 />
            <div>Home

                <Button onClick={handleGetSector}>Get Sector</Button>
            </div>
        </div>
    );
}
