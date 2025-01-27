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
import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useTime,
  useTransform,
} from "motion/react";

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
  // const [_selectedIndex, setSelectedIndex] = useState<number>(0);
  // const containerWidth = useMotionValue(0);
  // const containerHeight = useMotionValue(0);

  // useEffect(() => {
  //   const maxChild = Object.keys(childList).length;
  //   if (childList[0]) {
  //     containerWidth.set(childList[0].width);
  //     containerHeight.set(childList[0].height);
  //   }

  //   const interval = setInterval(() => {
  //     setSelectedIndex((index) => {
  //       const newIndex = (index + 1) % maxChild;
  //       containerWidth.set(childList[newIndex].width);
  //       containerHeight.set(childList[newIndex].height);
  //       return newIndex;
  //     });
  //   }, duration * 1000);

  //   return () => clearInterval(interval);
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [childList, duration]);

  const time = useTime();
  // const containerWidth = useTransform(
  //   time,
  //   Object.values(childList)
  //     .map((child) => [child.width, child.width])
  //     .flat(),
  //   Object.keys(childList)
  //     .map((order) => [Number(order), Number(order) * duration - 0.2])
  //     .flat(),
  //   { clamp: false }
  // );
  // const containerHeight = useTransform(
  //   time,
  //   Object.values(childList)
  //     .map((child) => [child.height, child.height])
  //     .flat(),
  //   Object.keys(childList)
  //     .map((order) => [Number(order), Number(order) * duration - 0.2])
  //     .flat(),
  //   { clamp: false }
  // );

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
