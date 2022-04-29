import { ChevronDownIcon } from "@heroicons/react/outline";
import { signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { shuffle } from "lodash";
import { useRecoilState, useRecoilValue } from "recoil";
import { playlistIdState, playlistState} from "../atoms/playlistAtom";
import useSpotify from "../hooks/useSpotify";
import Songs from "./Songs";
import spotifyApi from "../lib/spotify";
import { millisToHoursAndMinutes } from "../lib/timeHour";

const colors = [
    "from-indigo-500",
    "from-blue-500",
    "from-green-500",
    "from-red-500",
    "from-yellow-500",
    "from-pink-500",
    "from-purple-500",
];

function logOut() {
    spotifyApi.setAccessToken(null);
    signOut();
}

function Center() {
    const { data: session} = useSession();
    const spotifyApi = useSpotify();
    const [color, setColor] = useState(null);
    const playlistId = useRecoilValue(playlistIdState);
    const [playlist, setPlaylist] = useRecoilState(playlistState)

    useEffect(() => {
        setColor(shuffle(colors).pop())
    }, [playlistId]);

    useEffect(() => {
        spotifyApi.getPlaylist(playlistId).then((data) => {
            setPlaylist(data.body)
        }).catch((err) => console.log("Something went wrong", err));
    }, [spotifyApi, playlistId])

    console.log(playlist)
    var total = playlist?.tracks.total;
    var duration = 0;
    
    playlist?.tracks.items.map((track) => {
        duration += track.track.duration_ms;
    });

    return (
        <div className="flex-grow h-screen overflow-y-scroll scrollbar-hide">
            <header className="absolute top-5 right-8">
                <div 
                    className="flex items-center bg-black space-x-3 opacity-90 hover:opacity-80 cursor-pointer rounded-full p-1 pr-2 text-white" 
                    onClick={logOut}>
                    <img 
                        className="rounded-full w-10 h-10"
                        src={session?.user.image} 
                        alt="" 
                    />

                    <h2>{session?.user.name}</h2>
                    <ChevronDownIcon className="h-5 w-5"/>
                </div>
            </header>

            <section className={`flex items-end space-x-7 bg-gradient-to-b to-black ${color} h-80 text-white p-8`}>
                <img 
                    className="h-44 w-44 shadow-2xl"
                    src={playlist?.images?.[0]?.url} 
                    alt=""
                />
                <div>
                    <p>PUBLIC PLAYLIST</p>
                    <h1 className="text-5xl md:text-5xl xl:text-8xl">{playlist?.name}</h1>
                    &nbsp;
                    <div className="flex items-center space-x-2">
                        <img 
                            className="rounded-full w-5 h-5"
                            src={session?.user.image} 
                        alt="" 
                        />
                        <h2>{session?.user.name}</h2>
                        <h2>.</h2>
                        <h2>{total} Songs, </h2>
                        <p class="text-gray-500">{millisToHoursAndMinutes(duration)}</p>
                    </div>
                </div>
            </section>

            <Songs />
        </div>
    );
}

export default Center;
