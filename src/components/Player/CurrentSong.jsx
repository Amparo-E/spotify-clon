export const CurrentSong = ({ image, title, artists }) => {
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