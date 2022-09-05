import { ChevronDownIcon } from "@heroicons/react/24/solid";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRecoilValue, useRecoilState } from "recoil";
import { playlistIdState, playlistState } from "../atoms/playlistAtom";
import spotifyApi from "../lib/spotify";
import { signOut } from "next-auth/react";
import { shuffle } from "lodash";
import Songs from "./Songs";

const colors = [
    "from-red-500",
    "from-yellow-500",
    "from-amber-500",
    "from-orange-500",
    "from-lime-500",
    "from-green-500",
    "from-emerald-500",
    "from-teal-500",
    "from-cyan-500",
    "from-sky-500",
    "from-blue-500",
    "from-indigo-500",
    "from-violet-500",
    "from-purple-500",
    "from-fuchsia-500",
    "from-pink-500",
    "from-rose-500",
]

function Center() {
    const {data: session, status} = useSession();

    const [color, setColor] = useState(null)
    const playlistID = useRecoilValue(playlistIdState); //userecoilValue gives us readonly
    const [playlist, setPlaylist] = useRecoilState(playlistState);



    useEffect(() => {
        setColor(shuffle(colors).pop())
    }, [playlistID])

    useEffect(() => {
        spotifyApi
          .getPlaylist(playlistID)
          .then((data) => {
            setPlaylist(data.body);
            console.log(data)
          })
          .catch((err) => console.log('Something went wrong!', err));
      }, [spotifyApi, playlistID]);
    
  return (

    <div className="flex-grow h-screen overflow-y-scroll scrollbar-hide">
        <header className="absolute top-5 right-8">
            <div className="flex items-center bg-gray-900 space-x-3
             opacity-90 hover:opacity-80 rounded-full cursor-pointer p-1 pr-2"
             onClick={() => signOut()}>
                <img className="w-10 h-10 rounded-full" src={session?.user?.image} />
                <h2>{session?.user?.name}</h2>
                <ChevronDownIcon className="w-5 h-5"/>
            </div>
        </header>

        <section className={`flex items-end space-x-8 bg-gradient-to-b to-black ${color} h-80 p-8`}>
            <img className="w-44 h-44 shadow-2xl" src={playlist?.images?.[0]?.url} />
            <div>
                <p className="uppercase font-bold">{playlist?.type}</p>
                <h1 className="text-2xl md:text-3xl xl:text-5xl font-bold">{playlist?.name}</h1>
            </div>
        </section>

        <div>
            <Songs />
        </div>
    </div>
  )
}

export default Center