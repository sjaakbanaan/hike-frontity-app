import React from "react";
import { connect, styled } from "frontity";
import Link from "./link";
import Nav from "./nav";
import MobileMenu from "./menu";
import tw from "twin.macro";

const Header = ({ state }) => {
  const { name, description } = state.source.get("nameAndDescription");
  return (
    <>
      <Container>
        <StyledLink link="/">
          <Title>{name}</Title>
        </StyledLink>
        <Description>{description}</Description>
        <MobileMenu />
        <Button>Knop</Button>
      </Container>
      <Nav />
    </>
  );
};

// Connect the Header component to get access to the `state` in it's `props`
export default connect(Header);

const Button = styled("button")`
  ${tw`font-mono text-lg bg-blue-300 border-none my-2 py-2 cursor-pointer hover:bg-blue-500`};
`;

const Container = styled.div`
  width: 848px;
  max-width: 100%;
  box-sizing: border-box;
  padding: 24px;
  color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const Title = styled.h2`
  margin: 0;
  margin-bottom: 16px;
`;

const Description = styled.h4`
  margin: 0;
  color: rgba(255, 255, 255, 0.7);
`;

const StyledLink = styled(Link)`
  text-decoration: none;
`;
