export function Spinner({ text }) {
  return (
    <div className="inline-flex items-center p-0.5">
      <svg
        className="animate-spin h-5 w-5 text-sp-black dark:text-sp-white"
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
      {text ? <span>{text}</span> : ""}
    </div>
  );
}

export function ProgressBar({ step, maxSteps }) {
  return (
    <div className="flex-auto mx-auto mt-12">
      <div className="w-full bg-sp-lighter h-1">
        <div
          className="bg-sp-dark-fawn dark:bg-sp-fawn h-1"
          style={{ width: `${Math.floor((step * 100) / maxSteps)}%` }}
        ></div>
      </div>
    </div>
  );
}
