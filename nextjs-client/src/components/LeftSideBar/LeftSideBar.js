import Image from "next/image";
import { StyledContainer, IconLink } from "./styled";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { ThemeToggler } from "./ThemeToggler";

export const LeftSideBar = () => {
  return (
    <StyledContainer>
      <div className="logo-container" style={{ marginLeft: ".8rem" }}>
        <Image src="/logo.svg" alt="logo" width="55" height="65" />
      </div>
      <div className="menu-container">
        <ThemeToggler />
        <IconLink>
          <FontAwesomeIcon icon={faEnvelope} size="3x" color="white" />
        </IconLink>
        <IconLink>
          <FontAwesomeIcon icon={faGithub} size="3x" color="white" />
        </IconLink>
      </div>
    </StyledContainer>
  );
};
