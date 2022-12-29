// pages/api/auth/[...nextauth].js
import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import { MongoDBAdapter } from "@next-auth/mongodb-adapter"

import connectMongo from "../../../lib/mongo"
import { signIn } from "next-auth/react"
import { redirect } from "next/dist/server/api-utils"

export default NextAuth({
  providers: [
    // OAuth authentication providers
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  jwt:{
    encryption: true
  },
  secret: process.env.NEXTAUTH_SECRET,
  database: process.env.DATABASE_URL,
  adapter: MongoDBAdapter(connectMongo),
  callbacks:{
    async signIn(user,account,profile){
        return true;
    },
    async jwt({ token, account, profile }) {
    // Persist the OAuth access_token and or the user id to the token right after signin
    if (account) {
      token.accessToken = account.access_token
      token.id = profile.id
    }
    return token
  },
    async redirect({ url, baseUrl }) {
    // Allows relative callback URLs
    if (url.startsWith("/")) return `${baseUrl}${url}`
    // Allows callback URLs on the same origin
    else if (new URL(url).origin === baseUrl) return url
    return baseUrl
  }
  },
  pages: {
    signIn: '/auth/login'
  },
  async session(session,token){
    session.token = token
    return session
  }
})