import React, { useState, useRef, useEffect, UIEvent, MouseEvent as ReactMouseEvent } from "react";
import classNames from "classnames";
import { BAR_MAP } from "./constants";
import { renderThumbStyle } from "./utils";

export interface IBarProps {
  size: string;
  move: number;
  wrapEle: React.RefObject<HTMLDivElement>;
  vertical?: boolean;
}

function Bar(props: IBarProps) {
  const { wrapEle, vertical, size, move } = props;
  const barEle = useRef<HTMLDivElement>(null);
  const thumbEle = useRef<HTMLDivElement>(null);
  const bar = BAR_MAP[vertical ? "vertical" : "horizontal"];
  const thumbStyle = renderThumbStyle({ size, bar, move });
  const startMove = useRef<Record<"X" | "Y", number>>({ X: 0, Y: 0 });

  const handleBarClick = (event: ReactMouseEvent<HTMLDivElement>) => {
    const target = barEle.current!;
    const offset = event[bar.client] - target.getBoundingClientRect()[bar.direction];
    const thumbClickPosition = thumbEle.current![bar.offset] / 2;
    const thumbPositionPercentage = ((offset - thumbClickPosition) * 100) / target[bar.offset];
    wrapEle.current![bar.scroll] = (thumbPositionPercentage * wrapEle.current![bar.scrollSize]) / 100;
  };

  const handleThumbClick = (event: ReactMouseEvent<HTMLDivElement>) => {
    if (event.ctrlKey || event.button === 2) {
      return;
    }
    startMove.current[bar.axis] = event[bar.client] - thumbEle.current!.getBoundingClientRect()[bar.direction];
    startDrag(event);
  };

  const startDrag = (event: ReactMouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    document.addEventListener("mousemove", handleMousemove);
    document.addEventListener("mouseup", handleMouseup);
    document.onselectstart = () => false;
  };

  const handleMousemove = (event: MouseEvent) => {
    const target = barEle.current!;
    const offset = event[bar.client] - target.getBoundingClientRect()[bar.direction];
    const thumbClickPosition = startMove.current[bar.axis];
    const thumbPositionPercentage = ((offset - thumbClickPosition) * 100) / target[bar.offset];
    wrapEle.current![bar.scroll] = (thumbPositionPercentage * wrapEle.current![bar.scrollSize]) / 100;
  };

  const handleMouseup = () => {
    startMove.current[bar.axis] = 0;
    document.removeEventListener("mousemove", handleMousemove);
    document.removeEventListener("mouseup", handleMouseup);
    document.onselectstart = null;
  };

  return (
    <div className={classNames("cegz-scrollbar-bar", `is-${bar.key}`)} ref={barEle} onMouseDown={handleBarClick}>
      <div className={classNames("cegz-scrollbar-thumb")} style={thumbStyle} ref={thumbEle} onMouseDown={handleThumbClick}></div>
    </div>
  );
}

export default Bar;
