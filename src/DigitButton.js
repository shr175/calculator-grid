import { ACTIONS } from "./App"

export default function DigitButton({ dispatch, digit }) {
  return (
    //  {/*  syntax : dispatch(actionObject) */}
    
    <button onClick={() => dispatch({ type: ACTIONS.ADD_DIGIT, payload: { digit } })}> {digit} </button>
  );
};