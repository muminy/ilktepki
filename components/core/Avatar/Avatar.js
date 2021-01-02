const Avatar = ({ rf, size }) => {
  return (
    <>
      <div
        className={`block ${
          size ? "" : "h-9 w-9"
        } border-2 avatar bg-gray-200 rounded-full hover:border-black border-white focus:border-secondary transition linear-out duration-150`}
      ></div>
      <style jsx>
        {`
          .avatar {
            ${size
              ? "height: " +
                size +
                "px;width: " +
                size +
                "px; min-width: " +
                size +
                "px;min-height: " +
                size +
                "px;"
              : ""}
          }
        `}
      </style>
    </>
  );
};

export default Avatar;
