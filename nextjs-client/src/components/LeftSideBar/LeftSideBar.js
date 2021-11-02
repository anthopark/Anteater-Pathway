import Image from "next/image";
import { StyledContainer, IconLink } from "./styled";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ThemeToggler } from "./ThemeToggler";

const ICON_SIZE = "2.7rem";

export const LeftSideBar = () => {
  return (
    <StyledContainer>
      <div className="logo-container" style={{ marginLeft: ".8rem" }}>
        <Image src="/logo.svg" alt="logo" width="55" height="65" />
      </div>
      <div className="menu-container">
        <ThemeToggler iconSize={ICON_SIZE} />
        <IconLink>
          <FontAwesomeIcon
            icon={["fas", "envelope"]}
            style={{ fontSize: ICON_SIZE }}
            color="white"
          />
        </IconLink>
        <IconLink>
          <FontAwesomeIcon
            icon={["fab", "github"]}
            style={{ fontSize: ICON_SIZE }}
            color="white"
          />
        </IconLink>
      </div>
    </StyledContainer>
  );
};
