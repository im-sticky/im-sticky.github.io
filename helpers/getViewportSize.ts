interface IViewport {
  width: number;
  height: number;
}

export const getViewportSize = (): IViewport => ({
  width: document.documentElement.clientWidth || document.body.clientWidth || window.innerWidth,
  height: document.documentElement.clientHeight || document.body.clientHeight || window.innerHeight,
});
