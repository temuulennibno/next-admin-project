"use client";
import { Button } from "@/components/ui/button";
import { useRef, useState } from "react";

const TimerPage = () => {
  const [mils, setMils] = useState(3 * 100);
  const [laps, setLaps] = useState([]);
  const [running, setRunning] = useState(true);
  const interValRef = useRef(null);
  const minutes = Math.floor(mils / 60 / 100);
  const seconds = Math.floor((mils % (60 * 100)) / 100);
  const restMils = mils % 100;

  if (interValRef.current) {
    clearInterval(interValRef.current);
  }

  if (running && mils > 0) {
    interValRef.current = setInterval(() => {
      setMils(mils - 1);
    }, 10);
  }

  return (
    <div className="flex flex-col items-center justify-center w-full min-h-48">
      <h1 className="mb-4 font-mono font-bold text-7xl">
        <span>
          {minutes < 10 && "0"}
          {minutes}
        </span>
        :
        <span>
          {seconds < 10 && "0"}
          {seconds}
        </span>
        :
        <span>
          {restMils < 10 && "0"}
          {restMils}
        </span>
      </h1>
      <div className="flex gap-4">
        <Button
          variant="outline"
          onClick={() => {
            const newLaps = [
              `${minutes < 10 ? "0" : ""}${minutes}:${seconds < 10 ? "0" : ""}${seconds}:${restMils < 10 ? "0" : ""}${restMils}`,
              ...laps,
            ];
            setLaps(newLaps);
          }}
        >
          Lap
        </Button>
        <Button
          variant="outline"
          onClick={() => {
            setMils(10 * 60 * 100);
            setRunning(true);
            setLaps([]);
          }}
        >
          Reset
        </Button>
        <Button
          variant="outline"
          onClick={() => {
            setRunning(!running);
          }}
        >
          {running ? "Pause" : "Resume"}
        </Button>
        <Button
          onClick={() => {
            setMils(mils + 3000);
          }}
          variant="outline"
        >
          +30s
        </Button>
        <Button
          onClick={() => {
            if (mils - 3000 > 0) {
              setMils(mils - 3000);
            } else {
              setMils(0);
            }
          }}
          variant="outline"
        >
          -30s
        </Button>
      </div>
      <ul className="flex flex-col gap-2 mt-4 font-mono text-3xl list-disc list">
        {laps.map((lap) => {
          return <li key={lap}>{lap}</li>;
        })}
      </ul>
    </div>
  );
};

export default TimerPage;
