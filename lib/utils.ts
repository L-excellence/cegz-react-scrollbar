import { IBarInfo } from "./constants";

let scrollBarWidth: number | undefined;
export function getScrollBarWidth() {
  if (scrollBarWidth !== undefined) return scrollBarWidth;

  // 创建一个用于测试的元素
  const outer = document.createElement("div");
  outer.style.visibility = "hidden";
  outer.style.width = "100px";
  outer.style.position = "absolute";
  outer.style.top = "-9999px";
  document.body.appendChild(outer);

  // 获取元素的内部宽度
  const widthNoScroll = outer.offsetWidth;
  // 强制显示滚动条
  outer.style.overflow = "scroll";

  // 创建一个内部元素
  const inner = document.createElement("div");
  inner.style.width = "100%";
  outer.appendChild(inner);

  // 获取带有滚动条的宽度
  const widthWithScroll = inner.offsetWidth;
  // 移除测试元素
  outer.parentNode!.removeChild(outer);
  // 计算滚动条宽度
  scrollBarWidth = widthNoScroll - widthWithScroll;

  return scrollBarWidth;
}

export function renderThumbStyle({ move, size, bar }: { move: number; size: string; bar: IBarInfo }) {
  const style: React.CSSProperties = {};
  const translate = `translate${bar.axis}(${move}%)`;
  style[bar.size] = size;
  style.transform = translate;
  style.msTransform = translate;
  style.WebkitTransform = translate;
  return style;
}

// 防抖函数
export function debounce(time: number, fn: Function) {
  let timer: undefined | number;
  return function (...args: unknown[]) {
    clearTimeout(timer);
    timer = window.setTimeout(() => {
      fn.apply(this, args);
    }, time);
  };
}

// 添加 ResizeObserver
export const addResizeListener = function (element: HTMLElement, fn: Function) {
  (element as any).__ro__ = new ResizeObserver(debounce(16, fn));
  (element as any).__ro__.observe(element);
};

// 销毁 ResizeObserver
export const removeResizeListener = function (element: HTMLElement) {
  (element as any).__ro__.disconnect();
};
