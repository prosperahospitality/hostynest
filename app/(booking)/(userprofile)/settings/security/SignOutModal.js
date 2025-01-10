'use client'
import React from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Input } from "@nextui-org/react";
import { EyeSlashFilledIcon, EyeFilledIcon } from '@/_components/icon'

export default function SignOutModal({onSignOutFlag}) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [size, setSize] = React.useState('')
    const [isVisible, setIsVisible] = React.useState(false);
    const toggleVisibility = () => setIsVisible(!isVisible);
    const [signOutFlag, setSignOutFlag] = React.useState(false);
    


    const handleOpen = (size) => {
        setSize(size)
        onOpen();
    }

    const handleSignOut = () => {
        setSignOutFlag(true)
        onSignOutFlag(true)
    }

    return (
        <>
            <div className="flex flex-wrap gap-3">
                <Button color="" size="md" variant="light" onPress={() => handleOpen()} className="italic text-primary" >Sign-Out</Button>
            </div>
            <Modal
                size='sm'
                isOpen={isOpen}
                onClose={onClose}
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1 text-gray-500">Sign-Out</ModalHeader>
                            <ModalBody>
                                <p className="text-base text-red-400">Selecting Sign-out will sign you out from all devices except this one</p>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" onPress={handleSignOut}>
                                    Sign-Out
                                </Button>
                                <Button color="default" variant="light" onPress={onClose}>
                                    Close
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}
