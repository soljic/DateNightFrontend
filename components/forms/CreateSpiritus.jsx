import DatePicker from "react-date-picker/dist/entry.nostyle";

import { CalendarIcon, XIcon } from "@heroicons/react/outline";

import { CommentIcon, LocationIcon, RangeIcon, SpiritusIcon } from "../Icons";

export function SpiritusName({ name, setName, surname, setSurname }) {
  return (
    <div className="mt-12 mx-2 lg:mx-12">
      <div className="flex justify-center items-center rounded-xl bg-sp-fawn bg-opacity-20 h-12 w-12 mb-6">
        <SpiritusIcon fill />
      </div>
      <p className="font-bold text-sp-white text-2xl">
        Enter first and last name for Spiritus.
      </p>
      <div className="mt-4">
        <div className="flex flex-col md:flex-row gap-2">
          <div className="w-full flex-1">
            <div className="my-2 rounded">
              <input
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
                placeholder="Enter first name"
                className="p-3 bg-sp-dark border-2 border-sp-medium appearance-none outline-none w-full rounded text-sp-white"
              />
            </div>
          </div>
          <div className="w-full flex-1">
            <div className="my-2 rounded">
              <input
                value={surname}
                onChange={(e) => {
                  setSurname(e.target.value);
                }}
                placeholder="Enter last name"
                className="p-3 bg-sp-dark border-2 border-sp-medium appearance-none outline-none w-full rounded text-sp-white"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function SpiritusDates({ name, birth, setBirth, death, setDeath }) {
  const footer = <p>Please pick a day.</p>;
  return (
    <div className="mt-12 mx-2 lg:mx-12">
      <div className="flex justify-center items-center rounded-xl bg-sp-fawn bg-opacity-20 h-12 w-12 mb-6">
        <RangeIcon fill />
      </div>
      <p className="font-bold text-sp-white text-2xl">
        When was <span> {name} </span> born, and when did he/she died?
      </p>
      <div className="mt-4">
        <div className="flex flex-col md:flex-row gap-2">
          <div className="w-full flex-1">
            <div className="my-2 rounded flex items-center border-2 border-sp-medium py-2.5">
              <DatePicker
                onChange={setBirth}
                value={birth}
                clearIcon={!birth ? null : <XIcon className="h-6 w-6" />}
                dayPlaceholder="Date of Birth"
                monthPlaceholder=""
                yearPlaceholder=""
                showLeadingZeros
                calendarIcon={
                  <CalendarIcon className="h-6 w-6 text-sp-lighter mx-3" />
                }
              />
            </div>
          </div>
          <div className="w-full flex-1">
            <div className="my-2 rounded flex items-center border-2 border-sp-medium py-2.5">
              <DatePicker
                onChange={setDeath}
                value={death}
                dayPlaceholder="Date of Passing"
                monthPlaceholder=""
                yearPlaceholder=""
                showLeadingZeros
                clearIcon={!death ? null : <XIcon className="h-6 w-6" />}
                calendarIcon={
                  <CalendarIcon className="h-6 w-6 text-sp-lighter mx-3" />
                }
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function SpiritusDescription({ name, description, setDescription }) {
  return (
    <div className="mt-12 mx-2 lg:mx-12">
      <div className="flex justify-center items-center rounded-xl bg-sp-fawn bg-opacity-20 h-12 w-12 mb-6">
        <CommentIcon fill />
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
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
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

export function SpiritusLocation({ name, location, setLocation }) {
  return (
    <div className="mt-12 mx-2 lg:mx-12">
      <div className="flex justify-center items-center rounded-xl bg-sp-fawn bg-opacity-20 h-12 w-12 mb-6">
        <LocationIcon fill />
      </div>
      <p className="font-bold text-sp-white text-2xl">
        <span> {name} </span> must associate you to a one place. Please select
        that place.
      </p>
      <p className="text-sp-lighter text-sm">
        It can be place of birth, death, or the place where he/she lived the
        longest.
      </p>
      <div className="mt-4">
        <div className="flex flex-col md:flex-row">
          <div className="w-full flex-1">
            <div className="my-2 rounded flex flex-row items-center border-2 border-sp-medium">
              <input
                value={location}
                onChange={(e) => {
                  setLocation(e.target.value);
                }}
                placeholder="Enter place"
                className="p-3 bg-sp-dark appearance-none outline-none w-full rounded text-sp-white"
              />
              {/* <SearchIcon className="h-6 w-6 text-sp-lighter mx-3" /> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
