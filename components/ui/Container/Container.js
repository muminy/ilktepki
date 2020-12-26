export default function Container({ children, disable, size }) {
  return (
    <div
      className={`mx-auto container px-4 md:w-full sm:w-full`}
    >
      {children}
    </div>
  );
}
