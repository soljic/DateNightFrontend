import { Navbar } from "./NavBar";
import { Footer } from "./Footer";

export default function Layout({ locale, children }) {
  return (
    <div className="min-h-screen md:container mx-auto w-full lg:w-3/5 xl:w-1/2">
      <div className="mx-5 sm:mx-4 xs:mx-3">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </div>
    </div>
  );
}
