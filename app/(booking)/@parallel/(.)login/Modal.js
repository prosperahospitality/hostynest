'use client'
import React, { useRef } from 'react';
import { Dialog } from "@headlessui/react";
import { Button } from '@nextui-org/react';
import { TfiClose } from "react-icons/tfi";

export function Modal({ onClose = () => { }, children }) {
    let overlayRef = useRef();

    return (
        <Dialog
            static
            open={true}
            onClose={onClose}
            initialFocus={overlayRef}
            className="fixed inset-0 z-50 flex items-center justify-center"
        >
            <Dialog.Overlay
                ref={overlayRef}
                className="fixed inset-0 bg-gray-800/60"
            />
            <div className="relative flex items-center justify-center w-1/2">
                <Button
                    color='primary'
                    variant='light'
                    className="absolute top-0 right-0 mt-2 mr-2"
                    isIconOnly
                    onClick={onClose}
                >
                    <TfiClose size={15} />
                </Button>
                {children}
            </div>
        </Dialog>
    );
}