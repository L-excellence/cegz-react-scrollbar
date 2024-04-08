import React, { useState, useRef, useEffect, UIEvent, MouseEvent as ReactMouseEvent } from "react";
import "./index.scss";
import classNames from "classnames";
import Bar from "./Bar";
import { addResizeListener, getScrollBarWidth, removeResizeListener } from "./utils";

export interface IScrollbarProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  wrapClass?: string;
  wrapStyle?: React.CSSProperties;
  viewClass?: string;
  onScroll?: React.UIEventHandler<HTMLDivElement>;
}

function Scrollbar(props: IScrollbarProps) {
  const { className, style = {}, wrapClass, viewClass, wrapStyle = {}, onScroll, children } = props;
  const containerEle = useRef<HTMLDivElement>(null); // 外层容器
  const wrapEle = useRef<HTMLDivElement>(null); // 滚动容器
  const viewEle = useRef<HTMLDivElement>(null); // 内容容器
  const [size, setSize] = useState<Record<"width" | "height", string>>({ width: "", height: "" });
  const [move, setMove] = useState<Record<"x" | "y", number>>({ x: 0, y: 0 });

  useEffect(() => {
    computedSize();
    addResizeListener(viewEle.current!, computedSize);
    return () => {
      viewEle.current && removeResizeListener(viewEle.current);
    };
  }, []);

  const computedSize = () => {
    let heightPercentage, widthPercentage;
    const wrap = wrapEle.current;
    if (!wrap) return;

    heightPercentage = (wrap.clientHeight * 100) / wrap.scrollHeight;
    widthPercentage = (wrap.clientWidth * 100) / wrap.scrollWidth;
    setSize({
      height: heightPercentage < 100 ? heightPercentage + "%" : "",
      width: widthPercentage < 100 ? widthPercentage + "%" : "",
    });
  };

  const handleScroll = (event: UIEvent<HTMLDivElement>) => {
    const wrap = wrapEle.current!;
    setMove({
      y: (wrap.scrollTop * 100) / wrap.clientHeight,
      x: (wrap.scrollLeft * 100) / wrap.clientWidth,
    });
    onScroll && onScroll(event);
  };

  const gutter = getScrollBarWidth();
  if (gutter && containerEle.current) {
    // Set CSS variable with the scrollbar width
    containerEle.current.style.setProperty("--scrollbar-width", gutter + "px");
  }

  return (
    <div className={classNames("cegz-scrollbar", className)} ref={containerEle} style={style}>
      <div
        className={classNames("cegz-scrollbar-view-wrap", wrapClass, { "cegz-scrollbar-view-wrap__hidden-default": !gutter })}
        style={wrapStyle}
        onScroll={handleScroll}
        ref={wrapEle}>
        <div className={classNames("cegz-scrollbar-view", viewClass)} ref={viewEle}>
          {children}
        </div>
      </div>
      <Bar wrapEle={wrapEle} size={size.width} move={move.x} />
      <Bar wrapEle={wrapEle} vertical size={size.height} move={move.y} />
    </div>
  );
}

export default Scrollbar;
