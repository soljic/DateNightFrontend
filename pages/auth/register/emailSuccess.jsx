import { getSession } from "next-auth/react";

import { ShieldIcon } from "../../../components/Icons";
import LayoutNoNav from "../../../components/layout/LayoutNoNav";

export default function EmailRegister() {
  return (
    <LayoutNoNav>
      <section className="flex flex-col justify-center items-center text-sp-white subpixel-antialiased">
        {/* <pre>{JSON.stringify(watch(), null, 2)}</pre> */}

        <div className="flex flex-col justify-center items-center gap-4 mb-10">
          <ShieldIcon width={12} height={12} />
          <h4 className="text-3xl text-center font-bold mt-5">Congrats</h4>
          <p className="text-center w-3/4 mb-5">
            You’ve just became a Guardian. We’ve sent you a confirmation email.
          </p>
          {/* login button */}
          <a
            href="/"
            className="text-center w-1/2 bg-gradient-to-r from-sp-dark-fawn to-sp-fawn border-5 border-sp-medium border-opacity-80 rounded-sp-40 p-5 text-sp-black text-lg"
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
