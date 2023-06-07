export default function LayoutNoNav({ locale, children }) {
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-sp-black">
      <main className="mx-10 w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 2xl:w-1/6">
        {children}
      </main>
    </div>
  );
}
