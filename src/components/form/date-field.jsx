import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { formatDateForInput } from "@tools/date.tool";
import vi from "date-fns/locale/vi";

const DateField = ({
    value,
    onChange,
    format = "dd/MM/yyyy",
    label,
    fullWidth = true,
    error,
    helperText,
    sx,
    InputLabelProps,
    ...props
}) => {
    const handleDateChange = (newValue) => {
        onChange({ target: { value: formatDateForInput(newValue) } });
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={vi}>
            <DatePicker
                label={label}
                value={value ? new Date(value) : null}
                onChange={handleDateChange}
                format={format}
                slotProps={{
                    textField: {
                        fullWidth,
                        error,
                        helperText,
                        sx,
                        InputLabelProps,
                        ...props,
                    },
                }}
            />
        </LocalizationProvider>
    );
};

export default DateField;
