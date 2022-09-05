import { HomeIcon,
         MagnifyingGlassIcon, 
         BuildingLibraryIcon , 
         PlusCircleIcon,
        HeartIcon,
        BookmarkIcon} from '@heroicons/react/24/solid'
import { signOut, useSession } from 'next-auth/react'
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { playlistState, playlistIdState } from '../atoms/playlistAtom';
import useSpotify from '../hooks/useSpotify';

function Sidebar() {
    const spotifyApi = useSpotify();
    const {data: session, status} = useSession();

    const [playlists, setPlaylists] = useState();
    const [playlistID, setPlaylistID] = useRecoilState(playlistIdState);


    useEffect(() => {
        if(spotifyApi.getAccessToken()){

            spotifyApi.getUserPlaylists().then((data) => {
                setPlaylists(data.body.items)
            })
        }
    }, [session, spotifyApi])


    console.log(playlistID)
  return (
    <div className='text-gray-500 p-5 text-sm border-gray-700 overflow-y-scroll scrollbar-hide h-screen
    text-xs lg:text-sm sm:max-w-[12rem] lg:max-w-[15rem] hidden md:inline-flex'>
        <div className='space-y-4'>
            <button className='flex items-center space-x-2 hover:text-white'>
                <HomeIcon className="h-6 w-6"/>
                <p>Home</p>
            </button>
        
            <button className='flex items-center space-x-2 hover:text-white'>
                <MagnifyingGlassIcon className="h-6 w-6"/>
                <p>Search</p>
            </button>

            <button className='flex items-center space-x-2 hover:text-white'>
                <BuildingLibraryIcon className="h-6 w-6"/>
                <p>Library</p>
            </button>
            
            <br className='mt-5' />

            <button className='flex items-center space-x-2 hover:text-white'>
                <PlusCircleIcon className="h-6 w-6"/>
                <p>Create Playlist</p>
            </button>
        
            <button className='flex items-center space-x-2 hover:text-white'>
                <HeartIcon className="h-6 w-6"/>
                <p>Liked Songs</p>
            </button>

            <button className='flex items-center space-x-2 hover:text-white'>
                <BookmarkIcon className="h-6 w-6"/>
                <p>Episodes</p>
            </button>
            <hr className='border-t-[0.1px] border-gray-700' />

            {playlists?.map(playlist =>
                <p key={playlist.id} onClick={() => setPlaylistID(playlist.id)} className="cursor-pointer hover:text-white">
                    {playlist.name}
                </p>
            )}
        </div>
    </div>
  )
}

export default Sidebar