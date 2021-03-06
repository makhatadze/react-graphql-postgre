import React from "react";
import {Form, Formik} from "formik";
import Wrapper from "../components/Wrapper";
import InputField from "../components/InputField";
import {Box, Button} from "@chakra-ui/react";
import {useRegisterMutation} from "../generated/graphql";
import {toErrorMap} from "../utils/toErrorMap";
import {useRouter} from "next/router";
import {withUrqlClient} from "next-urql";
import {createUrqlClient} from "../utils/createUrqlClient";

interface RegisterProps {

}


const Register: React.FC<RegisterProps> = ({}) => {
    const router = useRouter();
    const [, register] = useRegisterMutation();
    return (
        <Wrapper variant='small'>
            <Formik
                initialValues={{email:"",username: "", password: ''}}
                onSubmit={async (values, {setErrors}) => {
                    const response = await register({options: values});
                    if (response.data?.register.errors) {
                        setErrors(toErrorMap(response.data.register.errors))
                    } else if(response.data?.register.user) {
                        router.push('/');
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
                                placeholder="email"
                                name="email"
                                label="email"
                            />
                        </Box>
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


export default withUrqlClient(createUrqlClient)(Register)