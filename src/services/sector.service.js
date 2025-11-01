import axios, { service } from '@/tools/axios.tool';

const SectorService = {
    async get(x, y, etag = null) {
        const headers = etag ? { 'If-None-Match': etag } : {};
        const [res, err] = await service(axios.get(`/sectors/${x}/${y}`, {
            headers,
            responseType: 'arraybuffer',
        }), false, true);

        if (err) return [null, err];
        if (res.status === 304) return [null, null];

        const { data: frames, headers: resHeaders } = res;
        const accountLegendHeader = resHeaders['x-account-legend'];
        const newEtag = resHeaders['etag'];

        let accountLegend = [];
        try {
            if (accountLegendHeader) accountLegend = JSON.parse(accountLegendHeader);
        } catch (e) {
            console.error('Failed to parse X-Account-Legend header:', e);
            return [null, new Error('Invalid account legend data from server.')];
        }

        return [{ frames, accountLegend, etag: newEtag }, null];
    },

    async paint(pixelsPatchs) {
        const chunkSize = 1000;
        const chunks = [];
        for (let i = 0; i < pixelsPatchs.length; i += chunkSize) {
            chunks.push(pixelsPatchs.slice(i, i + chunkSize));
        }
        return await Promise.all(chunks.map(chunk => service(axios.post("/sectors/paint", { pixels: chunk }))));
    },
};

export default SectorService;