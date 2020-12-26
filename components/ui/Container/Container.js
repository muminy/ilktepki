export default function Container({ children, disable, size }) {
  return (
    <div className={`mx-auto container flex px-10`}>
      {children}
    </div>
  );
}
