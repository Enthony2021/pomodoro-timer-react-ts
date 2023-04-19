import React from 'react';
import { secondsToMinutes } from '../Utils/seconds-to-minutes';

interface Props {
  mainTimer: number;
}

export function Timer(props: Props) {
  return <div className="timer">{secondsToMinutes(props.mainTimer)}</div>;
}
