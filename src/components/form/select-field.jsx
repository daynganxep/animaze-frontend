import { Controller } from "react-hook-form";
import {
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    FormHelperText,
} from "@mui/material";

const SelectField = ({
    name,
    control,
    label,
    rules,
    options = [],
    fullWidth = true,
    sx,
    multiple = false,
    ...props
}) => {
    return (
        <Controller
            name={name}
            control={control}
            rules={rules}
            render={({ field, fieldState }) => (
                <FormControl
                    fullWidth={fullWidth}
                    variant="outlined"
                    sx={sx}
                    error={!!fieldState.error}
                >
                    <InputLabel id={`${name}-label`}>{label}</InputLabel>
                    <Select
                        {...field}
                        labelId={`${name}-label`}
                        label={label}
                        multiple={multiple}
                        value={multiple ? field.value || [] : field.value || ""}
                        onChange={(e) => field.onChange(e.target.value)}
                        {...props}
                    >
                        {options.map((opt) => (
                            <MenuItem key={opt.value} value={opt.value}>
                                {opt.label}
                            </MenuItem>
                        ))}
                    </Select>
                    {fieldState.error && (
                        <FormHelperText>{fieldState.error.message}</FormHelperText>
                    )}
                </FormControl>
            )}
        />
    );
};

export default SelectField;