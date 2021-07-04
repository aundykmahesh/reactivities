import { makeAutoObservable } from "mobx";
import { Activity } from '../../models/activity';
import agent from "../api/agent";
import { v4 as uuid } from 'uuid';

export default class ActivityStore {
    submitting = false;
    //activities: Activity[] = [];
    activityRegistry = new Map <string, Activity>();
    loading = true;
    editMode = false;
    selectedActivity: Activity | undefined = undefined;

    constructor() {
        makeAutoObservable(this)
    }
    //use arrow function to bind this to this class, so that we can use this.
    // setTitle = () => {
    //     this.title = this.title + '!';
    // }

    get activitiesByDate(){
        return Array.from(this.activityRegistry.values()).sort(
                (a, b) => Date.parse(a.date) - Date.parse(b.date));
    }

    setSubmittingStatus = (status: boolean) => {
        this.submitting = status;
    }

    // setactivities = (activity: Activity[]) => {
    //     this.activities = activity;
    // }

    setEditMode = (mode: boolean) => { this.editMode = mode; }
    setLoading = (status: boolean) => { this.loading = status; }

    deleteActivity = async (id: string) => {
        this.setSubmittingStatus(true);
        try {
            await agent.Activities.delete(id);
            //this.setactivities([...this.activities.filter(x => x.id !== id)]);
            this.activityRegistry.delete(id);
            if(this.selectedActivity?.id === id) this.cancelSelectedActivity();
            
            this.setSubmittingStatus(false);
        } catch (error) {
            console.log(error);
            this.setSubmittingStatus(false);
        }
    }

    loadActivities = async () => {
        try {
            await agent.Activities.list().then(response => {
                //let activty: Activity[] = [];

                response.forEach(element => {
                    element.date = element.date.split('T')[0];
                    //activty.push(element);
                    this.activityRegistry.set(element.id, element);
                });
                //this.setactivities(activty);
                this.setLoading(false);

            });
        } catch (error) {
            console.log(error);
            this.setLoading(false);
        }
    }

    selectActivity = (id: string) => {
        //this.selectedActivity = this.activities.find(x => x.id === id);
        this.selectedActivity = this.activityRegistry.get(id);
    }

    cancelSelectedActivity = () => {
        this.selectedActivity = undefined;
    }

    openForm = (id?: string) => {
        id ?
            this.selectActivity(id) :
            this.cancelSelectedActivity();
        this.setEditMode(true);
    }

    closeForm = () => {
        this.setEditMode(false);
    }

    //in the course runinaction method is used
    submitForm = async (activity: Activity) => {
        this.setSubmittingStatus(true);
        try {
            //update
            if (activity.id) {
                await agent.Activities.update(activity).then(() => {
                    //this.setactivities([...this.activities.filter(x => x.id !== activity.id), activity])
                    this.activityRegistry.set(activity.id,activity);
                });
            } else { //create
                activity.id = uuid();
                await agent.Activities.create(activity).then(() => {
                    //this.setactivities([...this.activities, activity])
                    this.activityRegistry.set(activity.id,activity);
                });
            }
        } catch (error) {
            console.log(error)
        }       
        this.setEditMode(false);
        this.selectActivity(activity.id);
        this.setSubmittingStatus(false);
    }

}