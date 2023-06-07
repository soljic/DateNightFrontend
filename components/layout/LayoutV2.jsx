import { Navbar } from "./NavBar";
import { Footer } from "./Footer";

// layout for pages that use the full width of the screen
export default function FullWidthLayout({ children }) {
  return (
    <div className="mx-auto min-h-screen w-full">
      <div className="w-full lg:w-3/4 xl:w-2/3 2xl:w-2/5 mx-auto p-2">
        <Navbar />
      </div>
      <main>{children}</main>

      <div className="w-full md:w-5/6 lg:w-3/4 xl:w-2/3 2xl:w-2/5 mx-auto">
        <Footer />
      </div>
    </div>
  );
}
