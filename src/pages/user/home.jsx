import GoogleLoginOauth2 from "@/components/ui/google-login-oauth2";
import SectorService from '../../services/sector.service';
import { SectorDataParser } from '../../tools/data.tool';
import { Button } from '@mui/material';

export default function Home() {

    async function handleGetSector() {
        const [res, err] = await SectorService.get(0, 0);
        if (err) {
            console.log({ err })
            return;
        }
        const { frames, accountLegend } = res;
        const sectorParser = new SectorDataParser(frames, accountLegend);
        for (let i = 0; i < 10; i++) {
            console.log(sectorParser.getPixel(0, i, 0));
        }
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
