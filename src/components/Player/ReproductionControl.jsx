import { Pause, Play } from "../../icons/ReproductionIcon";
import { usePlayerStore } from "../../store/playerStore";
import { PreviousSongIcon, NextSongIcon } from "../../icons/SongControlIcons";
import { SongControl } from "./SongControl";

export const ReproductionControl = ({audioRef}) => {
  const { isPlaying, setIsPlaying } = usePlayerStore((state) => state);

  const handleClick = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="grid place-content-center gap-y-4 flex-1">
        <div className="flex flex-col justify-center items-center">
            <div className="">
                <button className="mr-8">
                    <PreviousSongIcon/>
                </button>
                <button className=" bg-white rounded-full p-2" onClick={handleClick}>
                    {isPlaying ? <Pause /> : <Play />}
                </button>
                <button className="ml-8">
                    <NextSongIcon/>
                </button>
            </div>
          <SongControl audio={audioRef}/>
          <audio ref={audioRef}/>
        </div>
      </div>
  );
};
