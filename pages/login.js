import {getProviders} from "next-auth/react"
import { signIn } from "next-auth/react";


function login({providers}) {

  return (
    <div className="flex flex-col items-center min-h-screen w-full justify-center">
      <img className="w-52 mb-5" src='https://links.papareact.com/9xl'/>

      {Object.values(providers).map(provider => 
        <div key={provider.name}>
          <button className='bg-green-400 text-white p-5 rounded-full'
          onClick={() => signIn(provider.id, {callbackUrl: "/"})}>
            Login with {provider.name}
          </button>
        </div>
      )}
    </div>
  )
}

export default login


//server side render for providers from auth directory
export async function getServerSideProps(){
  const providers = await getProviders();

  return {
    props:{
      providers,
    }
  }
}