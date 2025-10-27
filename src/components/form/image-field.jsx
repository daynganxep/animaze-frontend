import { useRef } from "react";
import { Controller } from "react-hook-form";

export default function ImageField({ name, control, render }) {
    const fileInputRef = useRef(null);

    return (
        <Controller
            name={name}
            control={control}
            render={({ field: { value, onChange } }) => {
                const open = () => fileInputRef.current?.click();

                const handleChange = (e) => {
                    if (e.target.files && e.target.files[0]) {
                        onChange(e.target.files[0]);
                    }
                };

                return (
                    <>
                        {render(value, open)}
                        <input
                            type="file"
                            accept="image/*"
                            ref={fileInputRef}
                            onChange={handleChange}
                            hidden
                        />
                    </>
                );
            }}
        />
    );
}
