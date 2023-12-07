import { useEffect, useRef } from "react";
import { usePlayerStore } from "../../store/playerStore";
import { CurrentSong } from "./CurrentSong";
import { ReproductionControl } from "./ReproductionControl";
import { VolumeControl } from "./VolumeControl";


export function Player() {
  const { isPlaying, setIsPlaying , currentMusic, volume, } = usePlayerStore(state => state)
  const audioRef = useRef()

  useEffect(() => {
    isPlaying ?
    audioRef.current.play():
    audioRef.current.pause()
  }, [isPlaying])

  useEffect(() => {
    const { song, playlist, songs } = currentMusic

    if(songs){
      const src = `../../public/music/${playlist?.id}/0${song?.id}.mp3 `
      audioRef.current.src = src
      audioRef.current.volume = volume
      audioRef.current.play()
    }
  }, [currentMusic])


  useEffect(() => {
    audioRef.current.volume = volume
  }, [volume])
  
  return (
    <div className="flex justify-between w-full px-2 z-50">
      <div>
        <CurrentSong {...currentMusic.song}/>
      </div>

      <div>
        <ReproductionControl audioRef={audioRef}/>
      </div>

      <div className="grid place-content-center">
        <VolumeControl/>
      </div>
    </div>
  );
}