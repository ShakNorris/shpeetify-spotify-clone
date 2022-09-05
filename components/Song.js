import { useRecoilState } from "recoil"
import { currentTrackIDState, isPlayingState } from "../atoms/songAtom";
import useSpotify from "../hooks/useSpotify"
import { millisToMinutesAndSeconds } from "../lib/time";

function Song({track, order}) {
    const [currentTrackID, setCurrentTrackID] = useRecoilState(currentTrackIDState)
    const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState)
    const spotifyApi = useSpotify();

    const playSong = () => {
        setCurrentTrackID(track.track.id);
        setIsPlaying(true)
        spotifyApi.play({
            uris: [track.track.uri]
        })
    }

  return (
    <div onClick={playSong} className="grid grid-cols-2 py-4 px-5 hover:bg-gray-900 text-gray-500 cursor-pointer rounded-lg">
        <div className="flex items-center space-x-4">
            <p>{order+ 1}</p>
            <img className="w-10 h-10" src={track.track?.album?.images[0].url} alt="" />
            <div>
                <p className="w-36 lg:w-64 text-white truncate">{track.track.name}</p>
                <p className="w-40">{track.track.artists[0].name}</p>
            </div>
        </div>

        <div className="flex items-center justify-between ml-auto md:ml-0">
            <p className="w-40 hidden md:inline">{track.track.album.name}</p>
            <p>{millisToMinutesAndSeconds(track.track.duration_ms)}</p>
        </div>
    </div>
  )
}

export default Song