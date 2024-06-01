'use client'
import React from 'react'
import { Card, Button, Modal, ModalContent, ModalHeader, ModalBody, useDisclosure } from "@nextui-org/react";
import { CiCircleQuestion } from "react-icons/ci";

const BankGstDetailsModal = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <div>
            <Button isIconOnly variant='light' color='' onPress={onOpen} startContent={<CiCircleQuestion className='size-6 text-primary' />}></Button>
            <Modal
                size="xl"
                isOpen={isOpen}
                onOpenChange={onClose}
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Bank & GST Details</ModalHeader>
                            <ModalBody>
                                <p>
                                    gst details
                                </p>
                            </ModalBody>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </div>
    )
}

export default BankGstDetailsModal