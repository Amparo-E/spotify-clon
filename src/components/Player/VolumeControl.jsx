import { useEffect, useRef } from "react";
import { Slider } from "../Slider";
import { Volume, VolumeSilence } from "../../icons/Volume";
import { usePlayerStore } from "../../store/playerStore";

export const VolumeControl = () => {
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