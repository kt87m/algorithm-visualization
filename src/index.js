import { initVisualization } from "./visualize";
import { render } from "./render";

const { a, $ } = initVisualization({
  a: [5, 2, 4, 6, 1, 3],
  $: { i: null, j: null, v: null }
});
insertionSort(a);
render();

function insertionSort(a) {
  const n = a.length;
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
