import React from "react";

import { Link } from "react-router-dom";
import { Button, Icon, Item, Segment } from "semantic-ui-react";
import { Activity } from "../../../models/activity";
import {format} from "date-fns"

interface Props{
    activity : Activity;
}

export default function  ActivityListItem({activity} :Props) {
    // const [target, setTarget] = useState('');
    // const {activitystore} = useStore();

    // const {submitting, deleteActivity, activitiesByDate} = activitystore;

    // function handleActivityDelete(e:SyntheticEvent<HTMLButtonElement>, id:string){
    //     setTarget(e.currentTarget.name);
    //     deleteActivity(id);
    // }
    return(
        <Segment.Group>
            <Segment>
                <Item.Group>
                    <Item>
                        <Item.Image size="tiny" circular src="/assets/user.png"></Item.Image>
                        <Item.Content>
                            <Item.Header as={Link} to={`/activities/${activity.id}`}>
                                {activity.title}
                            </Item.Header>
                            <Item.Description>Hosted by Ramu</Item.Description>
                        </Item.Content>
                    </Item>
                </Item.Group>
            </Segment>
            <Segment clearing>
                <span>
                    <Icon name="clock"/>{format(activity.date!, 'dd MMM yyyy h:mm aa')}
                    <Icon name="marker"/>{activity.venue}
                </span>
            </Segment>
            <Segment secondary>
                Attendees comes here
            </Segment>
            <Segment clearing>
                <span>{activity.description}</span>
                <Button as={Link} 
                    to={`/activities/${activity.id}`}
                    color='teal' 
                    floated='right'
                    content='View' />
            </Segment>
        </Segment.Group>
    )
    
}