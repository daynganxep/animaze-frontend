import axios, { service } from '@/tools/axios.tool';

const SectorService = {
    async get(x, y) {
        const [res, err] = await service(axios.get(`/sectors/${x}/${y}`,
            { responseType: 'arraybuffer' }), false, true);

        if (err) return [null, err];

        const { data: frames, headers } = res;
        const accountLegendHeader = headers['x-account-legend'];
        const etag = headers['etag'];

        let accountLegend = [];
        try {
            if (accountLegendHeader) accountLegend = JSON.parse(accountLegendHeader);
        } catch (e) {
            console.error('Failed to parse X-Account-Legend header:', e);
            return [null, new Error('Invalid account legend data from server.')];
        }

        return [{
            frames,
            accountLegend,
            etag,
        }, null];
    },
};

export default SectorService;