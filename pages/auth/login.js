import { signIn, getProviders} from "next-auth/react"

export default function Login({ providers }) {
  return (
    <>
      {providers && Object.values(providers).map((provider) => (
        <div key={provider.name}>
          <button onClick={() => signIn(provider.id, {callbackUrl: `${window.location.origin}/`})}>
            Sign in with {provider.name}
          </button>
        </div>
      ))}
    </>
  )
}

export async function getServerSideProps(context) {

  const providers = await getProviders();

return {
    props: {
      providers
    },
  
}
}