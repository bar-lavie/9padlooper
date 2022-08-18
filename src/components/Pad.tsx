import React, { useState, useRef, useEffect } from "react";

interface PadProps {
  file: number;
  started: boolean;
}

const Pad: React.FC<PadProps> = (props) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [inCue, setInCue] = useState<boolean>(true);
  const [inNextCue, setInNextCue] = useState<boolean>(false);
  const [count, setCount] = useState<number>(0);

  // Listen to main play/stop button click inherited from parent component
  useEffect(() => {
    if (props.started) {
      handlePlay();
    } else {
      handleStop();
      setCount(0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.started]);

  /**
   * The looping function that plays the audio file over and over
   * instead using interval, we use timeout that will update the state every 100ms
   * this will insure that all the pads will be played at the same time every time + give us more control on the loop time
   * BTW, the specified time (7.5sec) was the ideal time to reset the loop (based on sound)
   */
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!props.started) return;
      if (count >= 7.5) {
        setCount(0);
        handlePlay();
      } else {
        setCount(count + 0.1);
      }
    }, 100);

    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count, props.started]);

  // listen to the InCue state, and determine if to color the pad in orange (orange = will be start in next cue)
  useEffect(() => {
    setInNextCue(inCue && audioRef.current!.paused);
  }, [inCue, count]);

  const handlePlay = () => {
    if (!inCue) {
      handleStop();
      return;
    }
    audioRef.current!.currentTime = 0;
    audioRef.current!.play();
  };

  const handleStop = () => {
    audioRef.current!.pause();
    audioRef.current!.currentTime = 0;
  };

  return (
    <div className="pad" style={{ backgroundColor: inCue ? (inNextCue ? "#F9DC5C" : "#C2EABD") : "#ED254E" }}>
      <audio ref={audioRef}>
        <source src={`./assets/sounds/${props.file}.mp3`} type="audio/mp3" />
      </audio>
      <button className="cueBtn" onClick={() => setInCue(!inCue)}>
        SOUND {props.file}
      </button>
      {/* Not sure it's essential to have this button, but it's nice to have it for debugging purposes*/}
      {/* <button className="stopBtn" onClick={() => handleStop()}>
        Stop
      </button> */}
    </div>
  );
};

export default Pad;
