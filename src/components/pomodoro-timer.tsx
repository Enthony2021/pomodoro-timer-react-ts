import React, { useEffect } from 'react';
import { useInterval } from '../hooks/use-interval';
import { Button } from './button';
import { Timer } from './timer';
import { secondsToTime } from '../Utils/seconds-to-time';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const bellStart = require('../sounds/bell-start.mp3');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const bellFinish = require('../sounds/bell-finish.mp3');

const audioStartWorking: HTMLAudioElement = new Audio(bellStart);
const audioStopWorking: HTMLAudioElement = new Audio(bellFinish);

interface Props {
  pomodoroTime: number;
  shortRestTime: number;
  longRestTime: number;
  cycles: number;
}

export function PomodoroTimer(props: Props) {
  const [mainTime, setMainTime] = React.useState(props.pomodoroTime);
  const [timeCounting, setTimeCounting] = React.useState(false);
  const [working, setWorking] = React.useState(false);
  const [resting, setResting] = React.useState(false);
  const [cyclesQtdManager, setCyclesQtdManager] = React.useState(
    new Array(props.cycles - 1).fill(true),
  );
  const [completedCycles, setCompletedCycles] = React.useState(0);
  const [fullWorkingTime, setFullWorkingTime] = React.useState(0);
  const [numberOfPomodoros, setNumberOfPomodoros] = React.useState(0);

  useInterval(
    () => {
      setMainTime(mainTime - 1);
    },
    timeCounting ? 1000 : null,
  );

  const configureWorking = (): void => {
    setTimeCounting(true);
    setWorking(true);
    setResting(false);
    setMainTime(props.pomodoroTime);
    audioStartWorking.play();
  };

  const configureResting = (long: boolean): void => {
    setTimeCounting(true);
    setWorking(false);
    setResting(true);
    audioStopWorking.play();

    if (long) {
      setMainTime(props.longRestTime);
    } else {
      setMainTime(props.shortRestTime);
    }
  };

  useEffect(() => {
    if (working) document.body.classList.add('working');
    if (resting) document.body.classList.remove('working');

    if (mainTime > 0) return;

    if (working && cyclesQtdManager.length > 0) {
      configureResting(false);
      cyclesQtdManager.pop();
    } else if (working && cyclesQtdManager.length <= 0) {
      configureResting(true);
      setCyclesQtdManager(new Array(props.cycles - 1).fill(true));
      setCompletedCycles(completedCycles + 1);
    }

    if (working) setNumberOfPomodoros(numberOfPomodoros + 1);
    if (resting) configureWorking();
  }, [
    working,
    resting,
    mainTime,
    cyclesQtdManager,
    completedCycles,
    numberOfPomodoros,
    configureResting,
    setCyclesQtdManager,
    setCyclesQtdManager,
    configureWorking,
    props.cycles,
  ]);

  return (
    <div className="pomodoro">
      <h2>You are: Working</h2>
      <Timer mainTimer={mainTime} />

      <div className="controls">
        <Button text="Work" onClick={() => configureWorking()} />
        <Button text="Rest" onClick={() => configureResting(false)} />
        <Button
          className={!working && !resting ? 'hidden' : ''}
          text={timeCounting ? 'Pause' : 'Play'}
          onClick={() => setTimeCounting(!timeCounting)}
        />
      </div>

      <div className="details">
        <p>Ciclos Concluídos: {completedCycles}</p>
        <p>Horas trabalhadas: {secondsToTime(fullWorkingTime)}</p>
        <p>Pomodoros Concluídos: {numberOfPomodoros}</p>
      </div>
    </div>
  );
}
