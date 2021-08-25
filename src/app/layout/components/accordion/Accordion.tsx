import React, {useState} from "react";
import Collapsible from 'react-collapsible';

import "./Accordion.scss";
import ArrowUp from "../arrows/ArrowUp";
import ArrowDown from "../arrows/ArrowDown";
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
  const AccordionHeading = () => {
    return(<div className="accordionHeading">
      <div
          onClick={() => toggle(key)}
          key={key}
          className="accordionContainer"
      >
        <p>{title}</p>
        <span>{clicked === key ? <ArrowUp /> : <ArrowDown />}</span>
      </div>
    </div>)
  }

  return (
    <div className="accordion">
          <Collapsible  easing={'0.4s cubic-bezier(0.28,0,0.49,1) '} trigger={<AccordionHeading />}>
            <div className="accordionContent">
              <p className="firstText">{text1} </p>
              <p className="secondText">{text2} </p>
            </div>
          </Collapsible>
    </div>
  );
}

export default Accordion;
