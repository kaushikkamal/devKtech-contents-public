import { useState } from 'react';
import { createPortal } from 'react-dom';

import { Button } from '@/components/ui/button';
import ModalContent from './ModalContent';

const Modal = () => {
    const [isOpen, setIsOpen] = useState(false);
    const handleModal = (operation: boolean) => {
        setIsOpen(operation);
    };

    return (
        <>
            {isOpen &&
                createPortal(
                    <ModalContent handleModal={handleModal} />,
                    document.body,
                )}
            <Button
                variant="outline"
                onClick={() => {
                    handleModal(true);
                }}
            >
                Open Modal
            </Button>
        </>
    );
};

export default Modal;
