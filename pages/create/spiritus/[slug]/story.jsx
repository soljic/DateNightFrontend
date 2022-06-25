import { PlusCircleIcon, ChevronLeftIcon } from "@heroicons/react/solid";
import { useState } from "react";
import Layout from "../../../../components/layout/Layout";

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
      </div>
    </Layout>
  );
}
