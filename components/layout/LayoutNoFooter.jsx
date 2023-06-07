import { Navbar } from "./NavBar";

export default function LayoutNoFooter({ locale, children }) {
  return (
    <div className="mx-auto min-h-screen w-full md:container lg:w-3/5 xl:w-1/2 2xl:w-2/5">
      <div className="mx-5 xs:mx-3 sm:mx-4">
        <Navbar />
        <main>{children}</main>
      </div>
    </div>
  );
}
