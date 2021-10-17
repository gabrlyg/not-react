const hooks = [];
let currentHook = 0;

type BasicStateAction<S> = (arg0: S) => S | S;
type Dispatch<A> = (A) => void;

const basicStateReducer = <S>(state: S, action: BasicStateAction<S>) => {
  return typeof action === "function" ? action(state) : action;
};

const useReducer = <S, I, A>(
  reducer: (S, A) => S,
  initialState: I
): [S, Dispatch<A>] => {
  const index = currentHook;
  let state = hooks[index] || initialState;
  const dispatch: Dispatch<A> = (action: A) => {
    const newState = reducer(state, action);
    hooks[index] = newState;
  };
  currentHook++;
  return [state, dispatch];
};

const useState = <S>(
  initialState: (() => S) | S
): [S, Dispatch<BasicStateAction<S>>] => {
  // const setStateHookIndex = currentHook;
  // let state = hooks[setStateHookIndex] || initialState;
  // currentHook++;
  // const setState = (newState) => {
  //   hooks[setStateHookIndex] = newState;
  // };
  // return [state, setState];
  return useReducer(basicStateReducer, initialState);
};

const useEffect = (callback: Function, depsArray: any[]) => {
  const hasNoDeps = !depsArray;
  const currentEffectDeps = hooks[currentHook];
  const hasChangedDeps = currentEffectDeps
    ? !depsArray.every((item, index) =>
        Object.is(item, currentEffectDeps[index])
      )
    : true;
  if (hasNoDeps || hasChangedDeps) {
    callback();
    hooks[currentHook] = depsArray;
  }
  currentHook++;
};

const render = (FunctionComponent) => {
  let result = FunctionComponent();
  result.render();
  currentHook = 0;
  return result;
};

// const createContext = (defaultValue) => {
//   const context = {
//     value: defaultValue,
//     Provider: null,
//     Consumer: null
//   }

//   return context
// }

export { useState, useEffect, render };
