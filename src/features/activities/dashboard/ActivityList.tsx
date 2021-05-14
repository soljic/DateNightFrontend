import { observer } from 'mobx-react-lite';
import React, { Fragment } from 'react';
import {  Header } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';
import SpiritusListItem from './SpiritusListItem';


function ActivityList() {

    const {activityStore} = useStore();

    return (
        <>
       { activityStore.groupedActivities.map(([group, activities])=>(
           <Fragment key={group}>
               <Header sub color='teal'>
                   {group}
               </Header>
           {activities.map((item) =>(
                <SpiritusListItem key={item.id} activity={item} />
          ))}
           </Fragment>
       ))}
        </>

     
    )
}

export default observer(ActivityList)
