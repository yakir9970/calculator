import { useReducer } from "react";
import DigitButton from "./Components/DigitButton.js";
import OperationButton from "./Components/OperationButton";
import "./styles.css";

export const ACTIONS = {
  ADD_DIGIT: "add-digit",
  CHOOSE_OPERATION: "choose-operation",
  CLEAR: "clear",
  DELETE_DIGIT: "delete-digit",
  EVALUATE: "evaluate",
};

function reducer(state, { type, payload }) {
  switch (type) {
    case ACTIONS.ADD_DIGIT:
      if (state.overWrite) {
        return {
          ...state,
          currentOperand: payload.digit,
          overWrite: false,
        };
      }
      if (payload.digit === "0" && state.currentOperand === "0") {
        return state;
      }
      if (payload.digit === "." && state.currentOperand.includes(".")) {
        return state;
      }
      return {
        ...state,
        currentOperand: `${state.currentOperand || ""}${payload.digit}`,
      };
    case ACTIONS.CHOOSE_OPERATION:
      if (state.currentOperand == null && state.previousOperand == null) {
        return state;
      }
      if (
        state.currentOperand.charAt(state.currentOperand.length - 1) === "."
      ) {
        return state;
      }
      if (state.previousOperand == null) {
        return {
          ...state,
          operation: payload.operation,
          previousOperand: state.currentOperand,
          currentOperand: null,
        };
      }
      if (state.currentOperand == null) {
        return {
          ...state,
          operation: payload.operation,
        };
      }

      return {
        ...state,
        previousOperand: evaluate(state),
        operation: payload.operation,
        currentOperand: null,
      };

    case ACTIONS.CLEAR:
      return {};

    case ACTIONS.DELETE_DIGIT:
      if (state.overWrite) {
        return {
          ...state,
          overWrite: false,
          currentOperand: null,
        };
      }
      if (state.currentOperand == null) {
        return state;
      }
      if (state.currentOperand.length === 1) {
        return {
          ...state,
          currentOperand: null,
        };
      }

      return {
        ...state,
        currentOperand: state.currentOperand.slice(0, -1),
      };

    case ACTIONS.EVALUATE:
      if (
        state.operation == null ||
        state.currentOperand == null ||
        state.previousOperand == null
      ) {
        return state;
      }

      return {
        ...state,
        overWrite: true,
        previousOperand: null,
        operation: null,
        currentOperand: evaluate(state),
      };

    default:
      return state;
  }
}

function evaluate({ currentOperand, previousOperand, operation }) {
  const prev = parseFloat(previousOperand);
  const curr = parseFloat(currentOperand);
  if (isNaN(prev) || isNaN(curr)) {
    return "";
  }
  let res = "";
  switch (operation) {
    case "+":
      res = prev + curr;
      break;
    case "-":
      res = prev - curr;
      break;
    case "x":
      res = prev * curr;
      break;
    case "÷":
      res = prev / curr;
      break;
    default:
      break;
  }
  return ((res * 10) / 10).toString();
}

const INTEGER_FORMATTER = new Intl.NumberFormat("en-us", {
  maximumFractionDigits: 0,
});

function formatOperand(operand) {
  if (operand == null) {
    return;
  }
  const [integer, decimal] = operand.split(".");
  if (decimal == null) {
    return INTEGER_FORMATTER.format(integer);
  }
  return `${INTEGER_FORMATTER.format(integer)}.${decimal}`;
}

function App() {
  const [{ currentOperand, previousOperand, operation }, dispatch] = useReducer(
    reducer,
    {}
  );
  return (
    <>
      <div className="headline">My Calculator!</div>
      <div className="calc-grid">
        <div className="output">
          <div className="prev-op">
            {formatOperand(previousOperand)} {operation}
          </div>
          <div className="curr-op">{formatOperand(currentOperand)}</div>
        </div>
        <button
          className="span-two light"
          onClick={() => dispatch({ type: ACTIONS.CLEAR })}
        >
          AC
        </button>
        <button
          className="light"
          onClick={() => dispatch({ type: ACTIONS.DELETE_DIGIT })}
        >
          DEL
        </button>
        <OperationButton className="orange" operation="÷" dispatch={dispatch}>
          ÷
        </OperationButton>
        <DigitButton className="dark" digit="7" dispatch={dispatch} />
        <DigitButton className="dark" digit="8" dispatch={dispatch} />
        <DigitButton className="dark" digit="9" dispatch={dispatch} />
        <OperationButton className="orange" operation="x" dispatch={dispatch}>
          x
        </OperationButton>
        <DigitButton className="dark" digit="4" dispatch={dispatch} />
        <DigitButton className="dark" digit="5" dispatch={dispatch} />
        <DigitButton className="dark" digit="6" dispatch={dispatch} />
        <OperationButton className="orange" operation="-" dispatch={dispatch}>
          -
        </OperationButton>
        <DigitButton className="dark" digit="1" dispatch={dispatch} />
        <DigitButton className="dark" digit="2" dispatch={dispatch} />
        <DigitButton className="dark" digit="3" dispatch={dispatch} />
        <OperationButton className="orange" operation="+" dispatch={dispatch}>
          +
        </OperationButton>
        <DigitButton className="dark" digit="0" dispatch={dispatch} />
        <DigitButton className="dark" digit="." dispatch={dispatch} />
        <button
          className="span-two orange"
          operation="="
          dispatch={dispatch}
          onClick={() => dispatch({ type: ACTIONS.EVALUATE })}
        >
          =
        </button>
      </div>
    </>
  );
}

export default App;
