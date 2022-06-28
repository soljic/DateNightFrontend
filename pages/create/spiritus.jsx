import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

import { getISOLocalDate } from "@wojtekmaj/date-utils";

import Layout from "../../components/layout/Layout";
import { HorizontalDivider, Logo } from "../../components/layout/Common";
import { GraveIcon, GuardianIcon } from "../../components/Icons";
import { ProgressBar, Spinner } from "../../components/Status";
import {
  SpiritusDates,
  SpiritusDescription,
  SpiritusLocation,
  SpiritusName,
} from "../../components/forms/CreateSpiritus";
import { SpiritusImageUploader } from "../../components/Uploaders";

import { ProxyCreateSpiritus } from "../../service/http/proxy";

// TODO: sve stuff to local storage
// TODO: add err handling and error toasts
export default function CreateSpiritusPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    // redirect users that are not logged in
    // the API method requires authentication to create spiritus
    if (status !== "authenticated" && status !== "loading") {
      router.push("/");
    }
  }, [status]);

  // stepper is 0 indexed!
  const numSteps = 4;
  const [step, setStep] = useState(0);

  // form fields
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [birth, setBirth] = useState();
  const [death, setDeath] = useState();
  const [description, setDescription] = useState("");

  const [pending, setPending] = useState(false);
  const [spiritus, setSpiritus] = useState(false);

  const [location, setLocation] = useState("");

  const [images, setImages] = useState([]);

  const createSpiritus = async () => {
    try {
      setPending(true);
      const res = await ProxyCreateSpiritus(
        {
          name,
          surname,
          birth: getISOLocalDate(birth),
          death: getISOLocalDate(death),
          description,
          location: {}, // TODO: add location when BE is ready
        },
        session.user.accessToken
      );
      setSpiritus(res.data);
      setPending(false);
    } catch (err) {
      setPending(false);
    }
  };

  const nextStep = () => {
    if (step < numSteps) {
      setStep(step + 1);
    }
  };

  const prevStep = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  const showCurrentStep = () => {
    switch (step) {
      case 1:
        return (
          <SpiritusDates
            name={name}
            birth={birth}
            setBirth={setBirth}
            death={death}
            setDeath={setDeath}
          />
        );
      case 2:
        return (
          <SpiritusImageUploader
            name={name}
            images={images}
            setImages={setImages}
          />
        );
      case 3:
        return (
          <SpiritusDescription
            name={name}
            description={description}
            setDescription={setDescription}
          />
        );
      case 4:
        return (
          <SpiritusLocation
            name={name}
            location={location}
            setLocation={setLocation}
          />
        );
      default:
        return (
          <SpiritusName
            name={name}
            setName={setName}
            surname={surname}
            setSurname={setSurname}
          />
        );
    }
  };

  return (
    <Layout>
      <div className="py-5 h-screen ">
        {/* <p className="text-sp-white">
          {JSON.stringify({
            birth,
            death,
            name,
            surname,
            description,
            location,
          })}
        </p> */}
        <div className="container mx-auto lg:px-12 lg:w-4/5">
          {spiritus ? (
            <Success spiritus={spiritus} />
          ) : (
            <>
              <ProgressBar maxSteps={numSteps + 1} step={step + 1} />
              <form id="stepper-form" className="flex flex-1 flex-col">
                <div className="mb-10">{showCurrentStep()}</div>

                <div className="flex justify-center mt-8 gap-8">
                  {step > 0 && (
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        prevStep();
                      }}
                      className={`px-4 py-3 rounded-full w-52 font-semibold text-sp-white border-sp-lighter border-3 hover:bg-sp-white hover:text-sp-dark ${
                        pending && "hidden"
                      }`}
                      disabled={pending}
                    >
                      Back
                    </button>
                  )}
                  {step !== numSteps ? (
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        nextStep();
                      }}
                      disabled={!name || !surname}
                      className={`px-4 py-3 rounded-full w-52 font-semibold bg-gradient-to-r from-sp-dark-fawn to-sp-fawn border-5 border-sp-medium border-opacity-80 text-sp-dark ${
                        (name && surname) || "opacity-30"
                      }`}
                    >
                      Next
                    </button>
                  ) : (
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        createSpiritus();
                      }}
                      disabled={pending}
                      className="px-4 py-3 rounded-full w-52 font-semibold bg-gradient-to-r from-sp-dark-fawn to-sp-fawn border-5 border-sp-medium border-opacity-80 text-sp-dark"
                    >
                      {pending ? <Spinner text={"Creating..."} /> : "Create"}
                    </button>
                  )}
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </Layout>
  );
}

function Success({ spiritus }) {
  return (
    <div className="flex flex-col items-center my-4 gap-1 w-1/2 mx-auto sm:w-full md:w-1/2">
      <div className="bg-sp-fawn bg-opacity-25 rounded-xl p-2 mb-2">
        <Logo width={8} height={8} />
      </div>
      <h2 className="font-bold text-3xl text-sp-white">
        {" "}
        <span>
          {" "}
          {spiritus.name} {spiritus.surname} {spiritus.id}
        </span>
      </h2>
      {(spiritus.birth || spiritus.death) && (
        <p className="mt-1 text-sp-white text-center opacity-50 mb-5">
          <span>{spiritus.birth || "?"}</span> —{" "}
          <span>{spiritus.death || "?"}</span>
        </p>
      )}
      <HorizontalDivider />
      <div className="flex flex-col items-center gap-1 mt-5">
        <h2 className="font-bold text-3xl text-sp-white">Write first story</h2>
        <p className="mt-1 text-center text-sp-white opacity-50 mb-8 w-3/4 text">
          <span> {spiritus.name} </span> must have done many beautiful things.
          Save those memories forever.
        </p>
      </div>
      <Link href={`/create/story?spiritus=${spiritus.id}`}>
        <a className="text-center px-4 py-3 rounded-full w-52 font-semibold bg-gradient-to-r from-sp-dark-fawn to-sp-fawn border-5 border-sp-medium border-opacity-80 text-sp-dark">
          Create story
        </a>
      </Link>
      <div className="flex mx-auto items-center justify-center gap-4 mt-3 text-sp-white">
        <button className="flex flex-col items-center justify-center h-24 hover:bg-gradient-to-r hover:from-sp-dark-brown hover:to-sp-brown rounded-lg p-4">
          <GuardianIcon />
          <p className="font-semibold">Add Guardian</p>
        </button>
        <button className="flex flex-col items-center justify-center h-24 hover:bg-gradient-to-r hover:from-sp-dark-brown hover:to-sp-brown rounded-lg p-4">
          <GraveIcon />
          <p className="font-semibold">Resting Place</p>
        </button>
      </div>
    </div>
  );
}
