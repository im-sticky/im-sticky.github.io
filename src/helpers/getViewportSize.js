export const getViewportSize = () => ({
  width: document.documentElement.clientWidth || document.body.clientWidth || window.innerWidth,
  height: document.documentElement.clientHeight || document.body.clientHeight || window.innerHeight,
});