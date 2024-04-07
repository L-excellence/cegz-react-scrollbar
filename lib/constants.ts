export interface IBarInfo {
  key: "vertical" | "horizontal";
  size: "height" | "width";
  axis: "Y" | "X";
  offset: "offsetHeight" | "offsetWidth";
  scroll: "scrollTop" | "scrollLeft";
  scrollSize: "scrollHeight" | "scrollWidth";
  client: "clientY" | "clientX";
  direction: "top" | "left";
}

export const BAR_MAP: Record<"vertical" | "horizontal", IBarInfo> = {
  vertical: {
    key: "vertical",
    size: "height",
    axis: "Y",
    offset: "offsetHeight",
    scroll: "scrollTop",
    scrollSize: "scrollHeight",
    client: "clientY",
    direction: "top",
  },
  horizontal: {
    key: "horizontal",
    size: "width",
    axis: "X",
    offset: "offsetWidth",
    scroll: "scrollLeft",
    scrollSize: "scrollWidth",
    client: "clientX",
    direction: "left",
  },
};
