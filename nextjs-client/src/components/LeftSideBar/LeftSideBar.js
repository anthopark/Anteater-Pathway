import Image from "next/image";
import { StyledContainer, IconLink } from "./styled";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { ThemeToggler } from "./ThemeToggler";

const ICON_SIZE = "2.7rem";

export const LeftSideBar = () => {
  return (
    <StyledContainer>
      <div
        className="logo-container"
        style={{
          position: "relative",
          width: "4.5rem",
          height: "5rem",
          marginLeft: ".8rem",
        }}
      >
        <Image src="/logo.svg" alt="logo" layout="fill" />
      </div>
      <div className="menu-container">
        {/* <ThemeToggler iconSize={ICON_SIZE} /> */}
        <IconLink>
          <FontAwesomeIcon
            icon={["fas", "envelope"]}
            style={{ fontSize: ICON_SIZE }}
            color="white"
          />
        </IconLink>
        <IconLink
          href="https://github.com/anthopark/Anteater-Pathway"
          target="_blank"
        >
          <FontAwesomeIcon
            icon={["fab", "github"]}
            style={{ fontSize: ICON_SIZE }}
            color="white"
          />
        </IconLink>
        {/* <IconLink>
          <div className="donation-icon-container">
            <Image src="/Boba-icon-v1.svg" alt="donation-icon" layout="fill" />
          </div>
        </IconLink> */}
      </div>
    </StyledContainer>
  );
};
