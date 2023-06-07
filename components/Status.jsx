import { XIcon } from "@heroicons/react/outline";
import { useTranslation } from "next-i18next";

export function Spinner({ text }) {
  return (
    <div className="inline-flex items-center p-0.5">
      <svg
        className="h-5 w-5 animate-spin text-sp-black dark:text-sp-lighter"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        ></circle>
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        ></path>
      </svg>
      {text ? <span className="p-1">{text}</span> : ""}
    </div>
  );
}

export function ProgressBar({ step, maxSteps }) {
  return (
    <div className="mx-auto mt-12 flex-auto">
      <div className="h-1 w-full bg-sp-lighter">
        <div
          className="h-1 bg-sp-dark-fawn dark:bg-sp-fawn"
          style={{ width: `${Math.floor((step * 100) / maxSteps)}%` }}
        ></div>
      </div>
    </div>
  );
}

export function Alert({ isSuccess, message, onClick }) {
  const { t } = useTranslation("common");

  return (
    <div
      className={`cursor-pointer rounded-sp-10 border-l-4 px-2 py-3 text-teal-900 ${
        isSuccess
          ? "border-green-500 bg-green-100"
          : "border-red-500 bg-red-100"
      }`}
      role="alert"
      onClick={() => onClick()}
    >
      <div className="flex w-full min-w-[16rem] items-center">
        <div className="mr-2 px-1 py-2">
          {isSuccess ? (
            <svg
              className="mt-0.5 h-5 w-5 text-green-500"
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
            </svg>
          ) : (
            <svg
              className="mt-0.5 h-5 w-5 text-red-500"
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z" />
            </svg>
          )}
        </div>
        <div className="flex w-full flex-col">
          <div className="flex w-full flex-row items-center justify-between">
            <p className="font-bold">
              {isSuccess ? t("message_success") : t("message_error")}
            </p>
          </div>
          <div className="break-words">
            <p className="whitespace-pre-line pr-4 text-sm">{message}</p>
          </div>
        </div>
        <button className="">
          <XIcon className="h-6 w-6" />
        </button>
      </div>
    </div>
  );
}
