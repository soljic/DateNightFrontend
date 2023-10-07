import { Footer } from "./Footer";
import { Navbar } from "./NavBar";

// layout for pages that use the full width of the screen
export default function FullWidthLayout({ children }) {
  return (
    <div className="mx-auto min-h-screen w-full">
      <Navbar />
      <main>{children}</main>

      <div className="mx-auto w-full max-w-7xl">
        <Footer />
      </div>
    </div>
  );
}
