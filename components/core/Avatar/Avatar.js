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
            size ? "w-" + size + " h-" + size : "h-9 w-9"
          }  ${
            rf ? "rounded-full" : "rounded-md"
          } border-2 userAvatar hover:border-black border-white focus:border-secondary transition linear-out duration-150`}
        ></div>
        <style jsx>{`
          .userAvatar {
            background-image: linear-gradient(
              140deg,
              ${first},
              ${second} 100%
            );
          }
        `}</style>
      </>
    );
  }

  return <div>Loading</div>;
};
export default Avatar;
