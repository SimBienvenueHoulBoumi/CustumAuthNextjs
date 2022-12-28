import React from 'react';
import { useSession, signIn, signOut } from "next-auth/react";

const Home = () => {
  const { data: session } = useSession();
  return (
    <div>
      Home
      {!session ?(
        <>
          <p>Not signed in</p>
          <br />
          <button onClick={() => signIn()}>Sign in</button>
        </>):
        (
        <>
          <button onClick={() => signOut()}>Sign out</button>
        </>)}
    </div>
  );
};


export default Home;
