import Link from "next/link";
import { getSession } from "next-auth/react";

import { Logo } from "../../components/layout/Common";


export default function Login() {
  return (
    <section className="bg-sp-dark">
      <div className="container mx-auto h-screen">
        <div className="flex justify-center items-center flex-wrap h-full g-6 text-sp-white">
          <div className="block border-2 border-sp-lighter rounded-lg bg-sp-fawn bg-opacity-5">
            <div className="lg:flex lg:flex-wrap g-0 ">
              <div className="p-4 mx-auto">
                <div className="md:p-12 md:mx-6">
                  <div className="flex flex-col items-center gap-2">
                    <Logo width={10} height={10} />
                    <h4 className="text-xl font-semibold mt-1 mb-12 pb-1">
                      Spiritus Memoria
                    </h4>
                  </div>
                  <form>
                    <p className="mb-4">Login to your account</p>
                    <div className="mb-4">
                      <input
                        type="text"
                        className="form-control block w-full px-3 py-1.5 text-base font-normal text-sp-white bg-inherit bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-sp-white focus:bg-inherit focus:border-sp-fawn focus:outline-none"
                        id="exampleFormControlInput1"
                        placeholder="Username"
                      />
                    </div>
                    <div className="mb-4">
                      <input
                        type="password"
                        className="form-control block w-full px-3 py-1.5 text-base font-normal text-sp-white bg-inherit bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-sp-white focus:bg-inherit focus:border-sp-fawn focus:outline-none"
                        id="exampleFormControlInput1"
                        placeholder="Password"
                      />
                    </div>
                    <div className="text-center pt-1 mb-8 pb-1">
                      <ButtonLogin />
                      <a
                        className="text-sp-lighter hover:text-sp-fawn"
                        href="#!"
                      >
                        Forgot password?
                      </a>
                    </div>
                    <div className="flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5">
                      <p className="text-center font-semibold mx-4 mb-0">OR</p>
                    </div>

                    <a
                      className="px-7 py-3 border border-sp-white hover:border-sp-fawn font-medium text-sm uppercase rounded focus:outline-none focus:ring-0 w-full flex justify-center items-center mb-3"
                      href="#!"
                      role="button"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 320 512"
                        className="w-3.5 h-3.5 mr-2"
                      >
                        <path
                          fill="currentColor"
                          d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z"
                        />
                      </svg>
                      Continue with Facebook
                    </a>
                    <a
                      className="px-7 py-3 border border-sp-white hover:border-sp-fawn font-medium text-sm uppercase rounded focus:outline-none focus:ring-0 w-full flex justify-center items-center mb-3"
                      href="#!"
                      role="button"
                    >
                      <svg
                        width="19"
                        height="20"
                        viewBox="0 0 19 20"
                        className="w-3.5 h-3.5 mr-2"
                      >
                        <path
                          d="M18.9892 10.1871C18.9892 9.36767 18.9246 8.76973 18.7847 8.14966H9.68848V11.848H15.0277C14.9201 12.767 14.3388 14.1512 13.047 15.0812L13.0289 15.205L15.905 17.4969L16.1042 17.5173C17.9342 15.7789 18.9892 13.221 18.9892 10.1871Z"
                          fill="#4285F4"
                        />
                        <path
                          d="M9.68813 19.9314C12.3039 19.9314 14.4999 19.0455 16.1039 17.5174L13.0467 15.0813C12.2286 15.6682 11.1306 16.0779 9.68813 16.0779C7.12612 16.0779 4.95165 14.3395 4.17651 11.9366L4.06289 11.9465L1.07231 14.3273L1.0332 14.4391C2.62638 17.6946 5.89889 19.9314 9.68813 19.9314Z"
                          fill="#34A853"
                        />
                        <path
                          d="M4.17667 11.9366C3.97215 11.3165 3.85378 10.6521 3.85378 9.96562C3.85378 9.27905 3.97215 8.6147 4.16591 7.99463L4.1605 7.86257L1.13246 5.44363L1.03339 5.49211C0.37677 6.84302 0 8.36005 0 9.96562C0 11.5712 0.37677 13.0881 1.03339 14.4391L4.17667 11.9366Z"
                          fill="#FBBC05"
                        />
                        <path
                          d="M9.68807 3.85336C11.5073 3.85336 12.7344 4.66168 13.4342 5.33718L16.1684 2.59107C14.4892 0.985496 12.3039 0 9.68807 0C5.89885 0 2.62637 2.23672 1.0332 5.49214L4.16573 7.99466C4.95162 5.59183 7.12608 3.85336 9.68807 3.85336Z"
                          fill="#EB4335"
                        />
                      </svg>
                      Continue with Google
                    </a>
                    <div className="flex items-center justify-between pb-6">
                      <p className="mb-0 mr-2">Don't have an account?</p>
                      <Link href="/auth/register">
                        <a className="inline-block px-6 py-2 border border-sp-white hover:border-sp-fawn font-medium text-xs leading-tight uppercase rounded focus:outline-none focus:ring-0">
                          Register
                        </a>
                      </Link>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ButtonLogin() {
  return (
    <button className="inline-block px-6 py-2.5 bg-gradient-to-r from-sp-dark-fawn to-sp-fawn text-sp-dark font-semibold text-xs leading-tight uppercase rounded focus:outline-none focus:ring-0 w-full mb-3">
      Log in
    </button>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context)

  if (session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  return {
    props: { session }
  }
}
