import { takeSnapshot } from "./snapshot";

export function initVisualization(targets) {
  const proxies = {};
  Object.entries(targets).forEach(([name, target]) => {
    proxies[name] = new Proxy(target, {
      set(t, p, v) {
        t[p] = v;
        takeSnapshot(targets);
        return true;
      }
    });
  });

  takeSnapshot(targets);

  return proxies;
}
