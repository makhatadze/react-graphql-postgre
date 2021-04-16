import React, {useState} from "react";
import {NextPage} from "next";
import Wrapper from "../../components/Wrapper";
import {Form, Formik} from "formik";
import {toErrorMap} from "../../utils/toErrorMap";
import InputField from "../../components/InputField";
import {Box, Button} from "@chakra-ui/react";
import {useChangePasswordMutation} from "../../generated/graphql";
import {useRouter} from "next/router";
import {withUrqlClient} from "next-urql";
import {createUrqlClient} from "../../utils/createUrqlClient";


const ChangePassword: NextPage<{ token: string }> = ({token}) => {
    const router = useRouter();
    const [, changePassword] = useChangePasswordMutation();
    const [tokenError, setTokenError] = useState('');

    return (
        <Wrapper variant='small'>
            <Formik
                initialValues={{newPassword: ''}}
                onSubmit={async (values, {setErrors}) => {
                    const response = await changePassword({
                        newPassword: values.newPassword,
                        token
                    });
                    if (response.data?.changePassword.errors) {
                        const errorMap = toErrorMap(response.data.changePassword.errors);
                        if ('token' in errorMap) {
                            setTokenError(errorMap.token)
                        }
                        setErrors(errorMap)
                    } else if (response.data?.changePassword.user) {
                        await router.push('/');
                    }
                }}
            >
                {({isSubmitting}) => (
                    <Form>
                        <InputField
                            name='newPassword'
                            placeholder='new password'
                            label='New Password'
                            type="password"
                        />
                        <Box color='red'>{tokenError}</Box>
                        <Button mt={4} type='submit' isLoading={isSubmitting} colorScheme="teal">change
                            password</Button>
                    </Form>
                )}
            </Formik>
        </Wrapper>
    );
}

ChangePassword.getInitialProps = ({query}) => {
    return {
        token: query.token as string
    }
}

export default withUrqlClient(createUrqlClient)(ChangePassword)