export function getAnimation(operation) {
  if (!operation || !operation.assign) return null;

  const { from, to } = operation.assign;
  const fromSelector = `[data-variable-name="${from}"]`;
  const toSelector = `[data-variable-name="${to}"]`;
  const fromRect = document.querySelector(fromSelector).getBoundingClientRect();
  const toRect = document.querySelector(toSelector).getBoundingClientRect();
  const startX = fromRect.left - toRect.left;
  const startY = fromRect.bottom - toRect.bottom;
  return `
    ${toSelector} {
      animation: assign .3s;
    }
    
    @keyframes assign {
      0% {
        transform: translate(${startX}px, ${startY}px);
      }
    }
  `;
}
