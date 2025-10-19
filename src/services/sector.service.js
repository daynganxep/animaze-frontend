import axios, { service } from "@/tools/axios.tool";

const SectorService = {
    getByPositon(x, y) {
        return service(axios.get(`/sectors/${x}/${y}`));
    },
};

export default SectorService;
