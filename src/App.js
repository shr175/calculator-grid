
import { useReducer } from "react"
import DigitButton from "./DigitButton"
import OperationButton from "./OperationButton"
import "./App.css"

// global declaration 

export const ACTIONS = {
  ADD_DIGIT: "add-digit",
  CHOOSE_OPERATION: "choose-operation",
  CLEAR: "clear",
  DELETE_DIGIT: "delete-digit",
  EVALUATE: "evaluate",
}

// function reducer(state, action)

function reducer(state, { type, payload }) {
  switch (type) {

    // ....ADD DIGIT......
    case ACTIONS.ADD_DIGIT:
      if (state.overwrite) {
        return {
          ...state,
          currentOperand: payload.digit,
          overwrite: false,
        }
      };

      // ....condition for avoiding 0 as a one operand in starting

      if (payload.digit === "0" && state.currentOperand === "0") {
        return state;
      };

      // .....condition for avoiding multiple . in a single digit

      if (payload.digit === "." && state.currentOperand.includes(".")) {
        return state;
      };

      //  ...else using string manipualtion...so that all digit add a
      return {
        ...state,
        currentOperand: `${state.currentOperand || ""}${payload.digit}`,
      };

      // ....CHOOSE OPERATION...

    case ACTIONS.CHOOSE_OPERATION:
      if (state.currentOperand == null && state.previousOperand == null) {
        return state;
      };

      // ....avoiding use of operator in empty calculator Test 12

      if (state.currentOperand == null) {
        return {
          ...state,
          operation: payload.operation,
        }
      };

      if (state.previousOperand == null) {
        return {
          ...state,
          operation: payload.operation,
          previousOperand: state.currentOperand,
          currentOperand: null,
        }
      };

      // .else.....

      return {
        ...state,
        previousOperand: evaluate(state),
        operation: payload.operation,
        currentOperand: null,
      };

      // .....CLEAR....


    case ACTIONS.CLEAR:
      return {};

      // ....DELETE DIGIT...

    case ACTIONS.DELETE_DIGIT:
      if (state.overwrite) {
        return {
          ...state,
          overwrite: false,
          currentOperand: null,
        };
      };

      if (state.currentOperand == null) 
        return state;

      if (state.currentOperand.length === 1) {
        return { ...state, currentOperand: null };
      };

      return {
        ...state,
        currentOperand: state.currentOperand.slice(0, -1),
      };

      // ....EVALUATE....

    case ACTIONS.EVALUATE:
      if (
        state.operation == null ||
        state.currentOperand == null ||
        state.previousOperand == null
      ) {
        return state
      };
    // ....else....
      return {
        ...state,
        overwrite: true,
        previousOperand: null,
        operation: null,
        currentOperand: evaluate(state),
      };
  }
}

function evaluate({ currentOperand, previousOperand, operation }) {

  const prev = parseFloat(previousOperand);
  const current = parseFloat(currentOperand);

  // ....if no number found ....

  if (isNaN(prev) || isNaN(current)) 
    return "";

  let computation = "";


  // ...using switch case for performing multiple operation

  switch (operation) {
    case "+":
      computation = prev + current;
      break;
    case "-":
      computation = prev - current;
      break;
    case "*":
      computation = prev * current;
      break;
    case "÷":
      computation = prev / current;
      break;
  }

  return computation.toString();
}
//  const [state, dispatch] = useReducer(reducer, initialState);

function App() {
  const [{ currentOperand, previousOperand, operation }, dispatch] = useReducer(reducer, {} );

  return (
    <div className="calculator-grid">

      <div className="output">
        <div className="previous-operand">{previousOperand} {operation}</div>
        <div className="current-operand">{currentOperand}</div>
      </div>

       {/*  syntax : dispatch(actionObject) */}
      <button className="span-two" onClick={() => dispatch({ type: ACTIONS.CLEAR })}> AC </button>

      <button onClick={() => dispatch({ type: ACTIONS.DELETE_DIGIT })}> DEL </button>

      <OperationButton operation="÷" dispatch={dispatch} />

      <DigitButton digit="1" dispatch={dispatch} />
      <DigitButton digit="2" dispatch={dispatch} />
      <DigitButton digit="3" dispatch={dispatch} />

      <OperationButton operation="*" dispatch={dispatch} />

      <DigitButton digit="4" dispatch={dispatch} />
      <DigitButton digit="5" dispatch={dispatch} />
      <DigitButton digit="6" dispatch={dispatch} />

      <OperationButton operation="+" dispatch={dispatch} />

      <DigitButton digit="7" dispatch={dispatch} />
      <DigitButton digit="8" dispatch={dispatch} />
      <DigitButton digit="9" dispatch={dispatch} />

      <OperationButton operation="-" dispatch={dispatch} />

      <DigitButton digit="." dispatch={dispatch} />
      <DigitButton digit="0" dispatch={dispatch} />
      
      <button className="span-two" onClick={() => dispatch({ type: ACTIONS.EVALUATE })}> = </button>

    </div>
  );
};

export default App;