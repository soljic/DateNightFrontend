import { observer } from 'mobx-react-lite';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { Button, Form, Segment } from 'semantic-ui-react';
import LoadingComponents from '../../../app/layout/LoadingComponents';
import { useStore } from '../../../app/stores/store';
import {v4 as uuid} from 'uuid';
import { Formik } from 'formik';

function ActivityForm() {
    const {activityStore } = useStore();
    const {id} = useParams<{id: string}>();
    const {loadActivity } = activityStore;
    const history = useHistory();
    

    const [activity,setActivity] = useState({
        name: "",
        surname: "",
        birth: "2021-05-03",
        death: "2021-05-03",
        description: "",
        graveyard: 0
    });
   
   /* useEffect(() => {
     if(id)  activityStore.loadActivity(id).then(activity => setActivity(activity!));
     //eslint-disable-next-line react-hooks/exhaustive-deps
    },[id,loadActivity]); */


  /*  function handleSubmit(){
       if(activity.id.length === 0 ) {
           let newItem = {
               ...activity,
               id: uuid()
           };
           activityStore.createActivity(newItem).then(() => history.push(`/activities/${newItem.id}`))
       } else{
        activityStore.updateActivity(activity).then(() => history.push(`/activities/${activity.id}`))
       }
    } 

    function handleChange(event:ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const{name, value} = event.target;
        setActivity({...activity, [name] : value});
    }    */

//if(activityStore.loadingInitial) return <LoadingComponents content="Loading content..."/>

    return (
      <>
        <h1>Create Spiritus:</h1>
        
        <Segment clearing>
            <Formik initialValues={activity} onSubmit={values => console.log(values)}>
                {({values: activity, handleChange,handleSubmit}) =>{
                     <Form onSubmit={handleSubmit} autoComplete='off' >
                     <Form.Input  placeholder="Title"  value={activity.name} name='title' onChange={handleChange}  />
                     <Form.TextArea placeholder="Description" onChange={handleChange}  value={activity.description} name='description'/>
                     <Form.Input placeholder="Surname" onChange={handleChange}  value={activity.surname} name='category'/>
                     <Form.Input  type="Birth" placeholder="Date" onChange={handleChange}  value={activity.birth} name='date'/>
                     <Form.Input placeholder="Death" onChange={handleChange}  value={activity.death} name='city'/>
                     <Form.Input placeholder="Graveyard" onChange={handleChange}  value={activity.graveyard} name='venue'/>
                     <Button  floated="right" positive type='submit' content='Submit'  />
                     <Button as={Link} to='/activities' floated="right"  type='button' content='Cancel' />
                 </Form>
                }}
            </Formik>
           
        </Segment>
        </>
    )
}

export default observer(ActivityForm)
