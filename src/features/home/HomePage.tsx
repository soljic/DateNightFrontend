import React, { useEffect, useState } from 'react';
import NavBar from "../../app/layout/components/navBar/NavBar";
import { useStore } from '../../app/stores/store';
import "./HomePage.css";
import { Button } from "antd";
import { Link } from "react-router-dom";
import SpiritusCarousel from "../../app/layout/components/spiritusCarousel/SpiritusCarousel";
import { SpiritusResponse } from '../../app/models/SpirirtusResponse';


function HomePage() {
  const {activityStore} = useStore();
  const {loadPopularSpiritus} = activityStore;
  const [popularSpiritus,setPopular] =  useState<SpiritusResponse[] | undefined>(undefined);


useEffect(() => {
 const getPopular =  loadPopularSpiritus().then(response => {
   const popular: SpiritusResponse[] | undefined  = response;
   setPopular(popular);
   // eslint-disable-next-line
 });
}, [])

console.log(popularSpiritus);

  return (
    <>
      <NavBar />
      <div className="container"> 
        <main className="col-item">
            <div className="header-text">
                <h1>Kep memories of your loved ones, forever</h1>
                <h3>Spiritus is platform for creating and storing <br/> digital memorials in a storytelling way.</h3>
               
            </div>
           
        </main>
        <div className="col-item"> <Button className="button-link button-yellow" type="link">Get early acces</Button></div>
      </div>
      <SpiritusCarousel popularSpiritus={popularSpiritus}/>
      <div className="text-container" ></div>
     
    </>
  );
}

export default HomePage;
