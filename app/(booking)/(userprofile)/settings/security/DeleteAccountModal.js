'use client'
import React from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Input } from "@nextui-org/react";
import { EyeSlashFilledIcon, EyeFilledIcon } from '@/_components/icon'
import Swal from 'sweetalert2'
import { SessionProvider, useSession, getSession, signIn, signOut } from 'next-auth/react'

export default function DeleteAccountModal({session}) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [size, setSize] = React.useState('')
    const [isVisible, setIsVisible] = React.useState(false);
    const toggleVisibility = () => setIsVisible(!isVisible);
    console.log("SESSion::::::::::?????",session);

    const handleOpen = (size) => {
        setSize(size)
        onOpen();
    }

    const handleAccountDelete = async() => {

        const res = await fetch("/api/userApi", {
            method: 'POST',
            body:JSON.stringify({user_id : session?.user?.user_id,
                mobile_number: session?.user?.mobile_number,
                operation: "updateDeleteFlag"})
          })
          const use = await res.json()
          console.log("Use: ",use)
          if(use.ress.modifiedCount === 1) {
            onClose();
            const Toast = Swal.mixin({
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                  toast.onmouseenter = Swal.stopTimer;
                  toast.onmouseleave = Swal.resumeTimer;
                }
              });
              Toast.fire({
                icon: "success",
                title: "Delete request has been taken, your account will be deleted within 03 business day's!"
              });
              signOut()
          }else{
            onClose();
            const Toast = Swal.mixin({
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                  toast.onmouseenter = Swal.stopTimer;
                  toast.onmouseleave = Swal.resumeTimer;
                }
              });
              Toast.fire({
                icon: "success",
                title: "Account already flagged for deletion!"
              });
          }
    }

    return (
        <>
            <div className="flex flex-wrap gap-3">
                <Button color="" size="md" variant="light" onPress={() => handleOpen()} className="italic text-danger" >Delete Account</Button>
            </div>
            <Modal
                size='sm'
                isOpen={isOpen}
                onClose={onClose}
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1 text-red-400">Delete Account</ModalHeader>
                            <ModalBody>
                                <p className="text-base text-red-400">Permanently Delete Your HostyNest Account</p>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" onPress={(e) => handleAccountDelete()}>
                                    Delete Account
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
