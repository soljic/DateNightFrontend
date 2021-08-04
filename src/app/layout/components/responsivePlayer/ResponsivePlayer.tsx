import React, { useState, MouseEvent } from "react";
import ReactPlayer from "react-player";
import "./ResponsivePlayer.scss";

const ResponsivePlayer =  () => {

      return (
        <div className='player-wrapper'>
          <ReactPlayer
            className='react-player'
            url='https://www.youtube.com/watch?v=udY43X_cRvw'
            width='100%'
            height='100%'
            controls= {true}
            playing= {true}
          />
        </div>
      )
      
  }

  export default ResponsivePlayer;