import { useCallback, useReducer } from "react";

interface InputState {
  value: string;
  isValid: boolean;
}

interface FormState {
  inputs: Record<string, InputState>;
  isValid: boolean;
}

type FormAction =
  | {
      type: "INPUT_CHANGE";
      inputId: string;
      value: string;
      isValid: boolean;
    }
  | {
      type: "SET_DATA";
      inputs: Record<string, InputState>;
      formIsValid: boolean;
    }
  | {
      type: "RESET";
      formState: FormState;
    };

const formReducer = (state: FormState, action: FormAction): FormState => {
  switch (action.type) {
    case "INPUT_CHANGE": {
      let formIsValid = true;
      for (const inputId in state.inputs) {
        if (!state.inputs[inputId]) {
          continue;
        }
        if (inputId === action.inputId) {
          formIsValid = formIsValid && action.isValid;
        } else {
          formIsValid = formIsValid && state.inputs[inputId].isValid;
        }
      }
      return {
        ...state,
        inputs: {
          ...state.inputs,
          [action.inputId]: { value: action.value, isValid: action.isValid },
        },
        isValid: formIsValid,
      };
    }
    case "SET_DATA":
      return {
        inputs: action.inputs,
        isValid: action.formIsValid,
      };
    case "RESET":
      return action.formState;
    default:
      return state;
  }
};

export const useForm = (
  initialInputs: Record<string, InputState>,
  initialFormValidity: boolean
) => {
  const [formState, dispatch] = useReducer(formReducer, {
    inputs: initialInputs,
    isValid: initialFormValidity,
  });

  const inputHandler = useCallback(
    (id: string, value: string, isValid: boolean) => {
      dispatch({
        type: "INPUT_CHANGE",
        value: value,
        isValid: isValid,
        inputId: id,
      });
    },
    []
  );

  const setFormData = useCallback(
    (inputData: Record<string, InputState>, formValidity: boolean) => {
      dispatch({
        type: "SET_DATA",
        inputs: inputData,
        formIsValid: formValidity,
      });
    },
    []
  );

  const resetForm = useCallback(
    (
      initialInputs: Record<string, InputState>,
      initialFormValidity: boolean
    ) => {
      dispatch({
        type: "RESET",
        formState: {
          inputs: initialInputs,
          isValid: initialFormValidity,
        },
      });
    },
    []
  );

  return [formState, inputHandler, setFormData, resetForm] as const;
};
