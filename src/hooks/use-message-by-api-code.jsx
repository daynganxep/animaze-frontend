import { useTranslation } from "react-i18next";

export default function useMessageByApiCode() {
    const { t } = useTranslation();

    return function (key) {
        const apiCodeKey = `api-code.${key}`;
        return t(apiCodeKey) || apiCodeKey;
    };
}
