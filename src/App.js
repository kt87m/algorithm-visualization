import React from "react";
import "./styles.css";

import { Light as SyntaxHighlighter } from "react-syntax-highlighter";
import js from "react-syntax-highlighter/dist/esm/languages/hljs/javascript";
import theme from "react-syntax-highlighter/dist/esm/styles/hljs/tomorrow-night-blue";
SyntaxHighlighter.registerLanguage("javascript", js);

export default function App({
  snapshot: {
    a,
    $: { i, j, v }
  },
  step,
  callback: { prev, next, reset }
}) {
  return (
    <div className="App">
      <h1>Insertion Sort</h1>
      <div className="algorithm">
        <div className="codeView">
          <SyntaxHighlighter
            language="javascript"
            showLineNumbers
            style={theme}
          >{`const a = [5, 2, 4, 6, 1, 3];
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
`}</SyntaxHighlighter>
        </div>
        <div className="viewer">
          <div className="viewport">
            <div className="align-center" style={{ alignItems: "flex-end" }}>
              <div
                style={{
                  position: "absolute",
                  left: 30,
                  marginBottom: 10,
                  width: 85
                }}
              >
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
                        style={{
                          height: 50 + 10 * (n - 1),
                          background: `hsl(${
                            n * (20 + 20 * Math.sin((n * Math.PI) / 27))
                          }deg, 65%, 50%)`
                        }}
                      >
                        {n}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="cache align-center">
              <span className="variable">v</span>=
              <span
                className="cacheInner"
                style={{
                  background:
                    v == null
                      ? "transparent"
                      : `hsl(${
                          v * (20 + 20 * Math.sin((v * Math.PI) / 27))
                        }deg, 80%, 45%)`
                }}
              >
                {v}
              </span>
            </div>
          </div>
          <div className="controller">
            <button
              className="material-icons reset"
              onClick={reset}
              disabled={step.current <= 0}
            >
              replay
            </button>
            <button
              className="material-icons"
              onClick={prev}
              disabled={step.current <= 0}
            >
              skip_previous
            </button>
            <span className="stepCount">
              {step.current + 1}/{step.length}
            </span>
            <button
              className="material-icons"
              onClick={next}
              disabled={step.current >= step.length - 1}
            >
              skip_next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
