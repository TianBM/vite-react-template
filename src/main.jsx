import React from 'react'
import ReactDOM from 'react-dom'
import { RecoilRoot } from 'recoil'

import './index.css'

import App from './router';

ReactDOM.render(
  <React.StrictMode>
    <React.Suspense fallback={<div>loading...</div>}>
      <RecoilRoot>
          <App />
      </RecoilRoot>
    </React.Suspense>
  </React.StrictMode>,
  document.getElementById('root')
)
