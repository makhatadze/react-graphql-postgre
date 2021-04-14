import React from "react";
import {Form, Formik} from "formik";
import {FormControl, FormLabel, Input} from "@chakra-ui/react";
import Wrapper from "../components/Wrapper";

interface RegisterProps {

}

const Register: React.FC<RegisterProps> = ({}) => {
    return(
        <Wrapper variant='small'>
            <Formik
                initialValues={{username: "",password: ''}}
                onSubmit={(values => {
                    console.log(values)
                })}
            >
                {(values, handleChange) => (
                    <Form>
                        <FormControl >
                            <FormLabel htmlFor="username">Username</FormLabel>
                            <Input
                                value={values.username}
                                onChange={handleChange}
                                id="username"
                                placeholder="username" />
                        </FormControl>
                        {/*<FormErrorMessage>{form.errors.name}</FormErrorMessage>*/}
                    </Form>
                )}

            </Formik>
        </Wrapper>
    )
}


export default Register