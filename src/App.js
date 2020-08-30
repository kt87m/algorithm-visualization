import React from "react";
import "./styles.css";

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
      <div className="viewport">
        <div className="cursors">
          {i != null && <div style={{ left: i * 50 + 12.5 }}>i</div>}
          {j != null && <div style={{ left: j * 50 + 12.5 }}>j</div>}
        </div>
        <div className="align-center">
          <div style={{ position: "absolute", right: "100%", width: 85 }}>
            <span className="variable">a</span> =
          </div>
          <div className="array">
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
                  style={{ background: `hsl(${n * 30}deg, 80%, 45%)` }}
                >
                  {n}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="cache align-center">
          <span className="variable">v</span> =
          <span
            className="cacheInner"
            style={{
              background:
                v == null ? "transparent" : `hsl(${v * 30}deg, 80%, 45%)`
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
  );
}
