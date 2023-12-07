import { useState, useEffect } from "react";
import { Slider } from "../Slider";

export const SongControl = ({ audio }) => {
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
  