import Image from "next/image";
import { StyledContainer, IconLink } from "./styled";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
          <FontAwesomeIcon icon={["fas", "envelope"]} size="3x" color="white" />
        </IconLink>
        <IconLink>
          <FontAwesomeIcon icon={["fab", "github"]} size="3x" color="white" />
        </IconLink>
      </div>
    </StyledContainer>
  );
};
