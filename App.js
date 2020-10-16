import React from 'react';
import TodoScreen from './src/TodoScreen';
import { Provider } from "react-redux";
import { store } from "./src/store";

const App = () => {
  return (
    <Provider store={store}>
      <TodoScreen/>
    </Provider>
  );
}

export default App;
