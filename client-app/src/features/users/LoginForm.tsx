import { ErrorMessage, Form, Formik } from "formik";
import { observer } from "mobx-react-lite";
import React from "react";
import { Button, Label } from "semantic-ui-react";
import MyTextInput from "../../app/common/form/MyTextInput";
import { useStore } from "../../app/stores/store";

export default observer (function LoginForm() {
    const {userstore} = useStore();
    return(
        //using formik seterrors 
        <Formik initialValues={{email: '', password:'', error:null}} 
            onSubmit={(values,{setErrors}) => userstore.login(values).catch(error => 
                setErrors({error :'Invalid login or password'}))}>
                {
                    //this is formik issubmitting
                    ({handleSubmit, isSubmitting, errors}) => (
                        <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
                            <MyTextInput name='email' placeholder='Email' 
                               color={errors.error && 'red'}
                            />
                            <MyTextInput name='password' placeholder='Password' type='password' />
                            <ErrorMessage 
                                name='error'
                                render = {() => 
                                    <Label style={{marginBottom: 10}} basic
                                    color='red' content={errors.error} />
                                }
                            />
                            <Button loading={isSubmitting} positive content='Login' type='submit' fluid />
                        </Form>
                    )
                }
        </Formik>
    )
    
})