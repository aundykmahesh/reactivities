import { observer } from "mobx-react-lite";
import React, { ChangeEvent, useState } from "react";
import { Button, Form, Segment } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";

//below will assign activity to selectedactivity, so that we can use a local variable name activity
export default observer (function ActivityForm(){

    const {activitystore} = useStore();
    const {selectedActivity, closeForm, submitting} = activitystore;

    let initialState = selectedActivity ?? {
        id : '',
        name:'',
        category:'',
        description:'',
        date: '',
        city:'',
        venue:'',
        title:''
    };

    const [activity, setActivity] = useState(initialState);

    function handleSubmit(){
        activitystore.submitForm(activity);
        closeForm();
    }

    function handleOnChangeEvent(event : ChangeEvent<HTMLInputElement | HTMLTextAreaElement>){
        const{name,value} = event.target;
        //find the name from input field and replace the value from value available field
        setActivity({...activity,[name]:value})
        console.log(event);
    }


    return(   
        <Segment clearing>              
                <Form onSubmit={handleSubmit} autoComplete="Off">
                <Form.Input placeholder='Title' value={activity.title} name="title" onChange={handleOnChangeEvent}></Form.Input>
                <Form.TextArea value={activity.description} name="description" onChange={handleOnChangeEvent}></Form.TextArea>
                <Form.Input placeholder='Category' value={activity.category} name="category" onChange={handleOnChangeEvent}></Form.Input>
                <Form.Input type='date' placeholder='Date' value={activity.date} name="date" onChange={handleOnChangeEvent}></Form.Input>
                <Form.Input placeholder='City' value={activity.city} name="city" onChange={handleOnChangeEvent}></Form.Input>
                <Form.Input placeholder='Venue' value={activity.venue} name="venue" onChange={handleOnChangeEvent}></Form.Input>

                <Button floated='right' loading={submitting} positive type='submit' content='Submit'></Button>
                <Button floated='right' onClick={closeForm} type='button' content='Cancel'></Button>
            </Form>
        </Segment>
    )
})