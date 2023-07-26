import jwt_decode from "jwt-decode";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

import {
  GetProfile,
  LoginCode,
  LoginCredentials,
} from "../../../service/http/auth";

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
        code: { label: "Code", type: "text" },
      },
      async authorize(credentials, req) {
        // NOTE:
        // This became technical debt the moment it was written due
        // to how user registration and authentication works on BE
        // with regards to 3rd party auth providers.
        //
        // In case credentials.code is submitted, we are ALWAYS treating the code
        // as if it is coming from a social login provider.
        // We trusting the code is valid and are faking an "normal" Credentials login call in this function.
        //
        // If credentials.username and credentials.password are provided we continue to login user
        // using the Credentials provider as it was intended.
        //
        // If you manage to refactor this, keep the "normal" Credentials login (username/password) and remove code login.
        let res;
        if (credentials.code) {
          res = await LoginCode(credentials.code);
        } else {
          res = await LoginCredentials(
            credentials.username,
            credentials.password
          );
        }
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
          expire_date: user.expire_date,
          expires_in: user.expires_in,

          // add user surname and code
          surname: user.surname,
          code: user.code,
        };
      }

      let expire_date = new Date(token.expire_date);
      // token expired return empty token to invalidate session in session callback)
      if (expire_date < new Date()) {
        return {};
      }
      return token;
    },

    async session({ session, token }) {
      // token expired; return empty session to invalidate
      if (!token?.accessToken) {
        return {};
      }

      // const data = jwt_decode(token.accessToken);
      session.user.accessToken = token.accessToken;
      session.user.code = token.code;
      session.user.surname = token.surname;
      return session;
    },
  },
  // Enable debug messages in the console if you are having problems
  debug: process.env.NODE_ENV === "development",
});
