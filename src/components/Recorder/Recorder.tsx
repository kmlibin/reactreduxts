import React, { useEffect, useRef, useState } from 'react';

import { addZero } from '../../lib/utils';

//redux
import { useDispatch, useSelector } from 'react-redux';

//libraries
import cx from 'classnames';

//action creators
import { selectDateStart, start, stop } from '../../redux/recorder';

//styles
import './Recorder.css';


const Recorder: React.FC = () => {
  const dispatch = useDispatch();
  //useRef returns a number because setInterval (Below) returns a number
  let interval = useRef<number>(0);
  const [count, setCount] = useState<number>(0);

  //selectors
  const dateStart = useSelector(selectDateStart);

  //check if the recorder has started (wouldn't be an empty string)
  const started = dateStart !== '';

  const handleClick = () => {
    if (started) {
        window.clearInterval(interval.current)
        dispatch(stop())
    } else {
      dispatch(start());
      //rerender every second so timer changes on ui. need to preserve value in const from one render to the next, so use useRef hook.
      //if was just a global const, it would re-render from scratch, so it wouldn't increase (let interval = null)
      //use local state to force re-rendering. Updates the state from interval callback to re-render component
      interval.current = window.setInterval(() => {
        setCount((count) => count + 1);
      }, 1000);
    }
  };

  useEffect(() => {
    return () => {
      //cleanup effect for interval when it unmounts
      window.clearInterval(interval.current);
    };
  }, []);
  //get start time from dateStart, turn it into a date, then turn it into time, dvide by 1000 to get seconds. round with math floor.
  let seconds = started
    ? Math.floor((Date.now() - new Date(dateStart).getTime()) / 1000)
    : 0;

  const hours = seconds ? Math.floor(seconds / 60 / 60) : 0;

  seconds -= hours * 60 * 60;

  const minutes = seconds ? Math.floor(seconds / 60) : 0;

  seconds -= minutes * 60;

  return (
    <div className={cx('recorder', { 'recorder-started': started })}>
      {/* //when user clicks start button, start action should be dispatched */}
      <button onClick={handleClick} className="recorder-record">
        <span></span>
      </button>
      <div className="recorder-counter">
        {addZero(hours)}:{addZero(minutes)}:{addZero(seconds)}
      </div>
    </div>
  );
};

export default Recorder;
