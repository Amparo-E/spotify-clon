import { useEffect, useRef, useState } from "react";
import { usePlayerStore } from "../store/playerStore";
import { Slider } from "./Slider";
import { Play } from "../icons/Play";
import { Pause } from "../icons/Pause";
import { Volume, VolumeSilence } from "../icons/Volume";


const CurrentSong = ({ image, title, artists }) => {
  return (
    <div className={`flex items-center gap-3 relative overflow-hidden`} >
      <picture className="w-14 h-14 bg-zinc-800 rounded-md shadow-lg overflow-hidden">
        <img src={image} alt={title} />
      </picture>

      <div className="flex flex-col">
        <h3 className="font-light text-sm block">
          {title}
        </h3>
        <span className="text-xs opacity-50">
          {artists?.join(', ')}
        </span>
      </div>
    </div>
  )
}


const VolumeControl = () => {
  const { volume, setVolume } = usePlayerStore(state => state)
  const previousVolumeRef = useRef(volume)

  const isVolumeSilenced = volume < 0.1

  const handleClickVolume = () => {
    if(isVolumeSilenced){
      setVolume(previousVolumeRef.current)
    } else {
      previousVolumeRef.current = volume
      setVolume(0)
    }
  }

  return (
    <div className="flex justify-center gap-x-2">
      <button className="opacity-70 hover:opacity-100 transition" onClick={handleClickVolume}>
        { isVolumeSilenced ? <VolumeSilence /> : <Volume />}
      </button>

      <Slider
          defaultValue={[100]}
          max={100}
          min={0}
          value={[volume * 100]}
          className="w-[95px]"
          onValueChange={(value) => {
            const [newVolume] = value
            const volumeValue = newVolume / 100
            setVolume(volumeValue)
          }}
        />
    </div>
  )
}



const SongControl = ({ audio }) => {
  const [currentTime, setCurrentTime] = useState(0)

  useEffect(() => {
  audio.current.addEventListener('timeupdate', handleTimeUpdate)

  return () => {
    audio.current.removeEventListener('timeupdate', handleTimeUpdate)
  }
  }, [])

  const handleTimeUpdate = () => {
    setCurrentTime(audio.current.currentTime)
  }

  const formatTime = time => {
    if(time === null) return `0:00`

    const seconds = Math.floor(time % 60)
    const minutes = Math.floor(time / 60)

    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  const duration = audio?.current?.duration ?? 0

  return (
    <div className="flex items-center gap-x-2 pt-2 text-xs">
      <span className="opacity-50 w-12 text-right">{formatTime(currentTime)}</span>
      <Slider
        value={[currentTime]}
        max={audio?.current?.duration ?? 0}
        min={0}
        className="w-[500px]"
        onValueChange={(value) => {
          const [newCurrentTime] = value
          audio.current.currentTime = newCurrentTime
        }}
      />
      <span className="opacity-50 w-12">{duration ? formatTime(duration) : `0:00`}</span>
    </div>
  )
}


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

  const handleClick = () => {
    setIsPlaying(!isPlaying)
  }
  
  return (
    <div className="flex justify-between w-full px-2 z-50">
      <div>
        <CurrentSong {...currentMusic.song}/>
      </div>

      <div className="grid place-content-center gap-y-4 flex-1">
        <div className="flex flex-col justify-center items-center">
          <button className=" bg-white rounded-full p-2" onClick={handleClick}>
            { isPlaying ? <Pause/> : <Play/>}
          </button>
          <SongControl audio={audioRef}/>
          <audio ref={audioRef}/>
        </div>
      </div>

      <div className="grid place-content-center">
        <VolumeControl/>
      </div>

    </div>
  );
}
