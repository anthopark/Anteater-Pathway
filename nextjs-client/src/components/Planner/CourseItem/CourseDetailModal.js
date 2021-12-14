import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { useQuery } from "react-query";
import { fetchCourseDetail } from "src/fetch/fetch-course";

export const CourseDetailModal = ({
  courseInfo,
  isModalOpen,
  onModalClose,
}) => {
  const { data, isLoading, error } = useQuery(
    [
      `course-detail-${courseInfo.id}`,
      {
        departmentCode: courseInfo.departmentCode,
        number: courseInfo.number,
      },
    ],
    fetchCourseDetail
  );

  console.log(data);
  console.log(isLoading);
  console.log(error);

  return (
    <Modal isOpen={isModalOpen} onClose={onModalClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Modal Title</ModalHeader>
        <ModalCloseButton />
        <ModalBody></ModalBody>

        <ModalFooter></ModalFooter>
      </ModalContent>
    </Modal>
  );
};
