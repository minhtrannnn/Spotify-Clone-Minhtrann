import { useRecoilValue } from "recoil";
import { playlistState } from "../atoms/playlistAtom";
import Song from "./Song";

function Songs() {
    const playlist = useRecoilValue(playlistState);
    
    return (    
        <div className= "px-8 flex flex-col space-y-1 pb-28 text-white">
            <div className="grid grid-cols-2 text-gray-400 py-2 px-5 hover:bg-gray-900 cursor-pointer">
                <div className="flex items-center space-x-4">
                    <p>#</p>
                    <h2>Title</h2>
                </div>

                <div className="flex items-center justify-between ml-auto md:ml-0">
                    <h2>Album</h2>
                    <h2>Time</h2>
                </div>
            </div>
            <hr className="w-full border-t-[0.1px] border-gray-600"/>
            {playlist?.tracks.items.map((track, i) => (
                <Song key={track.track.id} track={track} order={i} />
            ))}
        </div>
    )
}

export default Songs
