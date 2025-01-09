'use client'
import React from "react";
import { Tooltip, Button, Input, Chip, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Textarea, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure, Autocomplete, AutocompleteItem } from "@nextui-org/react"
import {PlusIcon, SearchIcon, ChevronDownIcon, DeleteIcon, EditIcon } from "@/_components/icon";

const columns = [
    {name: "ID", uid: "id"},
    {name: "Value", uid: "value"},
    {name: "T&C Polices", uid: "tandcpolices"},
    {name: "T&C Polices DESCRIPTION", uid: "tandcpolicesdescription"},
    {name: "STATUS", uid: "status"},
    {name: "ACTIONS", uid: "actions"},
  ];
  
  const statusColorMap = {
    active: "success",
    inactive: "danger",
  };
  
  const tandcpolicesdata = [
    {
      id: "TCPID00001",
      tandcpolices: "anytime",
      value: "anytime",
      tandcpolicesdescription: "anytime",
      status: "active",
    },
    {
        id: "TCPID00002",
        tandcpolices: "until 14:00 on the day of arrival",
        value: "14h",
        tandcpolicesdescription: "until 14:00 on the day of arrival",
        status: "active",
    },
    {
        id: "TCPID00003",
        tandcpolices: "until 1 day before arrival",
        value: "1d",
        tandcpolicesdescription: "until 1 day before arrival",
        status: "inactive",
    },
  ];


export default function TermsandPolices() {
    const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
   
    return (
        <div className="w-full">
            <h1 className="flex text-3xl ml-6 mt-6"><PlusIcon className="size-8 mt-1" />Add Termsand & Conditions / Polices</h1>
            <div className="mr-6 text-end">
                <Button onPress={onOpen} color="primary" variant="shadow" ><PlusIcon className="size-6" />Add T&C Polices</Button>
                <Modal isOpen={isOpen} size="4xl" onOpenChange={onOpenChange}>
                    <ModalContent>
                        {(onClose) => (
                            <>
                                <ModalHeader className="gap-1">Add T&C Polices</ModalHeader>
                                <ModalBody>
                                    <div className="p-4 grid grid-cols-2 gap-2">
                                        <Input
                                            isRequired
                                            type="text"
                                            label="T&C Polices"
                                            labelPlacement="outside"
                                            placeholder="Enter your Custom T&C Polices Name"
                                            variant="bordered"
                                            size="md"
                                            className="max-w-xs"
                                        />
                                        <Input
                                            isRequired
                                            type="text"
                                            label="T&C Polices Value"
                                            labelPlacement="outside"
                                            placeholder="Enter your Custom T&C Polices Value"
                                            variant="bordered"
                                            size="md"
                                            className="max-w-xs"
                                        />
                                        <Textarea
                                            isRequired
                                            type="text"
                                            label="T&C Polices Description"
                                            labelPlacement="outside"
                                            variant="bordered"
                                            placeholder="T&C Polices description"
                                            disableAnimation
                                            disableAutosize
                                            classNames={{
                                                base: "max-w-xs",
                                                input: "resize-y min-h-[40px]",
                                            }}
                                            />
                                        <Autocomplete
                                        isRequired
                                        labelPlacement="outside"
                                        placeholder="Select...."
                                        label="T&C Polices Status"
                                        variant="bordered"
                                        size="md"
                                        className="max-w-xs" 
                                    >
                                        <AutocompleteItem value="active">Active</AutocompleteItem>
                                        <AutocompleteItem value="inactive">Inactive</AutocompleteItem>
                                    </Autocomplete>
                                    </div>
                                </ModalBody>
                                <ModalFooter>
                                    <Button color="primary" onPress={onClose}>
                                        Submit
                                    </Button>
                                    <Button color="danger" variant="light" onPress={onClose}>
                                        Cancel
                                    </Button>
                                </ModalFooter>
                            </>
                        )}
                    </ModalContent>
                </Modal>
            </div>
            <div className="mt-10 ml-2 mr-2">
                <Table aria-label="Example static collection table">
                    <TableHeader>
                        {columns.map((column) => (
                        <TableColumn key={column.uid}>{column.name}</TableColumn>
                        ))}
                    </TableHeader>
                    <TableBody>
                    {tandcpolicesdata.map((tandcpolicedata) => (
                        <TableRow key={tandcpolicedata.id} value={tandcpolicedata.value} >
                            <TableCell>{tandcpolicedata.id}</TableCell>
                            <TableCell>{tandcpolicedata.value}</TableCell>
                            <TableCell>{tandcpolicedata.tandcpolices}</TableCell>
                            <TableCell>{tandcpolicedata.tandcpolicesdescription}</TableCell>
                            <TableCell>
                                <Chip className="capitalize" color={statusColorMap[tandcpolicedata.status]} size="sm" variant="flat">
                                {tandcpolicedata.status}
                                </Chip>
                            </TableCell>
                            <TableCell>
                                <Tooltip color="default" content="Edit T&C Polices">
                                <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                                <Button isIconOnly onPress={onOpen} color="default" variant="light" size="sm"><EditIcon className="size-4"/></Button>
                                </span>
                                </Tooltip>
                                <Tooltip color="danger" content="Delete T&C Polices">
                                <span className="text-lg text-danger cursor-pointer active:opacity-50">
                                <Button isIconOnly color="danger" variant="light" size="sm"><DeleteIcon className="size-4"/></Button>
                                </span>
                                </Tooltip>
                            </TableCell>
                        </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
};