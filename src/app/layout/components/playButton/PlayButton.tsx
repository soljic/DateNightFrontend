import React, { useState, MouseEvent } from "react";
import { observer } from "mobx-react-lite";
import { useStore } from "../../../stores/store";
import { Button } from "antd";
import AButton from "../../../layout/img/PlayCircle.svg";

import "./PlayButton.scss"
import ResponsivePlayer from "../responsivePlayer/ResponsivePlayer";

function PlayButton() {

    const { activityStore } = useStore();
    const { isPlay, setIsPlayed } = activityStore;
  
    return (
        <Button
        onClick={() => {
            setIsPlayed(!isPlay);          
        }}
        className="button-link-playVideo"
        type="link"
      >
      <img src={AButton} alt="ArrowImage" />
      Play video
      </Button>
          );
}

export default observer(PlayButton)
