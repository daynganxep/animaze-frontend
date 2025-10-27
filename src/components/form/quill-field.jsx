import { Controller } from "react-hook-form";
import { FormHelperText } from "@mui/material";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const QuillField = ({
    name,
    control,
    label,
    rules,
    sx,
    modules = {
        toolbar: [
            [{ header: [1, 2, false] }],
            ["bold", "italic", "underline"],
            ["link"],
            [{ list: "ordered" }, { list: "bullet" }],
        ],
    },
    ...props
}) => {
    return (
        <Controller
            name={name}
            control={control}
            rules={rules}
            render={({ field, fieldState }) => (
                <div style={{ display: "flex", flexDirection: "column", gap: "8px", ...sx }}>
                    <ReactQuill
                        theme="snow"
                        modules={modules}
                        value={field.value || ""}
                        onChange={field.onChange}
                        placeholder={label}
                        style={{ backgroundColor: "transparent" }}
                        {...props}
                    />
                    {fieldState.error && (
                        <FormHelperText error>{fieldState.error.message}</FormHelperText>
                    )}
                </div>
            )}
        />
    );
};

export default QuillField;