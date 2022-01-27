import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  Spinner,
} from "@chakra-ui/react";
import { useGlobalObjects } from "@components/GlobalContextProvider";
import { useQuery } from "react-query";
import { fetchCourseDetail, fetchCourseConfig } from "src/api/course";
import {
  ModalBodyContainer,
  ModalBodyErrorContainer,
  ModalBodyLoadingContainer,
} from "./styled";

const courseInfoPropertyArr = [
  ["description", "Description"],
  ["prerequisite", "Prerequisite"],
  ["corequisite", "Corequisite"],
  ["preOrCorequisite", "Prerequisite or Corequisite"],
  ["restriction", "Restriction"],
  ["sameAs", "Same as"],
  ["overlapsWith", "Overlaps with"],
  ["concurrentWith", "Concurrent with"],
  ["gradingOption", "Grading Option"],
  ["repeatability", "Repeatability"],
];

const termAbbreviationMap = {
  fa: "Fall",
  wi: "Winter",
  sp: "Spring",
  su: "Summer",
};

const termColorMap = {
  fa: "#f4d0af",
  wi: "#e2ccfb",
  sp: "#d5efb7",
  su: "#b4efe3",
};

export const CourseDetailModal = ({
  courseInfo,
  isModalOpen,
  onModalClose,
}) => {
  const { themeStyles } = useGlobalObjects();
  const { data, isLoading, error } = useQuery(
    [
      `course-detail-${courseInfo.id}`,
      {
        departmentCode: courseInfo.departmentCode,
        number: courseInfo.number,
      },
    ],
    fetchCourseDetail,
    fetchCourseConfig
  );

  let modalBodyUI = null;

  if (isLoading) {
    modalBodyUI = (
      <ModalBodyLoadingContainer>
        <Spinner size="xl" />
      </ModalBodyLoadingContainer>
    );
  } else if (error) {
    modalBodyUI = (
      <ModalBodyErrorContainer>Something went wrong :(</ModalBodyErrorContainer>
    );
  } else {
    modalBodyUI = (
      <ModalBodyContainer>
        {data?.geCategory ? (
          <div className="course-info-property-container">
            <div className="course-info-property">
              GE Category:
              <span className="ge-category-text">{`${data.geCategory}`}</span>
            </div>
          </div>
        ) : null}
        {data?.offeredTerms.length > 0 ? (
          <div className="course-info-property-container">
            <div className="course-info-property">Previously Offered:</div>
            <div className="offered-terms-box">
              {data.offeredTerms.map((term, index) => (
                <div
                  className="term-box"
                  key={index}
                  style={{ backgroundColor: termColorMap[term.split("-")[1]] }}
                >{`${term.split("-")[0]} ${
                  termAbbreviationMap[term.split("-")[1]]
                }`}</div>
              ))}
            </div>
          </div>
        ) : null}
        {courseInfoPropertyArr.map((propertyPair) => {
          if (data[propertyPair[0]]) {
            return (
              <div className="course-info-property-container">
                <div className="course-info-property">{`${propertyPair[1]}:`}</div>
                <div className="course-info-content">
                  {data[propertyPair[0]]}
                </div>
              </div>
            );
          }
        })}
      </ModalBodyContainer>
    );
  }

  return (
    <Modal
      isOpen={isModalOpen}
      onClose={onModalClose}
      isCentered={true}
      onEsc={onModalClose}
      size="2xl"
    >
      <ModalOverlay />
      <ModalContent
        borderRadius="12px"
        fontFamily="oxygen"
        padding="1rem .6rem"
        color={themeStyles.colors.defaultText}
        bgColor={themeStyles.colors.modalBg}
      >
        <ModalHeader fontSize="1.6rem" letterSpacing="1px">
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <div>{`${courseInfo.departmentCode} ${courseInfo.number}`}</div>
            <div>{`${courseInfo.unit} units`}</div>
          </div>
          <div
            style={{
              width: "100%",
              fontSize: "1.5rem",
              letterSpacing: "1px",
              textAlign: "center",
              fontWeight: "normal",
              marginTop: ".7rem",
            }}
          >{`${courseInfo.title}`}</div>
        </ModalHeader>

        <ModalBody mb=".5rem">{modalBodyUI}</ModalBody>
      </ModalContent>
    </Modal>
  );
};
