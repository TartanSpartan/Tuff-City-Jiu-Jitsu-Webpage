import React from "react";
import {
  Box,
  Container,
  Row,
  Column,
  FooterLink,
  Heading,
} from "./FooterStyles";
  
const Footer = () => {
  return (
    <Box>
      <h1 style={{ color: "orange", 
                   textAlign: "center", 
                   marginTop: "-50px" }}>
        Tuff City Jitsu Club: Teaching practical self defence in Tofino
      </h1>
      <Container>
        <Row>
          <Column>
            <Heading>Contact Us</Heading>
            <FooterLink href="mailto:tuffcityjitsu@gmail.com ">Club Email</FooterLink>
            <FooterLink href="https://t.me/TartanSpartan">Seumas</FooterLink>
            <FooterLink href="https://github.com/TartanSpartan">&#9757; I also designed this website and if anyone is interested e.g. in moving between Jiu Jitsu countries, I would be happy to discuss my work </FooterLink>

          </Column>
          <Column>
            <Heading>Facebook</Heading>
            <FooterLink href="https://www.facebook.com/tuffcityjitsu">
              <span style={{ marginLeft: "10px" }}>
                Tuff City
              </span>
            </FooterLink>
            <FooterLink href="https://www.facebook.com/JitsuCanada">
              <span style={{ marginLeft: "10px" }}>
                Jitsu Canada
              </span>
            </FooterLink>
            <FooterLink href="https://www.facebook.com/groups/2406409734">
                <span style={{ marginLeft: "10px" }}>
                  The Jiu Jitsu Foundation (UK style)
                </span>
            </FooterLink>
          </Column>
          <Column>
            <Heading>Other Websites</Heading>
            <FooterLink href="https://jitsucanada.com/">
              <span style={{ marginLeft: "10px" }}>
                Jitsu Canada
              </span>
            </FooterLink>
            <FooterLink href="https://www.jitsufoundation.org/">
              <span style={{ marginLeft: "10px" }}>
                The Jiu Jitsu Foundation
              </span>
            </FooterLink>
            <FooterLink href="https://jitsunz.weebly.com/">
                <span style={{ marginLeft: "10px" }}>
                  Jitsu New Zealand
                </span>
            </FooterLink>
          </Column>
        </Row>
      </Container>
    </Box>
  );
};
export default Footer;