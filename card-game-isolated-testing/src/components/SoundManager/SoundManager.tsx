import { useEffect } from "react";
import SoundIcon from "../../assets/newAdditions/sound_icon.webp";
import { useGeneralVariablesStore } from "../../stores/generalVariables";

const SoundManager = ({ audio }: { audio: HTMLAudioElement | null }) => {
  const { setIsMusicPaused, isMusicPaused } = useGeneralVariablesStore(
    (state) => state
  );

  useEffect(() => {
    if (audio === null) return;

    if (!isMusicPaused) {
      audio.play();
    } else if (isMusicPaused) {
      audio.pause();
    }
  }, [audio, isMusicPaused]);

  if (!audio) return null;

  // const handleToggleMusic = () => {
  //   // setToggleMusic((prev: boolean) => !prev);
  //   if (!isMusicPaused) {
  //     audio.pause();
  //   } else {
  //     audio.play();
  //   }
  //   setIsMusicPaused(!isMusicPaused);
  // };

  return (
    <div
      className="absolute z-10 bg-emerald-500 mobile:bg-orange-600 w-fit h-fit rounded-full p-2 cursor-pointer mobile:bg-opacity-50 mobile:bottom-2 mobile:p-2 mobile:top-4 mobile:left-6 tablet:top-4 tablet:left-6"
      onClick={() => setIsMusicPaused(!isMusicPaused)}
    >
      <img
        src={SoundIcon}
        alt="Play/Stop Music Icon"
        className={`w-24 tablet:w-16 mobile:w-14  ${
          isMusicPaused ? "grayscale" : "grayscale-0"
        }`}
      />
    </div>
  );
};

export default SoundManager;
