import { Children, ReactNode } from "react";

export default function TextLoop({ children }: { children: ReactNode }) {
  return (
    <div className="relative inline-block align-top">
      <div style={{ transition: "width 150ms linear" }}>
        {Children.map(children, (child) => {
          return (
            <div
              className="absolute left-0 top-0 whitespace-nowrap"
              style={{ opacity: 1, transform: `translateY()` }}
            >
              {child}
            </div>
          );
        })}
      </div>
    </div>
  );
}
