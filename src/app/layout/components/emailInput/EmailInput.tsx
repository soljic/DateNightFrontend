import React, { useState, useRef, SyntheticEvent } from "react";
import { useForm } from "react-hook-form";
import "./EmailInput.css";
import "bootstrap/dist/css/bootstrap.min.css";
import ArrowButton from "../../img/ArrowButton.svg";
import { ImageGroup } from "semantic-ui-react";

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

  const [isLoading, setLoading] = useState<boolean>(false);
  const [isSent, setSending] = useState<boolean>(false);

  setTimeout(() => setSending(false), 10000);
  const onSubmit = (data: EmailScore, e: any) => {
    e.preventDefault();
    console.log(data);
    setSending(true);
   /* setTimeout(() => setSending(false), 3000);*/
    reset();
  };

  return isSent ? (
      <>
    <div className="emailSuccess"> ✓ Great, we’ll be in touch! </div>
    <div className="beFirst"> <p> Be the first to know when we are ready to beta-test our new Android app (iOS coming later).</p></div>
    </>
  ) : (
    <form className="d-flex flex-column justify-content-center align-items-center"  onSubmit={handleSubmit(onSubmit)}>
      <div className="emailComp">
        <input
          className="emailInput"
          placeholder="Your email address"
          disabled={isLoading}
          type="text"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
              message: "Please enter a valid email.",
            },
          })}
        />
        <button className="emailSubmit" disabled={isLoading} type="submit">
          {isLoading ? "Loading" : <img src={ArrowButton} alt="ArrowImage" />}
        </button>
      </div>
      <div className="beFirst"> <p> Be the first to know when we are ready to beta-test our new Android app (iOS coming later).</p></div>
      {errors?.email && <div>{errors.email.message}</div>}
    </form>
  );
}

export default EmailInput;
