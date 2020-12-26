import { getRandomPairOfColors } from "lib/color";
import { useEffect, useState } from "react";

const Avatar = ({ rf, size }) => {
  const [bg] = useState(getRandomPairOfColors());
  const [first, second] = bg;
  const [load, setLoad] = useState(false);

  useEffect(() => {
    setLoad(true);
  }, []);
  if (load) {
    return (
      <>
        <div
          className={`inline-block ${
            size ? "" : "h-9 w-9"
          } border-2 userAvatar hover:border-black border-white focus:border-secondary transition linear-out duration-150`}
        ></div>
        <style jsx>{`
          .userAvatar {
            background-image: linear-gradient(
              140deg,
              ${first},
              ${second} 100%
            );
            ${size
              ? "width: " +
                size +
                "px;height: " +
                size +
                "px;min-height: " +
                size +
                "px;min-width: " +
                size +
                "px;"
              : ""}
            ${rf ? "border-radius: " + rf : ""}
          }
        `}</style>
      </>
    );
  }

  return <div>Loading</div>;
};
export default Avatar;
