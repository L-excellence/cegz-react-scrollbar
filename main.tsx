import React, { useEffect, useRef } from "react";
import ReactDOM from "react-dom/client";
import "./main.scss";
import Scrollbar from "./lib";
// import Scrollbar from "./dist/index.mjs";

function App() {
  const scrollEle = useRef<HTMLDivElement>(null);
  useEffect(() => {
    // console.log("scrollEle: ", scrollEle);
    // scrollEle.current!.scrollTop = 200;
  }, []);

  return (
    <div className="box">
      <Scrollbar wrapRef={scrollEle} style={{ width: 800, height: 500, background: "aliceblue" }}>
        {new Array(20).fill(0).map((item, index) => (
          <li key={index} style={{ width: 1000, height: 50 }}>
            item {index + 1}
          </li>
        ))}
      </Scrollbar>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.Fragment>
    <App />
  </React.Fragment>
);
