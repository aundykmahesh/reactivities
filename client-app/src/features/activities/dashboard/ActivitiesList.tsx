import { observer } from "mobx-react-lite";
import React, { Fragment } from "react";
import { Header } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import ActivityListItem from "./ActivityListItem";


export default observer(function ActivityList() {

    const { activitystore } = useStore();

    const { groupedActivities } = activitystore;

    return (
        <>
            {groupedActivities.map(([activitydate, activities]) => (
                <Fragment key={activitydate}>
                    <Header sub color="teal">
                        {activitydate}
                    </Header>

                            {activities.map(activity => (
                                <ActivityListItem key={activity.id} activity={activity} />
                            ))}

                </Fragment>
            ))}
        </>

    )
})
