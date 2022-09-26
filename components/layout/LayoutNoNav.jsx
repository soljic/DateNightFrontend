export default function LayoutNoNav({ locale, children }) {
  return (
    <div className="flex justify-center items-center min-h-screen w-full bg-sp-black">
      <main className="w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 2xl:w-1/6 mx-10">{children}</main>
    </div>
  );
}
