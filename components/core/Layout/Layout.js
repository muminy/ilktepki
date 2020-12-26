import Container from "@components/ui/Container";
import Flex from "@components/ui/flex";
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
      <Container>
        <Flex>{children}</Flex>
      </Container>
    </>
  );
}
