import { PlusCircleIcon, ChevronLeftIcon } from "@heroicons/react/solid";
import { useState } from "react";
import Layout from "../../components/layout/Layout";

export default function CreateSpiritusPage() {
  const numSteps = 5;
  const [step, setStep] = useState(1);

  const nextStep = () => {
    if (step < numSteps) {
      setStep(step + 1);
    }
  };

  const prevStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  return (
    <Layout>
      <div className="py-5 h-screen">
        <div className="flex flex-row justify-between mx-auto lg:w-4/5">
          <button
            onClick={() => prevStep()}
            className="inline-flex pr-3 py-1 gap-1 text-white border rounded-3xl"
          >
            <ChevronLeftIcon className="h-6 w-6" />
            Back
          </button>
          <div className="inline-flex px-3 py-1 bg-sp-fawn bg-opacity-5 text-sp-white rounded-3xl border border-opacity-20 border-sp-lighter">
            Step {`${step}/${numSteps}`}
          </div>
        </div>
        <div className="container mx-auto lg:px-12 lg:w-4/5">
          {/* <Steps /> */}
          <div id="stepper-form">
            {step === 1 && <Step1 />}
            {step === 2 && <Step2 name="Ralph" />}
            {step === 3 && <Step3 name="Ralph" />}
            {step === 4 && <Step4 name="Ralph" />}
            {step === 5 && <Step5 name="Ralph" />}
          </div>

          <div className="flex justify-center mt-8">
            {step !== 5 ? (
              <button
                onClick={() => nextStep()}
                className="px-4 py-3 rounded-full w-52 font-semibold bg-gradient-to-r from-sp-dark-fawn to-sp-fawn border-5 border-sp-medium border-opacity-80 text-sp-dark"
              >
                Next
              </button>
            ) : (
              <button
                onClick={() => nextStep()}
                className="px-4 py-3 rounded-full w-52 font-semibold bg-gradient-to-r from-sp-dark-fawn to-sp-fawn border-5 border-sp-medium border-opacity-80 text-sp-dark"
              >
                Create
              </button>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}

function Step1() {
  return (
    <div className="mt-12 mx-2 lg:mx-12">
      <div className="flex justify-center items-center rounded-xl bg-sp-fawn bg-opacity-20 h-12 w-12 mb-6">
        <AddSpiritusIcon fill />
      </div>
      <p className="font-bold text-sp-white text-2xl">
        Enter first and last name for Spiritus.
      </p>
      <div className="mt-4">
        <div className="flex flex-col md:flex-row gap-2">
          <div className="w-full flex-1">
            <div className="my-2 rounded">
              <input
                placeholder="Enter First Name"
                className="p-3 bg-sp-dark border-2 border-sp-medium appearance-none outline-none w-full rounded text-sp-white"
              />
            </div>
          </div>
          <div className="w-full flex-1">
            <div className="my-2 rounded">
              <input
                placeholder="Enter Last Name"
                className="p-3 bg-sp-dark border-2 border-sp-medium appearance-none outline-none w-full rounded text-sp-white"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Step2({ name }) {
  return (
    <div className="mt-12 mx-2 lg:mx-12">
      <div className="flex justify-center items-center rounded-xl bg-sp-fawn bg-opacity-20 h-12 w-12 mb-6">
        <AddRangeIcon fill />
      </div>
      <p className="font-bold text-sp-white text-2xl">
        When was <span> {name} </span> born, and when did he/she died?
      </p>
      <div className="mt-4">
        <div className="flex flex-col md:flex-row gap-2">
          <div className="w-full flex-1">
            <div className="my-2 rounded">
              <input
                placeholder="Birth date"
                className="p-3 bg-sp-dark border-2 border-sp-medium appearance-none outline-none w-full rounded text-sp-white"
              />
            </div>
          </div>
          <div className="w-full flex-1">
            <div className="my-2 rounded">
              <input
                placeholder="Date of passing"
                className="p-3 bg-sp-dark border-2 border-sp-medium appearance-none outline-none w-full rounded text-sp-white"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Image uploader
function Step3({ name }) {
  return (
    <div className="mt-12 mx-2 lg:mx-12">
      <div className="flex justify-center items-center rounded-xl bg-sp-fawn bg-opacity-20 h-12 w-12 mb-6">
        <AddImageIcon fill />
      </div>
      <p className="font-bold text-sp-white text-2xl">
        Does<span> {name} </span> have any images from his/her life? If yes,
        please add them here.
      </p>
      <p className="text-sp-lighter text-sm mt-2">*Optional</p>
      <button className="inline-flex bg-sp-white rounded-3xl py-2 px-6 text-sp-dark mt-3">
        <PlusCircleIcon className="h-6 w-6" />
        <span className="font-semibold ml-1">Add Image</span>
      </button>
    </div>
  );
}

function Step4({ name }) {
  return (
    <div className="mt-12 mx-2 lg:mx-12">
      <div className="flex justify-center items-center rounded-xl bg-sp-fawn bg-opacity-20 h-12 w-12 mb-6">
        <AddCommentIcon fill />
      </div>
      <p className="font-bold text-sp-white text-2xl">
        Does<span> {name} </span>have any sentence which he/she always said? If
        yes, please add it here.
      </p>
      <div className="mt-4">
        <div className="flex flex-col md:flex-row">
          <div className="w-full flex-1">
            <div className="my-2 rounded">
              <textarea
                placeholder="Enter sentence"
                rows="3"
                className="p-3 bg-sp-dark border-2 border-sp-medium appearance-none outline-none w-full rounded text-sp-white"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Step5({ name }) {
  return (
    <div className="mt-12 mx-2 lg:mx-12">
      <div className="flex justify-center items-center rounded-xl bg-sp-fawn bg-opacity-20 h-12 w-12 mb-6">
        <AddLocationIcon fill />
      </div>
      <p className="font-bold text-sp-white text-2xl">
        <span> {name} </span>must associate you to a one place. Please select
        that place.
      </p>
      <p className="text-sp-lighter text-sm">
        It can be place of birth, death, or the place where he/she lived the
        longest.
      </p>
      <div className="mt-4">
        <div className="flex flex-col md:flex-row">
          <div className="w-full flex-1">
            <div className="my-2 rounded">
              <input
                placeholder="Search place..."
                className="p-3 bg-sp-dark border-2 border-sp-medium appearance-none outline-none w-full rounded text-sp-white"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Bar({ fill }) {
  return (
    <div
      className={`flex-auto border-t-2 transition duration-500 ease-in-out ${
        fill ? "border-sp-fawn" : "border-gray-300"
      }`}
    ></div>
  );
}

function Steps() {
  return (
    <div className="lg:mx-12">
      <div className="flex items-center">
        <div className="flex items-center text-teal-600 relative">
          <div className="flex justify-center items-center rounded-full transition duration-500 ease-in-out h-12 w-12">
            <AddSpiritusIcon fill />
          </div>
        </div>
        <Bar fill={true} />
        <div className="flex items-center text-white relative">
          <div className="flex justify-center items-center rounded-full transition duration-500 ease-in-out h-12 w-12">
            <AddRangeIcon fill />
          </div>
        </div>
        <Bar fill={false} />
        <div className="flex items-center text-gray-500 relative">
          <div className="flex justify-center items-center rounded-full transition duration-500 ease-in-out h-12 w-12">
            <AddImageIcon />
          </div>
        </div>
        <Bar fill={false} />
        <div className="flex items-center text-gray-500 relative">
          <div className="flex justify-center items-center rounded-full transition duration-500 ease-in-out h-12 w-12 ">
            <AddCommentIcon />
          </div>
        </div>
        <Bar fill={false} />
        <div className="flex items-center text-gray-500 relative">
          <div className="flex justify-center items-center rounded-full transition duration-500 ease-in-out h-12 w-12">
            <AddLocationIcon />
          </div>
        </div>
      </div>
    </div>
  );
}

function AddSpiritusIcon({ width, height, fill }) {
  const w = width ? `w-${width}` : `w-6`;
  const h = height ? `h-${height}` : `h-6`;

  return (
    <svg
      className={`${w} ${h}`}
      viewBox="0 0 21 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M15.5004 10.0003C18.5379 10.0003 21.0004 12.4627 21.0004 15.5003C21.0004 18.5378 18.5379 21.0003 15.5004 21.0003C12.4628 21.0003 10.0004 18.5378 10.0004 15.5003C10.0004 12.4627 12.4628 10.0003 15.5004 10.0003ZM10.0226 11.9996C9.72593 12.4629 9.48639 12.9663 9.31398 13.4999L2.25278 13.5002C1.83919 13.5002 1.50391 13.8355 1.50391 14.2491L1.50391 14.8267C1.50391 15.3624 1.69502 15.8805 2.04287 16.2878C3.29618 17.7555 5.26206 18.5013 8.00036 18.5013C8.5968 18.5013 9.15667 18.4659 9.6806 18.3954C9.92579 18.8903 10.2333 19.3489 10.5921 19.7618C9.79661 19.922 8.93173 20.0013 8.00036 20.0013C4.8545 20.0013 2.46849 19.0962 0.902186 17.2619C0.322425 16.583 0.00390625 15.7195 0.00390625 14.8267L0.00390625 14.2491C0.00390625 13.007 1.01076 12.0002 2.25278 12.0002L10.0226 11.9996ZM15.5004 12.0002L15.4105 12.0083C15.2064 12.0453 15.0455 12.2063 15.0084 12.4104L15.0004 12.5002L14.9994 15.0003H12.5043L12.4144 15.0083C12.2103 15.0454 12.0494 15.2063 12.0123 15.4104L12.0043 15.5003L12.0123 15.5901C12.0494 15.7942 12.2103 15.9552 12.4144 15.9922L12.5043 16.0003H14.9994L15.0004 18.5002L15.0084 18.5901C15.0455 18.7942 15.2064 18.9551 15.4105 18.9922L15.5004 19.0002L15.5902 18.9922C15.7943 18.9551 15.9553 18.7942 15.9923 18.5901L16.0004 18.5002L15.9994 16.0003L18.5043 16.0003L18.5941 15.9922C18.7982 15.9552 18.9592 15.7942 18.9962 15.5901L19.0043 15.5003L18.9962 15.4104C18.9592 15.2063 18.7982 15.0454 18.5941 15.0083L18.5043 15.0003L15.9994 15.0003L16.0004 12.5002L15.9923 12.4104C15.9553 12.2063 15.7943 12.0453 15.5902 12.0083L15.5004 12.0002ZM8.00036 0.00488281C10.7618 0.00488281 13.0004 2.24346 13.0004 5.00488C13.0004 7.76631 10.7618 10.0049 8.00036 10.0049C5.23894 10.0049 3.00036 7.76631 3.00036 5.00488C3.00036 2.24346 5.23894 0.00488281 8.00036 0.00488281ZM8.00036 1.50488C6.06737 1.50488 4.50036 3.07189 4.50036 5.00488C4.50036 6.93788 6.06737 8.50488 8.00036 8.50488C9.93336 8.50488 11.5004 6.93788 11.5004 5.00488C11.5004 3.07189 9.93336 1.50488 8.00036 1.50488Z"
        fill={`${fill ? "#E3AA6D" : "#F0EFED"}`}
      />
    </svg>
  );
}

function AddRangeIcon({ width, height, fill }) {
  const w = width ? `w-${width}` : `w-6`;
  const h = height ? `h-${height}` : `h-6`;
  return (
    <svg
      className={`${w} ${h}`}
      viewBox="0 0 21 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M13.7509 11.9972C14.7314 11.9972 15.5654 12.6248 15.8731 13.5002H13.8176C13.7956 13.4982 13.7734 13.4972 13.7509 13.4972L2.24912 13.4972C1.83553 13.4972 1.50024 13.8325 1.50024 14.2461L1.50024 14.8238C1.50024 15.3595 1.69135 15.8776 2.03921 16.2849C3.29252 17.7526 5.2584 18.4984 7.9967 18.4984C8.05287 18.4984 8.10871 18.4981 8.16423 18.4975C8.24986 18.6809 8.36747 18.8499 8.5135 18.9957L9.44804 19.9288C8.98384 19.9752 8.49998 19.9984 7.9967 19.9984C4.85084 19.9984 2.46483 19.0932 0.898524 17.259C0.318763 16.5801 0.000244141 15.7166 0.000244141 14.8238L0.000244141 14.2461C0.000244141 13.0041 1.0071 11.9972 2.24912 11.9972L13.7509 11.9972ZM7.9967 0.00195312C10.7581 0.00195312 12.9967 2.24053 12.9967 5.00195C12.9967 7.76338 10.7581 10.002 7.9967 10.002C5.23528 10.002 2.9967 7.76338 2.9967 5.00195C2.9967 2.24053 5.23528 0.00195312 7.9967 0.00195312ZM7.9967 1.50195C6.06371 1.50195 4.4967 3.06896 4.4967 5.00195C4.4967 6.93495 6.06371 8.50195 7.9967 8.50195C9.9297 8.50195 11.4967 6.93495 11.4967 5.00195C11.4967 3.06896 9.9297 1.50195 7.9967 1.50195ZM12.7804 15.7835C13.0733 15.4906 13.0732 15.0157 12.7802 14.7229C12.4873 14.4301 12.0124 14.4302 11.7196 14.7231L9.21955 17.2242C9.07893 17.3649 8.99996 17.5557 9 17.7546C9.00004 17.9535 9.0791 18.1442 9.21978 18.2849L11.7198 20.7838C12.0127 21.0766 12.4876 21.0765 12.7804 20.7835C13.0733 20.4906 13.0732 20.0157 12.7802 19.7229L11.5601 18.5033H18.4401L17.2198 19.7228C16.9269 20.0156 16.9267 20.4905 17.2195 20.7835C17.5123 21.0765 17.9872 21.0766 18.2802 20.7838L20.7802 18.2854C20.9209 18.1448 20.9999 17.9541 21 17.7552C21.0001 17.5563 20.9211 17.3655 20.7805 17.2248L18.2805 14.7232C17.9877 14.4302 17.5128 14.43 17.2198 14.7228C16.9269 15.0156 16.9267 15.4905 17.2195 15.7835L18.4386 17.0033H11.5612L12.7804 15.7835Z"
        fill={`${fill ? "#E3AA6D" : "#F0EFED"}`}
      />
    </svg>
  );
}

function AddImageIcon({ width, height, fill }) {
  const w = width ? `w-${width}` : `w-6`;
  const h = height ? `h-${height}` : `h-6`;

  return (
    <svg
      className={`${w} ${h}`}
      viewBox="0 0 21 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M17.75 3C19.5449 3 21 4.45507 21 6.25L21 17.75C21 19.5449 19.5449 21 17.75 21L6.25 21C4.45507 21 3 19.5449 3 17.75L3 11.5019C3.47425 11.6996 3.97687 11.8428 4.50009 11.9236L4.5 17.75C4.5 17.9584 4.53643 18.1583 4.60326 18.3437L10.4258 12.643C11.2589 11.8273 12.5675 11.7885 13.4458 12.5266L13.5742 12.6431L19.3964 18.3447C19.4634 18.159 19.5 17.9588 19.5 17.75L19.5 6.25C19.5 5.2835 18.7165 4.5 17.75 4.5L11.9236 4.50009C11.8428 3.97687 11.6996 3.47425 11.5019 3L17.75 3ZM11.5588 13.644L11.4752 13.7148L5.66845 19.4011C5.8504 19.4651 6.04613 19.5 6.25 19.5L17.75 19.5C17.9535 19.5 18.1489 19.4653 18.3305 19.4014L12.5247 13.7148C12.2596 13.4553 11.8501 13.4316 11.5588 13.644ZM15.2521 6.5C16.4959 6.5 17.5042 7.50831 17.5042 8.75212C17.5042 9.99592 16.4959 11.0042 15.2521 11.0042C14.0083 11.0042 13 9.99592 13 8.75212C13 7.50831 14.0083 6.5 15.2521 6.5ZM5.5 0C8.53757 0 11 2.46243 11 5.5C11 8.53757 8.53757 11 5.5 11C2.46243 11 0 8.53757 0 5.5C0 2.46243 2.46243 0 5.5 0ZM15.2521 8C14.8367 8 14.5 8.33673 14.5 8.75212C14.5 9.1675 14.8367 9.50423 15.2521 9.50423C15.6675 9.50423 16.0042 9.1675 16.0042 8.75212C16.0042 8.33673 15.6675 8 15.2521 8ZM5.5 1.99923L5.41012 2.00729C5.20603 2.04433 5.0451 2.20527 5.00806 2.40936L5 2.49923L4.99965 4.99923L2.49765 5L2.40777 5.00806C2.20368 5.0451 2.04275 5.20603 2.00571 5.41012L1.99765 5.5L2.00571 5.58988C2.04275 5.79397 2.20368 5.9549 2.40777 5.99194L2.49765 6L5.00065 5.99923L5.00111 8.50348L5.00916 8.59336C5.04621 8.79745 5.20714 8.95839 5.41123 8.99543L5.50111 9.00348L5.59098 8.99543C5.79508 8.95839 5.95601 8.79745 5.99305 8.59336L6.00111 8.50348L6.00065 5.99923L8.50457 6L8.59444 5.99194C8.79853 5.9549 8.95947 5.79397 8.99651 5.58988L9.00457 5.5L8.99651 5.41012C8.95947 5.20603 8.79853 5.0451 8.59444 5.00806L8.50457 5L5.99965 4.99923L6 2.49923L5.99194 2.40936C5.9549 2.20527 5.79397 2.04433 5.58988 2.00729L5.5 1.99923Z"
        fill={`${fill ? "#E3AA6D" : "#F0EFED"}`}
      />
    </svg>
  );
}

function AddCommentIcon({ width, height, fill }) {
  const w = width ? `w-${width}` : `w-6`;
  const h = height ? `h-${height}` : `h-6`;

  return (
    <svg
      className={`${w} ${h}`}
      viewBox="0 0 20 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10 0C15.5228 0 20 4.47715 20 10C20 15.5228 15.5228 20 10 20C8.38171 20 6.81782 19.6146 5.41286 18.888L1.58704 19.9553C0.922123 20.141 0.232581 19.7525 0.0469058 19.0876C-0.0145358 18.8676 -0.014506 18.6349 0.046948 18.4151L1.11461 14.5922C0.386366 13.186 0 11.6203 0 10C0 4.47715 4.47715 0 10 0ZM10 1.5C5.30558 1.5 1.5 5.30558 1.5 10C1.5 11.4696 1.87277 12.8834 2.57303 14.1375L2.72368 14.4072L1.61096 18.3914L5.59755 17.2792L5.86709 17.4295C7.12006 18.1281 8.53218 18.5 10 18.5C14.6944 18.5 18.5 14.6944 18.5 10C18.5 5.30558 14.6944 1.5 10 1.5ZM6.75 11H11.2483C11.6625 11 11.9983 11.3358 11.9983 11.75C11.9983 12.1297 11.7161 12.4435 11.35 12.4932L11.2483 12.5H6.75C6.33579 12.5 6 12.1642 6 11.75C6 11.3703 6.28215 11.0565 6.64823 11.0068L6.75 11H11.2483H6.75ZM6.75 7.5L13.2545 7.5C13.6687 7.5 14.0045 7.83579 14.0045 8.25C14.0045 8.6297 13.7223 8.94349 13.3563 8.99315L13.2545 9H6.75C6.33579 9 6 8.66421 6 8.25C6 7.8703 6.28215 7.55651 6.64823 7.50685L6.75 7.5L13.2545 7.5L6.75 7.5Z"
        fill={`${fill ? "#E3AA6D" : "#F0EFED"}`}
      />
    </svg>
  );
}

function AddLocationIcon({ width, height, fill }) {
  const w = width ? `w-${width}` : `w-6`;
  const h = height ? `h-${height}` : `h-6`;
  return (
    <svg
      className={`${w} ${h}`}
      viewBox="0 0 21 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9.9999 19.5999C10.8265 19.5999 11.6287 19.4954 12.394 19.299C11.9593 18.8094 11.5836 18.3126 11.2753 17.8081C10.8456 18.2102 10.4078 18.3999 9.9999 18.3999C9.21169 18.3999 8.31178 17.6916 7.57376 16.1101C7.31278 15.5509 7.08597 14.9082 6.90314 14.1999H10.3152C10.3447 13.7872 10.4164 13.3856 10.5262 12.9999H6.6473C6.48804 12.0702 6.3999 11.0599 6.3999 9.9999C6.3999 8.93993 6.48804 7.92957 6.6473 6.9999L13.3525 6.9999C13.4786 7.73593 13.5601 8.52252 13.5886 9.34428C13.962 9.16581 14.3581 9.02747 14.7717 8.93491C14.7361 8.26791 14.6674 7.62031 14.5687 6.9999H17.8483C18.1282 7.73172 18.3087 8.5127 18.3733 9.32632C18.8159 9.53379 19.2274 9.79744 19.5993 10.108C19.5997 10.072 19.5999 10.036 19.5999 9.9999C19.5999 4.69797 15.3018 0.399902 9.9999 0.399902C4.69797 0.399902 0.399902 4.69797 0.399902 9.9999C0.399902 15.3018 4.69797 19.5999 9.9999 19.5999ZM9.9999 1.5999C10.7881 1.5999 11.688 2.3082 12.426 3.88967C12.687 4.44893 12.9138 5.09164 13.0967 5.7999L6.90314 5.7999C7.08597 5.09164 7.31278 4.44893 7.57376 3.88967C8.31178 2.3082 9.21169 1.5999 9.9999 1.5999ZM6.48634 3.38221C6.15467 4.09294 5.87788 4.90825 5.66708 5.7999L2.72367 5.7999C3.72744 4.06469 5.33409 2.72187 7.2572 2.05786C6.96746 2.45456 6.70984 2.9033 6.48634 3.38221ZM5.43108 6.9999C5.28058 7.94589 5.1999 8.95511 5.1999 9.9999C5.1999 11.0447 5.28058 12.0539 5.43108 12.9999H2.15146C1.79512 12.0682 1.5999 11.0569 1.5999 9.9999C1.5999 8.94295 1.79512 7.93158 2.15146 6.9999L5.43108 6.9999ZM5.66708 14.1999C5.87788 15.0916 6.15467 15.9069 6.48634 16.6176C6.70984 17.0965 6.96746 17.5452 7.2572 17.9419C5.33409 17.2779 3.72744 15.9351 2.72367 14.1999H5.66708ZM12.7426 2.05786C14.6657 2.72187 16.2724 4.06469 17.2761 5.7999H14.3327C14.1219 4.90825 13.8451 4.09294 13.5135 3.38221C13.29 2.9033 13.0323 2.45456 12.7426 2.05786ZM15.9999 9.9999C18.4852 9.9999 20.4999 12.0722 20.4999 14.6285C20.4999 16.5443 19.0801 18.5523 16.2999 20.697C16.1221 20.8342 15.8777 20.8342 15.6999 20.697C12.9197 18.5523 11.4999 16.5443 11.4999 14.6285C11.4999 12.0722 13.5146 9.9999 15.9999 9.9999ZM15.9999 13.0856C15.1715 13.0856 14.4999 13.7764 14.4999 14.6285C14.4999 15.4806 15.1715 16.1713 15.9999 16.1713C16.8283 16.1713 17.4999 15.4806 17.4999 14.6285C17.4999 13.7764 16.8283 13.0856 15.9999 13.0856Z"
        fill={`${fill ? "#E3AA6D" : "#F0EFED"}`}
      />
    </svg>
  );
}
