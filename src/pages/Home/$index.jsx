import { useState } from 'react'
import {
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from 'recoil';

import './index.css'

const textState = atom({
  key: 'textState', // unique ID (with respect to other atoms/selectors)
  default: '', // default value (aka initial value)
});

const charCountState = selector({
  key: 'charCountState', // unique ID (with respect to other atoms/selectors)
  get: ({get}) => {
    const text = get(textState);

    return text.length;
  },
});

function App() {
  const [count, setCount] = useState(0);

  const [text, setText] = useRecoilState(textState);

  const textCount = useRecoilValue(charCountState);

  const onChange = (event) => {
    setText(event.target.value);
  };

  const onClickCount = () => {
    setCount((previousState) => previousState + 1)
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src='/logo.svg' className="App-logo" alt="logo" />
        <p>Hello Vite + React!</p>
        <p>
          <button type="button" onClick={onClickCount}>
            count is: {count}
          </button>
        </p>
        <p>
          Edit <code>App.jsx</code> and save to test HMR updates.
        </p>
        <div>
          <input type="text" value={text} onChange={onChange} style={{color: 'black'}} />
          <br />
          Echo: {text}
          <p>Character Count: {textCount}</p>
        </div>
        <p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
          {' | '}
          <a
            className="App-link"
            href="https://vitejs.dev/guide/features.html"
            target="_blank"
            rel="noopener noreferrer"
          >
            Vite Docs
          </a>
        </p>
        <h1 className="text-4xl font-bold underline">
          Hello world!
        </h1>
      </header>
    </div>
  )
}

export default App
