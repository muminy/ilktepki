export default function Container({ children, disable, size }) {
  return (
    <div
      className={`mx-auto container px-0 xl:px-4 lg:px-4 md:px-2 sm:px-0 md:w-full sm:w-full`}
    >
      {children}
    </div>
  );
}
