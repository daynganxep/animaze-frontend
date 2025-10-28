import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { Controller } from "react-hook-form";
import vi from "date-fns/locale/vi";

const DateField2 = ({
    name,
    control,
    format = "dd/MM/yyyy",
    label,
    fullWidth = true,
    error,
    helperText,
    sx,
    InputLabelProps,
    required = false,
    ...props
}) => {
    return (
        <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={vi}>
            <Controller
                name={name}
                control={control}
                render={({ field }) => (
                    <DatePicker
                        label={`${label || ""}${required ? " *" : ""}`}
                        value={field.value ? new Date(field.value) : null}
                        onChange={field.onChange}
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
                )}
            />
        </LocalizationProvider>
    );
};

export default DateField2;
