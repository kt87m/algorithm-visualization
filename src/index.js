import React from "react";
import ReactDOM from "react-dom";

import App from "./App";

const [{ a, $ }, render] = initVisualization({
  a: [5, 2, 4, 6, 1, 3],
  $: { i: null, j: null, v: null }
});
insertionSort(a);
render();

function insertionSort(a, n = a.length) {
  for ($.i = 1; $.i < n; $.i++) {
    $.v = a[$.i];
    $.j = $.i - 1;
    while ($.j >= 0 && a[$.j] > $.v) {
      a[$.j + 1] = a[$.j];
      $.j--;
    }
    a[$.j + 1] = $.v;
  }
}

function initVisualization(targets) {
  const keys = [];
  const proxies = {};
  const setTrap = (t, p, v, r) => {
    t[p] = v;
    takeSnapshot();
    return true;
  };
  Object.entries(targets).forEach(([k, v]) => {
    keys.push(k);
    proxies[k] = new Proxy(v, { set: setTrap });
  });

  const snapshots = [];
  let cursor = 0;
  function takeSnapshot() {
    const snapshot = {};
    keys.forEach((k) => {
      snapshot[k] = deepCopy(targets[k]);
    });
    snapshots.push(snapshot);
  }
  function getSnapshot(n) {
    return snapshots[n];
  }
  function prev() {
    if (cursor <= 0) return;
    cursor--;
    render();
  }
  function next() {
    if (cursor >= snapshots.length - 1) return;
    cursor++;
    render();
  }
  function reset() {
    cursor = 0;
    render();
  }

  function deepCopy(v) {
    if (v === null || typeof v !== "object") return v;
    const _v = Array.isArray(v) ? [] : {};
    Object.keys(v).forEach((k) => {
      _v[k] = deepCopy(v[k]);
    });
    return _v;
  }

  takeSnapshot();
  const rootElement = document.getElementById("root");

  function render() {
    ReactDOM.render(
      <React.StrictMode>
        <App
          snapshot={getSnapshot(cursor)}
          step={{ current: cursor, length: snapshots.length }}
          callback={{ prev, next, reset }}
        />
      </React.StrictMode>,
      rootElement
    );
  }

  return [proxies, render];
}
