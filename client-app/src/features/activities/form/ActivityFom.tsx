import { observer } from "mobx-react-lite";
import React, { useState } from "react";
import { useEffect } from "react";
import { NavLink, useHistory, useParams } from "react-router-dom";
import { Button, Header, Segment } from "semantic-ui-react";
import LoadingComponenet from "../../../app/layout/loadingComponent";
import { useStore } from "../../../app/stores/store";
import { v4 as uuid } from 'uuid';
import { Formik, Form } from "formik";
import * as Yup from "yup";
import MyTextInput from "../../../app/common/form/MyTextInput";
import MyTextArea from "../../../app/common/form/MyTextArea";
import MySelectInput from "../../../app/common/form/MySelectInput";
import { categoryOptions } from "../../../app/common/options/categoryOptions";
import MyDateInput from "../../../app/common/form/MyDateInput";
import { Activity } from "../../../models/activity";


//below will assign activity to selectedactivity, so that we can use a local variable name activity
export default observer(function ActivityForm() {

    const history = useHistory();
    const { activitystore } = useStore();
    const { submitting, loading, loadActivity } = activitystore;
    const { id } = useParams<{ id: string }>();

    let [activity, setActivity] = useState<Activity>({
        id: '',
        category: '',
        description: '',
        date: null,
        city: '',
        venue: '',
        title: ''
    });

    const ValidationSchema = Yup.object({
        title: Yup.string().required("The activity is required"),
        description: Yup.string().required("The activity description is required"),
        category: Yup.string().required(),
        date: Yup.string().required("Date is required").nullable(),
        venue: Yup.string().required(),
        city: Yup.string().required(),
    })

    useEffect(() => {
        if (id) loadActivity(id).then(activity => setActivity(activity!)
        )
    }, [id, loadActivity])

    //const [activity, setActivity] = useState(initialState);

    function handleFormSubmit(activity: Activity) {
        if (activity.id.length === 0) {
            activity.id = uuid();
        }
        activitystore.submitForm(activity).then(() => history.push(`/activities/${activity.id}`));
    }

    // function handleChange(event : ChangeEvent<HTMLInputElement | HTMLTextAreaElement>){
    //     const{name,value} = event.target;
    //     //find the name from input MyTextInput and replace the value from value available MyTextInput
    //     setActivity({...activity,[name]:value})
    //     console.log(event);
    // }

    if (loading) return <LoadingComponenet content="Loading activity..."></LoadingComponenet>

    return (
        <Segment clearing>
            <Header content="Activity Details" sub color="teal" />
            <Formik validationSchema={ValidationSchema} 
                enableReinitialize initialValues={activity} 
                onSubmit={values => handleFormSubmit(values)}>
                {({handleSubmit, isValid, isSubmitting, dirty}) => (
                    <Form className="ui form" onSubmit={handleSubmit} autoComplete="Off">
                        <MyTextInput placeholder='Title' name="title"></MyTextInput>
                        <MyTextArea rows={11} name="description" placeholder="description" ></MyTextArea>
                        <MySelectInput options={categoryOptions} placeholder='Category' name="category"></MySelectInput>
                        <MyDateInput
                            placeholderText='Date'
                            name="date"
                            showTimeSelect
                            timeCaption="time"
                            dateFormat="MMM d, yyyy h:mm aa"
                        />
                        <Header content="Location Details" sub color="teal" />

                        <MyTextInput placeholder='City' name="city"></MyTextInput>
                        <MyTextInput placeholder='Venue' name="venue"></MyTextInput>

                        <Button disabled={isSubmitting || !dirty || !isValid}
                            floated='right' loading={submitting} 
                            positive type='submit' 
                            content='Submit'>

                            </Button>
                        <Button floated='right' type='button' content='Cancel' as={NavLink} to='/activities'></Button>
                    </Form>
                )}
            </Formik>

        </Segment>
    )
})