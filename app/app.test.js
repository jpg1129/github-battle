import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import '@testing-library/jest-dom';

import { App } from './index.js';
let container = null;

beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement('div');
  container.setAttribute('id', 'root'); // <div id="app">...
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove(); // remove
  container = null;
});

test('App component', () => {
  // render and prepare
  act(() => {
    render(<App />, container);
  });
  const divElem = container.querySelector('div');
  expect(divElem).toHaveTextContent('Jimmy World!');
});
