import React from "react";
import {Form, Formik} from "formik";
import Wrapper from "../components/Wrapper";
import InputField from "../components/InputField";

interface RegisterProps {

}

const Register: React.FC<RegisterProps> = ({}) => {
    // @ts-ignore
    return (
        <Wrapper variant='small'>
            <Formik
                initialValues={{username: "", password: ''}}
                onSubmit={(values => {
                    console.log(values)
                })}
            >
                {(values, handleChange) => (
                    <Form>
                        <InputField
                            name='username'
                            placeholder='username'
                            label='Username'
                        />
                        <InputField
                            placeholder="password"
                            name="password"
                            label="password"
                            type="password"
                        />
                    </Form>
                )}

            </Formik>
        </Wrapper>
    )
}


export default Register