import Container from "@components/ui/Container";
import Navbar from "../Navbar";
import Title from "../Title";

export default function Layout({
  children,
  title,
  disable,
  size,
}) {
  return (
    <>
      <Title>{title}</Title>
      <Navbar />
      {disable ? (
        <div className="px-7">{children}</div>
      ) : (
        <Container size={size}>{children}</Container>
      )}
    </>
  );
}
