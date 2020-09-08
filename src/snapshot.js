import { useState } from "react";

const snapshots = [];

export function takeSnapshot(variables, operation) {
  const snapshot = {};
  for (const k in variables) {
    snapshot[k] = deepCopy(variables[k]);
  }
  snapshot[Symbol.for("operation")] = operation;
  snapshots.push(snapshot);
}

function deepCopy(v) {
  if (v === null || typeof v !== "object") return v;
  const _v = new v.constructor();
  Object.keys(v).forEach((k) => {
    _v[k] = deepCopy(v[k]);
  });
  return _v;
}

export function useSnapshot() {
  const [cursor, setCursor] = useState(0);
  const controller = {
    prev() {
      if (cursor <= 0) return;
      setCursor(cursor - 1);
    },
    next() {
      if (cursor >= snapshots.length - 1) return;
      setCursor(cursor + 1);
    },
    reset() {
      setCursor(0);
    },
    get cursor() {
      return cursor;
    },
    get length() {
      return snapshots.length;
    }
  };

  return { snapshot: snapshots[cursor], controller };
}
