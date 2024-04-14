# cegz-react-scrollbar

> A custom scroll bar component based on React.

## Install

Install from the [npm registry](https://www.npmjs.com/) with your package manager:

```bash
npm install cegz-react-scrollbar
# or
yarn add cegz-react-scrollbar
# or
pnpm add cegz-react-scrollbar
```

## Usage

```js
import React from "react";
import ReactDOM from "react-dom/client";
import Scrollbar from "cegz-react-scrollbar";

function App() {
  return (
    <Scrollbar style={{ width: 800, height: 500, background: "aliceblue" }}>
      {new Array(20).fill(0).map((item, index) => (
        <li key={index} style={{ width: 1000, height: 50 }}>
          item {index + 1}
        </li>
      ))}
    </Scrollbar>
  );
}

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.Fragment>
    <App />
  </React.Fragment>
);
```
