import React,{InputHTMLAttributes} from "react";
import {useField} from "formik";
import {FormControl, FormErrorMessage, FormLabel, Input} from "@chakra-ui/react";

interface InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
    name: string
};


const InputField: React.FC<InputFieldProps> = (props) => {
    const [field, {error}] = useField(props);

    return (
        <FormControl isInvalid={!!error}>
            <FormLabel htmlFor="name">First name</FormLabel>
            <Input {...field} id={field.name} placeholder="name" />
            {error ? <FormErrorMessage>{error}</FormErrorMessage> : null}
        </FormControl>
    )
}

export default InputField;