import { Container } from "./styled";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useGlobalObjects } from "@components/GlobalContextProvider";

export const UndoButton = () => {
  const { themeStyles } = useGlobalObjects();
  return (
    <Container>
      <FontAwesomeIcon
        icon={["fas", "undo"]}
        style={{ fontSize: "1.3rem", color: themeStyles.colors.paneHeaderFont }}
      />
      <div className="text-box">Undo</div>
    </Container>
  );
};
