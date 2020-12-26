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
      <Container>{children}</Container>
    </>
  );
}
