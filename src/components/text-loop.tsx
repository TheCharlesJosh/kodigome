"use client";
import { cn } from "@/lib/utils";
import {
  Children,
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { useMeasure } from "react-use";
import { motion, useTime, useTransform } from "motion/react";

export default function TextLoop({
  duration = 1,
  children,
}: {
  duration?: number;
  children: ReactNode;
}) {
  const [childList, setChildList] = useState<{
    [name: string]: { width: number; height: number };
  }>({});
  const maxChild = Object.keys(childList).length;

  const time = useTime();
  const cw = useTransform(() => {
    const index = Math.floor(time.get() / (duration * 1000)) % maxChild;
    return childList[index]?.width ?? 0;
  });

  const ch = useTransform(() => {
    const index = Math.floor(time.get() / (duration * 1000)) % maxChild;
    return childList[index]?.height ?? 0;
  });

  return (
    <motion.div
      key={JSON.stringify(childList)}
      className="relative inline-block align-top"
      style={{
        transition: "width 150ms linear",
        width: cw,
        height: ch,
      }}
    >
      {Children.map(children, (child, index) => {
        return (
          <LoopChildWrapper
            childList={childList}
            setChildList={setChildList}
            index={index}
            maxChild={maxChild}
            duration={duration}
          >
            {child}
          </LoopChildWrapper>
        );
      })}
    </motion.div>
  );
}

function LoopChildWrapper({
  childList,
  setChildList,
  index,
  maxChild,
  duration = 1,
  children,
}: {
  childList: {
    [name: string]: {
      width: number;
      height: number;
    };
  };
  setChildList: Dispatch<
    SetStateAction<{ [name: string]: { width: number; height: number } }>
  >;
  index: number;
  maxChild: number;
  duration?: number;
  children: ReactNode;
}) {
  const [ref, { width, height }] = useMeasure<HTMLDivElement>();

  useEffect(() => {
    if (!childList[index]?.width || !childList[index]?.height) {
      setChildList((childList) => ({
        ...childList,
        [index]: { width, height },
      }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [height, width]);

  return (
    <motion.div
      ref={ref}
      className={cn(
        "absolute left-0 top-0 inline-block origin-center whitespace-nowrap"
      )}
      initial={false}
      animate={{
        opacity: [0, 1, 1, 0],
        y: [`${height}px`, "0px", "0px", `-${height}px`],
        transition: {
          duration: duration,
          delay: index * duration,
          repeat: Infinity,
          repeatDelay: (maxChild - 1) * duration,
          times: [0, 0.1, 0.9, 1],
        },
      }}
    >
      {children}
    </motion.div>
  );
}
