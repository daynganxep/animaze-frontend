import axios, { service } from "@/tools/axios.tool";

const AccountService = {
    getMyAccount() {
        return service(axios.get("/accounts/me"));
    },
    getByPublicID(publicId) {
        return service(axios.get("/accounts/public/" + publicId));
    },
};

export default AccountService;
