import Image from "next/image";
import { StyledContainer, IconLink } from "./styled";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDisclosure } from "@chakra-ui/react";
import ContactUsModal from "./ContactUsModal";
// import { ThemeToggler } from "./ThemeToggler";

const ICON_SIZE = "3rem";

export const LeftSideBar = () => {
  const {
    isOpen: isModalOpen,
    onOpen: onModalOpen,
    onClose: onModalClose,
  } = useDisclosure();

  return (
    <>
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
          <IconLink onClick={onModalOpen}>
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
          <IconLink
            href="https://www.paypal.com/donate/?cmd=_donations&business=LTKH3TMC5ZLS8&item_name=Boba+keeps+us+going%21+This+will+help+us+pay+for+the+server+as+well%21+Thank+you+%3A%29&currency_code=USD&amount=2"
            target="_blank"
          >
            <div className="donation-icon-container">
              <Image
                src="/Boba-icon-v1.svg"
                alt="donation-icon"
                layout="fill"
              />
            </div>
          </IconLink>
        </div>
      </StyledContainer>
      <ContactUsModal isModalOpen={isModalOpen} onModalClose={onModalClose} />
    </>
  );
};
