import { format } from "date-fns";
import vi from "date-fns/locale/vi";

export const formatDateForInput = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return isNaN(date) ? "" : date.toISOString().split("T")[0];
};

export const formatDateForBackend = (dateString) => {
    if (!dateString) return null;
    const date = new Date(dateString);
    return isNaN(date) ? null : date.toISOString();
};

export const formatDateForUI = (date, formatString = "dd/MM/yyyy") => {
    return format(new Date(date), formatString, { locale: vi });
};
