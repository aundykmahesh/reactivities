import { format } from "date-fns";
import { makeAutoObservable } from "mobx";
import { Activity } from '../../models/activity';
import agent from "../api/agent";

export default class ActivityStore {
    submitting = false;
    //activities: Activity[] = [];
    activityRegistry = new Map <string, Activity>();
    loading = false;
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
               // (a, b) => Date.parse(a.date) - Date.parse(b.date));
               (a, b) => a.date!.getTime() - b.date!.getTime());
    }

    //group by date
    //using javascript reduce function
    get groupedActivities(){
        return Object.entries(
            this.activitiesByDate.reduce((activities, activity) => {
                const date = format(activity.date!, 'dd MMM yyyy');
                activities[date] = activities[date] ? [...activities[date], activity] : [activity];
                return activities;
            }, {} as {[key:string] : Activity[]})
        )
    }

    setSubmittingStatus = (status: boolean) => {
        this.submitting = status;
    }
    


    setEditMode = (mode: boolean) => { this.editMode = mode; }
    setLoading = (status: boolean) => { this.loading = status; }

    deleteActivity = async (id: string) => {
        this.setSubmittingStatus(true);
        try {
            await agent.Activities.delete(id);
            //this.setactivities([...this.activities.filter(x => x.id !== id)]);
            this.activityRegistry.delete(id);
            //if(this.selectedActivity?.id === id) this.cancelSelectedActivity();
            
            this.setSubmittingStatus(false);
        } catch (error) {
            console.log(error);
            this.setSubmittingStatus(false);
        }
    }

    loadActivities = async () => {
        this.setLoading(true);
        try {
            await agent.Activities.list().then(response => {
                //let activty: Activity[] = [];

                response.forEach(element => {
                   this.setActivity(element);
                });
                //this.setactivities(activty);
                this.setLoading(false);

            });
        } catch (error) {
            console.log(error);
            this.setLoading(false);
        }
    }

    loadActivity = async (id:string) => {
        try {
            let activity = this.getActivity(id);
            if (activity) {
                this.setSelectedActivity(activity);
                return activity;
            } else {
                this.setLoading(true);

                let element  = await agent.Activities.details(id);

                this.setActivity(element);
                this.setSelectedActivity(element);

                this.setLoading(false);
                return element;
            }
        } catch (error) {
            console.log(error);
            this.setLoading(false);
        }
    }

     setActivity = (element : Activity) => {
        //element.date = element.date.split('T')[0];
        element.date = new Date(element.date!);
        //activty.push(element);
        this.activityRegistry.set(element.id, element);
    }

    private getActivity = (id: string) => {
        return this.activityRegistry.get(id);
    }

    private setSelectedActivity = (activity: Activity | undefined)=>{
        this.selectedActivity = activity;
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
                //activity.id = uuid();
                await agent.Activities.create(activity).then(() => {
                    //this.setactivities([...this.activities, activity])
                    this.activityRegistry.set(activity.id,activity);
                });
            }
        } catch (error) {
            console.log(error)
        }       
        this.setEditMode(false);
        // this.selectActivity(activity.id);
        this.setSubmittingStatus(false);
    }

}