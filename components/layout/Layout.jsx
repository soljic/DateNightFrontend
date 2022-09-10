import { Navbar } from "./NavBar";
import { Footer } from "./Footer";

export default function Layout({ locale, children }) {
  return (
    <div className="min-h-screen md:container mx-auto">
        <main className="mx-5 sm:mx-4 xs:mx-3">
          <Navbar />
          {children}
        </main>
        <Footer />
    </div>
  );
}
