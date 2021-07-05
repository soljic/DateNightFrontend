import React, { useState } from "react";
import "./Accordion.css";
import ArrowUp from "../arrows/ArrowUp";
import ArrowDown from "../arrows/ArrowDown";
import { animated, Spring } from "react-spring";
import "bootstrap/dist/css/bootstrap.min.css";

interface Props {
  title: string | undefined;
  text1: string | undefined;
  text2: string | undefined;
  key: number;
}

function Accordion({ title, text1, text2, key }: Props) {
  const [clicked, setClicked] = useState<any>(false);

  const toggle = (index: any) => {
    if (clicked === index) {
      //if clicked question is already active, then close it
      return setClicked(null);
    }

    setClicked(index);
  };

  return (
    <div className="accordion">
      <div className="accordionHeading">
        <div
          onClick={() => toggle(key)}
          key={key}
          className="accordionContainer"
        >
          <p>{title}</p>
          <span>{clicked === key ? <ArrowUp /> : <ArrowDown />}</span>
        </div>
      </div>
      {clicked === key ? (
        <Spring
        from={{opacity: 0}}
        to={{opacity: 1}}
        config={{duration: 6000}}>
          {() => (
           
              <animated.div className="accordionContent">
                <p className="firstText">{text1} </p>
                <p className="secondText">{text2} </p>
              </animated.div>
            
          )}
        </Spring>
      ) : null}
    </div>
  );
}

export default Accordion;
