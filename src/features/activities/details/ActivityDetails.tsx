import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react'
import { useParams } from 'react-router';
import { Grid } from 'semantic-ui-react';
import LoadingComponents from '../../../app/layout/LoadingComponents';
import { useStore } from '../../../app/stores/store';
import SpiritusDetailedChat from './SpiritusDetailedChat';
import SpiritusDetailedHeader from './SpiritusDetailedHeader';
import SpiritusDetailedInfo from './SpiritusDetailedInfo';
import SpiritusDetailedSideBar from './SpiritusDetailedSideBar';



function ActivityDetails() {
    const {activityStore} = useStore();
    const{selectedActivity: activity, loadActivity, loadingInitial} = activityStore;
    const {id} = useParams<{id: string}>();

    useEffect(() => {
        if (id) loadActivity(id);
    },[id, loadActivity]);

    if(loadingInitial || !activity) return <LoadingComponents/>;
    return (
       <Grid>
           <Grid.Column width={10}>
               <SpiritusDetailedHeader activity={activity} />
               <SpiritusDetailedInfo activity={activity}/>
               <SpiritusDetailedChat/>
            </Grid.Column>
            <Grid.Column width={6}>
               <SpiritusDetailedSideBar/>
            </Grid.Column>
       </Grid>
    )
}

export default observer(ActivityDetails)
