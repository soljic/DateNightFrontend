import { Navbar } from "./NavBar";
import { Footer } from "./Footer";

export default function Layout({ locale, children }) {
  return (
    <div className="mx-auto min-h-screen w-full md:w-5/6 lg:w-3/4 xl:w-2/3 2xl:w-2/5">
      <div className="w-full mx-auto p-2">
        <Navbar />
      </div>
      <div className="mx-5">
        <main>{children}</main>
        <Footer />
      </div>
    </div>
  );
}
