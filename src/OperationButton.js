
import { ACTIONS } from "./App"

export default function OperationButton({ dispatch, operation }) {
  return (
    
    //  {/*  syntax : dispatch(actionObject) */}
    <button onClick={() =>dispatch({ type: ACTIONS.CHOOSE_OPERATION, payload: { operation } })}> {operation} </button>
  );
};