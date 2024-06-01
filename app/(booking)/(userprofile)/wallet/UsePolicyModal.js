'use client'
import React from 'react'
import { Card, Button, Modal, ModalContent, ModalHeader, ModalBody, useDisclosure, Divider } from "@nextui-org/react";

const userpolicedatas = [
    {
        titel: 'Eligable Transactions:',
        discription: 'Reward points can be redeemed towards eligible transactions, including hotel stays, room upgrades, and select ancillary services.',
    },
    {
        titel: 'Redemption Threshold:',
        discription: 'For Every 100 rs you spend you earn 1 point and for every 100 points you get a 50 rs off',
    },
    {
        titel: 'Point Value:',
        discription: 'Each reward point has a fixed value equivalent to [Z] INR. Points cannot be exchanged for cash or transferred to other accounts.',
    },
    {
        titel: 'Limited Redemption:',
        discription: 'Redemption of reward points is subject to availability and may be limited during peak seasons or special events.',
    },
    {
        titel: 'Blackout Dates:',
        discription: 'Certain blackout dates may apply, during which reward point redemption may be restricted or unavailable.',
    },
    {
        titel: 'Combination with Other Offers:',
        discription: 'Reward points cannot be combined with other promotional offers, discounts, or vouchers unless explicitly stated.',
    },
    {
        titel: 'Expiration Policy:',
        discription: 'Reward points expire after [N] months of inactivity. Users will receive notifications regarding points nearing expiration.',
    },
    {
        titel: 'Non-Transferable:',
        discription: 'Reward points are non-transferable and cannot be pooled or shared among multiple accounts.',
    },
    {
        titel: 'Modification of Terms:',
        discription: 'The company reserves the right to modify or terminate the reward points program, including redemption terms and conditions, at any time without prior notice.',
    },
    {
        titel: 'Fraudulent Activity:',
        discription: "Any fraudulent or abusive use of reward points will result in immediate termination of the user's account and forfeiture of all accumulated points."
    },
]



const UsePolicyModal = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <div>
            <Button variant='light' color='primary' onPress={onOpen} >Please refer usage policy</Button>
            <Modal
                size="3xl"
                isOpen={isOpen}
                onOpenChange={onClose}
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1 text-primary">Reward Point Usage Policy</ModalHeader>
                            <ModalBody>
                                <div className='grid grid-cols-12 gap-4 pb-4'>
                                {userpolicedatas.map((userpolicedata) => (
                                <>
                                <div className='flex col-span-4'>
                                <h3 className='text-base font-semibold text-gray-500'>{userpolicedata.titel}</h3>
                                </div>
                                <Divider className='w-[1px] h-full col-span-1' />
                                <div className='flex col-span-7'>
                                <h6 className='text-xs text-gray-500'>{userpolicedata.discription}</h6>
                                </div>
                                </>
                                ))}
                                </div>
                            </ModalBody>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </div>
    )
}

export default UsePolicyModal;


export const WarningCircle = ({
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