export default function Container({ children, disable, size }) {
  return (
    <div
      className={`${
        disable ? "" : "xl:container xl:mx-auto"
      } md:w-full px-4 py-0 xl:py-10 lg:py-8 md:py-6 sm:py-0`}
    >
      <div
        className={`lg:flex ${
          size ? "xl:w-" + size : "xl:w-4/5"
        } lg:w-full md:w-full mx-auto flex-wrap justify-center xl:flex lg:flex md:flex`}
      >
        {children}
      </div>
    </div>
  );
}
