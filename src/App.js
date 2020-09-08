import React from "react";
import "./styles.css";

import { useSnapshot } from "./snapshot";
import { getAnimation } from "./animation";

import { Light as SyntaxHighlighter } from "react-syntax-highlighter";
import js from "react-syntax-highlighter/dist/esm/languages/hljs/javascript";
import theme from "react-syntax-highlighter/dist/esm/styles/hljs/tomorrow-night-blue";
SyntaxHighlighter.registerLanguage("javascript", js);

export default function App() {
  const {
    snapshot: {
      a,
      $: { i, j, v },
      [Symbol.for("operation")]: operation
    },
    controller
  } = useSnapshot();

  const animation = getAnimation(operation);

  const getValueHue = (n) => n * (20 + 20 * Math.sin((n * Math.PI) / 27));
  const skip = (e) => {
    if (e.key === "ArrowLeft") controller.prev();
    else if (e.key === "ArrowRight") controller.next();
  };

  return (
    <div className="App">
      <style>{animation}</style>
      <h1>Insertion Sort</h1>
      <div className="algorithm">
        <div className="codeView">
          <SyntaxHighlighter
            language="javascript"
            showLineNumbers
            style={theme}
          >
            {`const a = [5, 2, 4, 6, 1, 3];
insertionSort(a);

function insertionSort(a) {
  const n = a.length;
  for (let i = 1; i < n; i++) {
    const v = a[i];
    let j = i-1;
    while (j >= 0 && a[j] > v) {
      a[j+1] = a[j];
      j--;
    }
    a[j+1] = v;
  }
}
`}
          </SyntaxHighlighter>
        </div>
        <div className="viewer">
          <div className="viewport">
            <div className="align-center" style={{ alignItems: "flex-end" }}>
              <div className="arrayVariable">
                <span className="variable">a</span>=
              </div>
              <div className="array">
                <div className="cursors">
                  {i != null && <div style={{ left: i * 50 + 12.5 }}>i</div>}
                  {j != null && <div style={{ left: j * 50 + 12.5 }}>j</div>}
                </div>
                <div style={{ position: "relative" }}>
                  <div className="array__index">
                    <div>-1</div>
                    {a.map((n, i) => (
                      <div key={i}>{i}</div>
                    ))}
                    <div>{a.length}</div>
                  </div>
                  <div className="array__ele">
                    {a.map((n, i) => (
                      <div
                        key={i}
                        data-variable-name={`a.${i}`}
                        style={{
                          height: 50 + 10 * (n - 1),
                          background: `hsl(${getValueHue(n)}deg, 65%, 50%)`
                        }}
                      >
                        {n}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="align-center" style={{ marginTop: 50 }}>
              <span className="variable">v</span>=
              <span className="cache">
                <span
                  className="cacheInner"
                  data-variable-name="v"
                  style={{
                    background:
                      v === null
                        ? "transparent"
                        : `hsl(${getValueHue(v)}deg, 80%, 45%)`
                  }}
                >
                  {v}
                </span>
              </span>
            </div>
          </div>
          <div className="controller" tabIndex={0} onKeyDown={skip}>
            <button
              className={`material-icons reset ${
                controller.cursor <= 0 && "disabled"
              }`}
              onClick={controller.reset}
            >
              replay
            </button>
            <button
              className={`material-icons ${
                controller.cursor <= 0 && "disabled"
              }`}
              onClick={controller.prev}
            >
              skip_previous
            </button>
            <span className="stepCount">
              {controller.cursor + 1}/{controller.length}
            </span>
            <button
              className={`material-icons ${
                controller.cursor >= controller.length - 1 && "disabled"
              }`}
              onClick={controller.next}
            >
              skip_next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
