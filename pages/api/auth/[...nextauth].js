// pages/api/auth/[...nextauth].js
import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import { MongoDBAdapter } from "@next-auth/mongodb-adapter"

import connectMongo from "../../../lib/mongo"

export default NextAuth({
  providers: [
    // OAuth authentication providers
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorizationUrl: 'https://accounts.google.com/o/oauth2/v2/auth?prompt=consent&access_type=offline&response_type=code'
    }),
  ],
  jwt:{
    encryption: true
  },
  secret: process.env.NEXTAUTH_SECRET,
  database: process.env.DATABASE_URL,
})