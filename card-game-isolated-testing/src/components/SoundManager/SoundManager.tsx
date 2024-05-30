import { useState, useEffect } from "react";
import SoundIcon from "../../assets/newAdditions/sound_icon.webp";

const SoundManager = ({ audio }: { audio: HTMLAudioElement | null }) => {
  const [toggleMusic, setToggleMusic] = useState(true); // means music is playing

  useEffect(() => {
    if (audio && toggleMusic && audio.paused) {
      audio.play();
    } else if (audio && !toggleMusic && !audio.paused) {
      audio.pause();
    }
  }, [audio, toggleMusic]);

  if (!audio) return null;

  const handleToggleMusic = () => {
    setToggleMusic((prev: boolean) => !prev);
  };

  return (
    <div
      className="absolute z-10 bg-emerald-500 mobile:bg-orange-600 w-fit h-fit rounded-full p-2 cursor-pointer mobile:bg-opacity-50 mobile:bottom-2 mobile:p-2 mobile:top-4 mobile:left-6 tablet:top-4 tablet:left-6"
      onClick={handleToggleMusic}
    >
      <img
        src={SoundIcon}
        alt="Play/Stop Music Icon"
        className={`w-24 tablet:w-16 mobile:w-14  ${
          toggleMusic ? "grayscale-0" : "grayscale"
        }`}
      />
    </div>
  );
};

export default SoundManager;
