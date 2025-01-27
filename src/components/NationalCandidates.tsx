import { PositionEnum } from "../lib/CandidateTypes";
import national from "@public/candidates/national.json";
import { CandidateGroup } from "./CandidateGroup";

export const NationalCandidates = () => {
  const positions = Object.keys(national) as Array<PositionEnum>;
  return (
    <div className="">
      <h2 className="py-2 text-center text-2xl font-bold uppercase">
        National Posts
      </h2>
      {positions.map((position, index) => {
        return (
          <CandidateGroup
            position={position}
            cityMuni={national}
            groupIndex={index}
            key={"group-" + position}
          />
        );
      })}
    </div>
  );
};
