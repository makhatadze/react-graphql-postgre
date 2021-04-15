import React from "react";
import {Form, Formik} from "formik";
import Wrapper from "../components/Wrapper";
import InputField from "../components/InputField";
import {Box, Button} from "@chakra-ui/react";
import {useMutation} from "urql";
import {useRegisterMutation} from "../generated/graphql";
import {toErrorMap} from "../utils/toErrorMap";

interface RegisterProps {

}


const Register: React.FC<RegisterProps> = ({}) => {
    const [, register] = useRegisterMutation();
    return (
        <Wrapper variant='small'>
            <Formik
                initialValues={{username: "", password: ''}}
                onSubmit={async (values, {setErrors}) => {
                    const response = await register(values);
                    if (response.data?.register.errors) {
                        setErrors(toErrorMap(response.data.register.errors))
                    }
                }}
            >
                {({isSubmitting}) => (
                    <Form>
                        <InputField
                            name='username'
                            placeholder='username'
                            label='Username'
                        />
                        <Box mt={4}>
                            <InputField
                                placeholder="password"
                                name="password"
                                label="password"
                                type="password"
                            />
                        </Box>
                        <Button mt={4} type='submit' isLoading={isSubmitting} colorScheme="teal">register</Button>
                    </Form>
                )}
            </Formik>
        </Wrapper>
    )
}


export default Register