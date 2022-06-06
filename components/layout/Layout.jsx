import { Navbar } from "./NavBar";
import { Footer } from "./Footer";

export default function Layout({ children }) {
  return (
    <div className="common-bg p-2 min-w-full">
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
