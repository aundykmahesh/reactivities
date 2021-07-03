import React, { ChangeEvent, useState } from "react";
import { Button, Form, Segment } from "semantic-ui-react";
import { Activity } from "../../../models/activity";

interface Props{
    activity : Activity | undefined;
    formClose : ()=> void;
    formSubmit : (activity:Activity) => void;
}

//below will assign activity to selectedactivity, so that we can use a local variable name activity
export default function ActivityForm({activity : selectedActivity, formClose, formSubmit} : Props){
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
        console.log(activity);
        formSubmit(activity);
        formClose();
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
                <Form.Input placeholder='Date' value={activity.date} name="date" onChange={handleOnChangeEvent}></Form.Input>
                <Form.Input placeholder='City' value={activity.city} name="city" onChange={handleOnChangeEvent}></Form.Input>
                <Form.Input placeholder='Venue' value={activity.venue} name="venue" onChange={handleOnChangeEvent}></Form.Input>

                <Button floated='right' positive type='submit' content='Submit'></Button>
                <Button floated='right' onClick={formClose} type='button' content='Cancel'></Button>
            </Form>
        </Segment>
    )
}