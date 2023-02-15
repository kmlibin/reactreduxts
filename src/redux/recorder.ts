import { Action } from 'redux';
import { RootState } from './store';

//define type of state reducer should manage

interface RecorderState {
  dateStart: string;
}

//create action types

const START = 'recorder/start';
const STOP = 'recorder/stop';

//describe action objects

type StartAction = Action<typeof START>;
type StopAction = Action<typeof STOP>;

//describe action creators

export const start = (): StartAction => ({
  type: START,
});

export const stop = (): StopAction => ({
  type: STOP,
});

//create selector functions.
export const selectRecorderState =(rootState: RootState) => {
    return rootState.recorder;
}

export const selectDateStart = (rootState: RootState) => {
    return selectRecorderState(rootState).dateStart;
};

//initial state
const initialState: RecorderState = {
  dateStart: '',
};

const recorderReducer = (
  state: RecorderState = initialState,
  action: StartAction | StopAction
) => {
  switch (action.type) {
    case START:
      return { ...state, dateStart: new Date().toISOString() };
    case STOP:
      //indicates the recorder is not running
      return { ...state, dateStart: '' };
    default:
      return state;
  }
};

export default recorderReducer;
