import React, { useState,useEffect, useRef, SyntheticEvent } from "react";
import { DeepMap, FormState, useForm, useFormState } from "react-hook-form";
import { observer } from "mobx-react-lite";
import { useStore } from "../../../stores/store";
import OutsideClickHandler from 'react-outside-click-handler';
import "./EmailInput.css";
import "bootstrap/dist/css/bootstrap.min.css";
import ArrowButton from "../../img/ArrowButton.svg";
import { ImageGroup } from "semantic-ui-react";
import emailjs from 'emailjs-com';

type EmailScore = {
  email: string;
};

function EmailInput() {  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EmailScore>();

  let error =  useForm<EmailScore>().formState.errors.email?.message;
  
  
  const { activityStore } = useStore();
  const { isClicked, setIsClicked } = activityStore;
  const [isLoading, setLoading] = useState<boolean>(false);
  const [isBlur, setBlur] = useState<boolean>(false);
  const [isSent, setSending] = useState<boolean>(false);
  const inputReff = useRef<HTMLInputElement | null>(null);;
  const { ref,onBlur, ...rest } = register("email",
  {
   required: "Email is required",
   pattern: {
     value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
     message: "Please enter a valid email.",
   },
 });
  
  useEffect(() => {
    isClicked && inputReff.current?.focus()
    setBlur(false);
    return () => {
    
    }
  }, [isClicked])

  setTimeout(() => setSending(false), 10000);
  const onSubmit = (data: EmailScore, e: any) => {
    e.preventDefault();
    emailjs.sendForm('service_zomflxh', 'template_k2ksm42', e.target, 'user_IiK5JT4yWOe2TqUtOFC3N')
    .then((result) => {
        console.log(result.text);
    }, (error) => {
        console.log(error.text);
    });
    setSending(true);
    reset();
  };

  return isSent ? (
      <>
    <div className="emailSuccess"> ✓ Great, we’ll be in touch! </div>
    <div className="beFirst"> <p> Be the first to know when we are ready to beta-test our new Android app (iOS coming later).</p></div>
    </>
  ) : (
    <OutsideClickHandler
    onOutsideClick={() => {
      setBlur(true);
    
    }}
  >
    <form autoComplete="off" className="d-flex flex-column justify-content-center align-items-center"  onSubmit={handleSubmit(onSubmit)}>
      <div className="emailComp">
        <input
          className="emailInput"
          placeholder="Your email address"
          disabled={isLoading}
          type="text"
          {...rest}
          ref={inputReff}
          onBlur={() => {
            setIsClicked(false);  
          }}
         
        />
        <button className="emailSubmit" disabled={isLoading} type="submit">
          {isLoading ? "Loading" : <img src={ArrowButton} alt="ArrowImage" />}
        </button>
      </div>
      {errors?.email  && <div className="errorMessage">{errors.email.message}</div> }
      <div className="beFirst"> <p> Be the first to know when we are ready to beta-test our new Android app (iOS coming later).</p></div>
      
    </form>
    </OutsideClickHandler>
  );
}

export default observer(EmailInput);
