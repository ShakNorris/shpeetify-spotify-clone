import { useSession } from "next-auth/react"
import { useRecoilState } from "recoil"
import { currentTrackIDState, isPlayingState } from "../atoms/songAtom"
import { useCallback, useEffect, useState } from "react"
import useSongInfo from "../hooks/useSongInfo"
import useSpotify from "../hooks/useSpotify"
import {ArrowsRightLeftIcon,
        BackwardIcon,
        ForwardIcon, 
        ArrowUturnLeftIcon,
        } from '@heroicons/react/24/solid'
import {PlayIcon, PauseIcon, SpeakerWaveIcon, QueueListIcon, MicrophoneIcon, ComputerDesktopIcon} from '@heroicons/react/24/outline'
import { debounce } from "lodash"


function Player() {

    const spotifyApi = useSpotify();
    const [currentTrackID, setCurrentTrackID] = useRecoilState(currentTrackIDState)
    const {data: session, status} = useSession();
    const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState)
    const [volume, setVolume] = useState(50)

    const songInfo = useSongInfo(currentTrackID);


    const fetchCurrentSong = () => {
        if (!songInfo) {
          spotifyApi.getMyCurrentPlayingTrack().then((data) => {
            setCurrentTrackID(data.body?.item?.id);
            spotifyApi.getMyCurrentPlaybackState().then((data) => {
              setIsPlaying(data.body?.is_playing);
            });
          });
        }
      };

      useEffect(() => {
        if (spotifyApi.getAccessToken() && !currentTrackID) {
          fetchCurrentSong();
          setVolume(50);
        }
      }, [currentTrackID, spotifyApi, session]);

      const debouncedAdjustVolume = useCallback(
        debounce((volume) => {
          spotifyApi.setVolume(volume).catch((err) => {});
        }, 300),
        []
      );
    
      useEffect(() => {
        if (volume > 0 && volume < 100) {
          debouncedAdjustVolume(volume);
        }
      }, [volume]);

      const handlePlayPause = () => {
        spotifyApi.getMyCurrentPlaybackState().then(data =>{
            if(data.body.is_playing){
                spotifyApi.pause();
                setIsPlaying(false);
            }
            else{
                spotifyApi.play();
                setIsPlaying(true);
            }
        })
      }

      useEffect(() => {
        const interval = setInterval(() => {
            fetchCurrentSong()
          }, 1000)
        return () => clearInterval(interval);
    }, [])
    
    useEffect(()=>{
        debouncedSong()
    })
    const debouncedSong = debounce(() => {
        fetchCurrentSong()
    }, 500)

      return (
        <div className="h-24 bg-gradient-to-b from-black to-gray-900 text-white
        grid grid-cols-3 text-xs md:text-base px-2 md:px-8">
            <div className="flex items-center space-x-4 ">
                <img
                className="hidden md:inline h-12 w-12"
                src={songInfo?.album?.images?.[0].url}
                alt=""
                />
                <div>
                    <h3>{songInfo?.name}</h3>
                    <p>{songInfo?.artists?.[0]?.name}</p>
                </div>
            </div>
            <div className="flex items-center justify-evenly">
                <ArrowsRightLeftIcon className="button" />
                <BackwardIcon className="button" />
                {isPlaying? (
                    <PauseIcon onClick={handlePlayPause} className="button w-8 h-8" />
                ):(
                    <PlayIcon onClick={handlePlayPause} className="button w-8 h-8" />
                )}
                <ForwardIcon className="button" />
                <ArrowUturnLeftIcon className="button" />
            </div>

            <div className="flex items-center justify-end pr-5">
                <MicrophoneIcon className="button m-1"/>
                <QueueListIcon className="button m-1" />
                <ComputerDesktopIcon className="button m-1" />
                <SpeakerWaveIcon onClick={() => volume > 0 ? (setVolume(0)) : (setVolume(50))} className="button m-1"/>
                <input 
                style={{color: "#1DB954"}} 
                className="w-14 md:w-28" 
                type="range" 
                onChange={((e) => {setVolume(Number(e.target.value))})}
                value={volume} 
                min={0} 
                max={100} />
            </div>
        </div>
    )
}

export default Player