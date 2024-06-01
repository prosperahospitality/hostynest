'use client'
import React from 'react'
import { Button, Modal, ModalContent, ModalHeader, ModalBody, useDisclosure } from "@nextui-org/react";


const EditReviewsFormModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <div className="flex flex-wrap gap-3">
        <Button variant='light' color='' onPress={onOpen} className="text-primary" >See all reviews</Button>
      </div>
      <Modal
        size="xl"
        isOpen={isOpen}
        onOpenChange={onClose}
        classNames={{
          body: "py-6",
          backdrop: "bg-[#292f46]/50 backdrop-opacity-40",
          base: "border-[#292f46] bg-[#19172c] dark:bg-foreground text-foreground-300",
          header: "border-b-[1px] border-foreground-600",
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">See all Reviews</ModalHeader>
              <ModalBody>
                <p>
                  hii
                </p>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}

export default EditReviewsFormModal