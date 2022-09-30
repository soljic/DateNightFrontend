import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { GetProfile, LoginCredentials } from "../../../service/http/auth";
import jwt_decode from "jwt-decode";

export default NextAuth({
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: "Credentials",
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        username: { label: "Username", type: "text", placeholder: "Username" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        // You need to provide your own logic here that takes the credentials
        // submitted and returns either a object representing a user or value
        // that is false/null if the credentials are invalid.
        // e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
        // You can also use the `req` object to obtain additional parameters
        // (i.e., the request IP address)
        const res = await LoginCredentials(
          credentials.username,
          credentials.password
        );
        // If no error and we have user data, return it
        if (res?.data) {
          const profile = await GetProfile(res.data.access_token);

          if (!profile?.data) {
            return null;
          }

          return { ...res.data, ...profile.data };
        }
        // Return null if user data could not be retrieved
        return null;
      },
    }),
  ],
  secret: process.env.JWT_SECRET,
  callbacks: {
    // this workflow is stupid
    // it seems that JWT needs to be combined with user
    // data so user data can be stored on first jwt() call (on login)
    async jwt({ token, user, account }) {
      if (account && user) {
        return {
          ...token,
          accessToken: user.access_token,
          refreshToken: user.refresh_token,
          // add user surname and code
          surname: user.surname,
          code: user.code,
        };
      }

      return token;
    },

    async session({ session, token }) {
      const data = jwt_decode(token.accessToken);
      session.user.accessToken = token.accessToken;
      session.user.code = token.code;
      session.user.surname = token.surname;
      return session;
    },
  },
  // Enable debug messages in the console if you are having problems
  debug: process.env.NODE_ENV === "development",
});
