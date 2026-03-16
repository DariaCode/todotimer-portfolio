/* ----------------------------------------------------
React.js / Main index.js

Updated: 03/17/2020
Author: Daria Vodzinskaia
Website: www.dariacode.dev
-------------------------------------------------------  */


import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />);
