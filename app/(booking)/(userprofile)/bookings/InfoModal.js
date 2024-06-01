'use client'
import React from 'react'
import { Card, Button, Modal, ModalContent, ModalHeader, ModalBody, useDisclosure } from "@nextui-org/react";

const WarningCircle = ({
    size, height, width, ...props
  }) => {
    return (
      <svg xmlns="http://www.w3.org/2000/svg"
      height={height}
      width={width}
      fill="#007ebb"
      viewBox="0 0 256 256"
      {...props}
      >
        <path d="M128,28A100,100,0,1,0,228,128,100.11,100.11,0,0,0,128,28Zm0,192a92,92,0,1,1,92-92A92.1,92.1,0,0,1,128,220Zm-4-84V80a4,4,0,0,1,8,0v56a4,4,0,0,1-8,0Zm12,36a8,8,0,1,1-8-8A8,8,0,0,1,136,172Z">
        </path>
        </svg>
    );
  };

const InfoModal = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <div>
            <Button isIconOnly variant='light' color='' onPress={onOpen} startContent={<WarningCircle className='size-6 text-primary' />}></Button>
            <Modal
                size="xl"
                isOpen={isOpen}
                onOpenChange={onClose}
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Booking Details</ModalHeader>
                            <ModalBody>
                                <p>
                                    Info Modal
                                </p>
                            </ModalBody>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </div>
    )
}

export default InfoModal;