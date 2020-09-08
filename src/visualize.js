import { takeSnapshot } from "./snapshot";

export function initVisualization(targets) {
  const proxies = {};
  const name = Symbol("variable name");
  const from = Symbol("assign from");
  Object.entries(targets).forEach(([key, target]) => {
    target[name] = key;
    proxies[key] = new Proxy(target, {
      get(t, p) {
        if (t[name] === "a" || p === "v")
          return {
            valueOf: () => t[p],
            [from]: t[name] === "$" ? p : `${t[name]}.${p}`
          };
        else return t[p];
      },
      set(t, p, v) {
        if (v[from]) {
          t[p] = v.valueOf();
          takeSnapshot(targets, {
            assign: {
              from: v[from],
              to: t[name] === "$" ? p : `${t[name]}.${p}`
            }
          });
        } else {
          t[p] = v;
          takeSnapshot(targets);
        }
        return true;
      }
    });
  });

  takeSnapshot(targets);

  return proxies;
}
