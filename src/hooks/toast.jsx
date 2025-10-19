import { toast } from "react-hot-toast";
import i18n from "i18next";

function getMessage(key, isApiCode = true) {
    const translated = isApiCode ? i18n.t(`api-code.${key}`) : i18n.t(key);
    return translated;
}

const success = (messageKey, isApiCode = true) => {
    toast.success(getMessage(messageKey, isApiCode));
};

const error = (messageKey, isApiCode = true) => {
    toast.error(getMessage(messageKey, isApiCode));
};

export default {
    success,
    error,
};
