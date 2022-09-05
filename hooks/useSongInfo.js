import { useState } from "react";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { currentTrackIDState } from "../atoms/songAtom";
import useSpotify from '../hooks/useSpotify';

function useSongInfo() {
    const spotifyApi = useSpotify();
    const [currentTrackID, setCurrentTrackID] = useRecoilState(currentTrackIDState)
    const [songInfo, setSongInfo] = useState(null)

    useEffect(() => {
      const fetchSongInfo = async () =>{
        if(currentTrackID) {
            const trackInfo = await fetch(
                `https://api.spotify.com/v1/tracks/${currentTrackID}`,{
                    headers:{
                        Authorization: `Bearer ${spotifyApi.getAccessToken()}`
                    }
                }
            )
            const res = await trackInfo.json();
            setSongInfo(res)
        }
      }
    
      fetchSongInfo();
    }, [currentTrackID, spotifyApi])
    

  return songInfo
}

export default useSongInfo