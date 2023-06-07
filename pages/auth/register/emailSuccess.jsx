import { getSession } from "next-auth/react";

import { ShieldIcon } from "../../../components/Icons";
import LayoutNoNav from "../../../components/layout/LayoutNoNav";

export default function EmailRegister() {
  return (
    <LayoutNoNav>
      <section className="flex flex-col items-center justify-center text-sp-white subpixel-antialiased">
        <div className="mb-10 flex flex-col items-center justify-center gap-4">
          <ShieldIcon width={12} height={12} />
          <h4 className="mt-5 text-center font-bold text-3xl">Congrats</h4>
          <p className="mb-5 w-3/4 text-center">
            You’ve just became a Guardian. We’ve sent you a confirmation email.
          </p>
          {/* login button */}
          <a
            href="/"
            className="w-1/2 rounded-sp-40 border-5 border-sp-medium border-opacity-80 bg-gradient-to-r from-sp-dark-fawn to-sp-fawn p-5 text-center text-sp-black text-lg"
          >
            Got it
          </a>
        </div>
      </section>
    </LayoutNoNav>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      session,
    },
  };
}
