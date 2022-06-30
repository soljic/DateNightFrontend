import { Navbar } from "./NavBar";
import { Footer } from "./Footer";

export default function Layout({ children }) {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="container mx-auto p-2 sm:px-2 md:px-4 lg:px-16">
        {children}
      </main>
      <Footer />
    </div>
  );
}
