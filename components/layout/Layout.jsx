import { Footer } from "./Footer";
import { Navbar } from "./NavBar";

export default function Layout({ locale, children }) {
  return (
    <div className="mx-auto min-h-screen w-full md:w-5/6 lg:w-3/4 xl:w-2/3 2xl:w-2/5">
      <div className="mx-auto w-full p-2">
        <Navbar />
      </div>
      <div className="mx-5">
        <main>{children}</main>
        <Footer />
      </div>
    </div>
  );
}
