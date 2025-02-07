import { MegapackType, PositionEnum } from "@lib/types";
import { CandidateGroup } from "./candidate-group";

export const NationalCandidates = ({
  megapack,
}: {
  megapack: MegapackType;
}) => {
  const { national, year } = megapack;

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
            year={year}
          />
        );
      })}
    </div>
  );
};
