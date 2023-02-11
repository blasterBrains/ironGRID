import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
} from '@chakra-ui/react';
import type { SquareWithOwner } from '../../../common/types';

interface OwnProps {
  square?: SquareWithOwner;
  isOpen: boolean;
  onClose: () => void;
}

const SquareModal = ({ square, isOpen, onClose }: OwnProps) => {
  const handleReserveSquare = () => {
    // TODO: Make API request to handle square
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            {square?.owner ? 'Reserved by' : 'Available'}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {square?.owner?.name || 'This square is available to reserve'}
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            {!square?.owner ? (
              <Button variant="ghost" onClick={handleReserveSquare}>
                Reserve
              </Button>
            ) : null}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default SquareModal;
