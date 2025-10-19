import axios, { service } from "@/tools/axios.tool";

const AccountService = {
    getMyAccount() {
        return service(axios.get("/accounts/me"));
    },
};

export default AccountService;
