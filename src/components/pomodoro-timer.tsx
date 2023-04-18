import React from 'react';
import { useInterval } from '../hooks/use-interval';
import { Button } from './button';
import { Timer } from './timer';

interface Props {
  pomodoroTime: number;
  shortRestTime: number;
  longRestTime: number;
  cycles: number;
}

export function PomodoroTimer(props: Props) {
  const [mainTime, setMainTime] = React.useState(props.pomodoroTime);

  useInterval(() => {
    setMainTime(mainTime - 1);
  }, 1000);
  return (
    <div className="pomodoro">
      <h2>You are: Working</h2>
      <Timer mainTimer={mainTime} />

      <div className="controls">
        <Button text="teste" onClick={() => console.log(1)} />
        <Button text="teste" onClick={() => console.log(1)} />
        <Button text="teste" onClick={() => console.log(1)} />
      </div>

      <div className="details">
        <p>
          Testando Lorem ipsum dolor sit amet, consectetur adipisicing elit.
          Iusto qui reiciendis illo, soluta corrupti nobis magnam, aspernatur
          quae doloremque et illum sed aut doloribus, ut dicta saepe at! Rem,
          quis?
        </p>
        <p>
          Testando Lorem ipsum dolor sit amet, consectetur adipisicing elit.
          Iusto qui reiciendis illo, soluta corrupti nobis magnam, aspernatur
          quae doloremque et illum sed aut doloribus, ut dicta saepe at! Rem,
          quis?
        </p>
        <p>
          Testando Lorem ipsum dolor sit amet, consectetur adipisicing elit.
          Iusto qui reiciendis illo, soluta corrupti nobis magnam, aspernatur
          quae doloremque et illum sed aut doloribus, ut dicta saepe at! Rem,
          quis?
        </p>
        <p>
          Testando Lorem ipsum dolor sit amet, consectetur adipisicing elit.
          Iusto qui reiciendis illo, soluta corrupti nobis magnam, aspernatur
          quae doloremque et illum sed aut doloribus, ut dicta saepe at! Rem,
          quis?
        </p>
      </div>
    </div>
  );
}
