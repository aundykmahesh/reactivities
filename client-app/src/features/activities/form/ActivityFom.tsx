import { observer } from "mobx-react-lite";
import React, { ChangeEvent, useState } from "react";
import { useEffect } from "react";
import { NavLink, useHistory, useParams } from "react-router-dom";
import { Button, Segment } from "semantic-ui-react";
import LoadingComponenet from "../../../app/layout/loadingComponent";
import { useStore } from "../../../app/stores/store";
import { v4 as uuid } from 'uuid';
import { Formik, Form, Field } from "formik";


//below will assign activity to selectedactivity, so that we can use a local variable name activity
export default observer(function ActivityForm() {

    const history = useHistory();
    const { activitystore } = useStore();
    const { submitting, loading, loadActivity } = activitystore;
    const { id } = useParams<{ id: string }>();

    let [activity, setActivity] = useState({
        id: '',
        category: '',
        description: '',
        date: '',
        city: '',
        venue: '',
        title: ''
    });

    useEffect(() => {
        if (id) loadActivity(id).then(activity => setActivity(activity!)
        )
    }, [id, loadActivity])

    //const [activity, setActivity] = useState(initialState);

    // function handleSubmit(){
    //     if(activity.id.length===0) {
    //         activity.id = uuid();
    //     }
    //     activitystore.submitForm(activity).then(() => history.push(`/activities/${activity.id}`));
    // }

    // function handleChange(event : ChangeEvent<HTMLInputElement | HTMLTextAreaElement>){
    //     const{name,value} = event.target;
    //     //find the name from input field and replace the value from value available field
    //     setActivity({...activity,[name]:value})
    //     console.log(event);
    // }

    if (loading) return <LoadingComponenet content="Loading activity..."></LoadingComponenet>

    return (
        <Segment clearing>
            <Formik enableReinitialize initialValues={activity} onSubmit={values => console.log(values)}>
                {({ values:activity, handleChange, handleSubmit }) => (
                    <Form onSubmit={handleSubmit} autoComplete="Off">
                        <Field placeholder='Title' name="title"></Field>
                        <Field name="description" name="description"></Field>
                        <Field placeholder='Category' name="category"></Field>
                        <Field type='date' placeholder='Date' name="date"></Field>
                        <Field placeholder='City' name="city"></Field>
                        <Field placeholder='Venue' name="venue"></Field>

                        <Button floated='right' loading={submitting} positive type='submit' content='Submit'></Button>
                        <Button floated='right' type='button' content='Cancel' as={NavLink} to='/activities'></Button>
                    </Form>
                )}
            </Formik>

        </Segment>
    )
})