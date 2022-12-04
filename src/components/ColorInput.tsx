import { TextFieldProps } from "@material-ui/core";
import ColorPicker from "material-ui-color-picker";
import "@local/styles/components/ColorInput.scss";

interface ColorInputProps extends Omit<TextFieldProps, "onChange"> {
    value: string;
    defaultValue?: string;
    onChange: (color: string) => void;
    convert?: string | number | symbol | undefined;
    hintText?: string;
    floatingLabelText?: string;
    showPicker?: boolean;
    internalValue?: string;
    setShowPicker?: (open: boolean) => void;
    setValue?: (value: string) => void;
}

function ColorInput(props: ColorInputProps) {
    const { className, value } = props;
    
    return (
        <ColorPicker
            className={`ColorInput ${className ?? ""}`.trim()}
            {...props}
            value={value}
            InputProps={{
                value,
                startAdornment: (
                    <div 
                        className="ColorInput-square"
                        style={{
                            backgroundColor: value,
                        }} 
                    />
                ),
            }}
        />
    );
}

export default ColorInput;
export type { ColorInputProps };