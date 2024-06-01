'use client'
import React, { useState } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Tabs, Tab, Card, CardBody, Divider } from "@nextui-org/react";
import Subscribebtn from "@/app/(booking)/(userprofile)/settings/emailnotification/Subscibe";

export default function EmailNotificationModal() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [subscribed, setSubscribed] = useState({
        promotions: false,
        productsAndServices: false,
        travelExperiences: false,
        transportation: false,
        reservationEmails: false,
    });

    const handleOpen = () => {
        onOpen();
    }

    const handleSubscribe = (category) => {
        setSubscribed(prevState => ({
            ...prevState,
            [category]: !prevState[category]
        }));
    }

    const handleSubscribeAll = (category) => {
        setSubscribed(prevState => ({
            ...prevState,
            [category]: !prevState[category]
        }));
        const allSubscribed = !subscribed[category];
        const updatedSubscriptions = {};
        Object.keys(subscribed).forEach(key => {
            if (key.includes(category)) {
                updatedSubscriptions[key] = allSubscribed;
            }
        });
        setSubscribed(prevState => ({
            ...prevState,
            ...updatedSubscriptions
        }));
    }

    return (
        <>
            <div className="flex flex-wrap gap-3">
                <Button color="" size="md" variant="light" onPress={handleOpen} className="italic text-primary">Manage</Button>
            </div>
            <Modal
                size='5xl'
                isOpen={isOpen}
                onClose={onClose}
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Email Preference</ModalHeader>
                            <ModalBody>
                                <Tabs aria-label="Options" variant='underlined' color="primary">
                                    <Tab key="newslettersandservices" title="News Letters & Services">
                                        <Card className="shadow-none h-96">
                                            <CardBody>
                                                <div className="space-y-4">
                                                    <div className="flex justify-between">
                                                        <div>
                                                            <h3 className="text-xl text-gray-500">Promotions & Deals</h3>
                                                            <h6 className="text-xs text-gray-300">Email based on destinations you're interested in & newsletters highlighting deals.</h6>
                                                        </div>
                                                        <Subscribebtn isSelected={subscribed.promotions} onClick={() => handleSubscribeAll('promotions')} />
                                                    </div>

                                                    <div className="flex justify-between">
                                                        <h3 className="text-base text-gray-500">Deal discovery</h3>
                                                        <Subscribebtn isSelected={subscribed.promotions || subscribed.dealDiscovery} onClick={() => handleSubscribe('dealDiscovery')} />
                                                    </div>

                                                    <div className="flex justify-between">
                                                        <h3 className="text-base text-gray-500">Reward Points</h3>
                                                        <Subscribebtn isSelected={subscribed.promotions || subscribed.rewardPoints} onClick={() => handleSubscribe('rewardPoints')} />
                                                    </div>
                                                    <div className="flex justify-between">
                                                        <h3 className="text-base text-gray-500">Refer A Friends</h3>
                                                        <Subscribebtn isSelected={subscribed.promotions || subscribed.referaFriends} onClick={() => handleSubscribe('referaFriends')} />
                                                    </div>
                                                    <div className="flex justify-between">
                                                        <h3 className="text-base text-gray-500">Search Assistant</h3>
                                                        <Subscribebtn isSelected={subscribed.promotions || subscribed.searchAssistant} onClick={() => handleSubscribe('searchAssistant')} />
                                                    </div>
                                                    <div className="flex justify-between">
                                                        <h3 className="text-base text-gray-500">Direct mail</h3>
                                                        <Subscribebtn isSelected={subscribed.promotions || subscribed.directMail} onClick={() => handleSubscribe('directMail')} />
                                                    </div>
                                                    <Divider className="w-full mt-4" />
                                                    <div className="flex justify-between">
                                                        <div>
                                                            <h3 className="text-xl text-gray-500">HostyNest Products & Services</h3>
                                                            <h6 className="text-xs text-gray-300">Communications about HostyNest products & Services</h6>
                                                        </div>
                                                        <Subscribebtn isSelected={subscribed.productsAndServices} onClick={() => handleSubscribeAll('productsAndServices')} />
                                                    </div>
                                                    <div className="flex justify-between">
                                                        <h3 className="text-base text-gray-500">HostyNest for Buisness</h3>
                                                        <Subscribebtn isSelected={subscribed.productsAndServices || subscribed.hostynextforBuisness} onClick={() => handleSubscribe('hostynextforBuisness')} />
                                                    </div>
                                                    <div className="flex justify-between">
                                                        <h3 className="text-base text-gray-500">Customer feedback & survey</h3>
                                                        <Subscribebtn isSelected={subscribed.productsAndServices || subscribed.customerFeedbackandSurvey} onClick={() => handleSubscribe('customerFeedbackandSurvey')} />
                                                    </div>
                                                    <div className="flex justify-between">
                                                        <h3 className="text-base text-gray-500">Product announcements & news</h3>
                                                        <Subscribebtn isSelected={subscribed.productsAndServices || subscribed.productAnnouncementsandNews} onClick={() => handleSubscribe('productAnnouncementsandNews')} />
                                                    </div>
                                                    <div className="flex justify-between">
                                                        <h3 className="text-base text-gray-500">Emails about earning travel rewards with Missions</h3>
                                                        <Subscribebtn isSelected={subscribed.productsAndServices || subscribed.eETRM} onClick={() => handleSubscribe('eETRM')} />
                                                    </div>
                                                    <Divider className="w-full mt-4" />
                                                    <div className="flex justify-between">
                                                        <div>
                                                            <h3 className="text-xl text-gray-500">Travel Experiences</h3>
                                                            <h6 className="text-xs text-gray-300">Customized info & offers to make your good trip a great one.</h6>
                                                        </div>
                                                        <Subscribebtn isSelected={subscribed.travelExperiences} onClick={() => handleSubscribeAll('travelExperiences')} />
                                                    </div>
                                                    <div className="flex justify-between">
                                                        <h3 className="text-base text-gray-500">Attractions and tours</h3>
                                                        <Subscribebtn isSelected={subscribed.travelExperiences || subscribed.eETRM} onClick={() => handleSubscribe('eETRM')} />
                                                    </div>
                                                    <div className="flex justify-between">
                                                        <h3 className="text-base text-gray-500">Extra services for your stay</h3>
                                                        <Subscribebtn isSelected={subscribed.travelExperiences || subscribed.eSFYS} onClick={() => handleSubscribe('eSFYS')} />
                                                    </div>
                                                    <div className="flex justify-between">
                                                        <h3 className="text-base text-gray-500">Restaurant guides and offers</h3>
                                                        <Subscribebtn isSelected={subscribed.travelExperiences || subscribed.rGAO} onClick={() => handleSubscribe('rGAO')} />
                                                    </div>
                                                    <div className="flex justify-between">
                                                        <h3 className="text-base text-gray-500">Shopping & events</h3>
                                                        <Subscribebtn isSelected={subscribed.travelExperiences || subscribed.ShoppingandEvents} onClick={() => handleSubscribe('ShoppingandEvents')} />
                                                    </div>
                                                    <div className="flex justify-between">
                                                        <h3 className="text-base text-gray-500">Travel guides</h3>
                                                        <Subscribebtn isSelected={subscribed.travelExperiences || subscribed.travelGuides} onClick={() => handleSubscribe('travelGuides')} />
                                                    </div>
                                                    <Divider className="w-full mt-4" />
                                                    <div className="flex justify-between">
                                                        <div>
                                                            <h3 className="text-xl text-gray-500">Transportation</h3>
                                                            <h6 className="text-xs text-gray-300">Customized info & offers to make your good trip a great one.</h6>
                                                        </div>
                                                        <Subscribebtn isSelected={subscribed.transportation} onClick={() => handleSubscribeAll('transportation')} />
                                                    </div>
                                                    <div className="flex justify-between">
                                                        <h3 className="text-base text-gray-500">Public transportation</h3>
                                                        <Subscribebtn isSelected={subscribed.transportation || subscribed.publictransportation} onClick={() => handleSubscribe('publictransportation')} />
                                                    </div>
                                                    <div className="flex justify-between">
                                                        <h3 className="text-base text-gray-500">Taxi</h3>
                                                        <Subscribebtn isSelected={subscribed.transportation || subscribed.taxi} onClick={() => handleSubscribe('taxi')} />
                                                    </div>
                                                    <div className="flex justify-between">
                                                        <h3 className="text-base text-gray-500">Cars</h3>
                                                        <Subscribebtn isSelected={subscribed.transportation || subscribed.cars} onClick={() => handleSubscribe('cars')} />
                                                    </div>
                                                    <div className="flex justify-between">
                                                        <h3 className="text-base text-gray-500">Flights</h3>
                                                        <Subscribebtn isSelected={subscribed.transportation || subscribed.flights} onClick={() => handleSubscribe('flights')} />
                                                    </div>
                                                    <div className="flex justify-between">
                                                        <h3 className="text-base text-gray-500">Trains</h3>
                                                        <Subscribebtn isSelected={subscribed.transportation || subscribed.trains} onClick={() => handleSubscribe('trains')} />
                                                    </div>
                                                </div>
                                            </CardBody>
                                        </Card>
                                    </Tab>
                                    <Tab key="reservations" title="Reservations">
                                        <Card className="shadow-none h-96">
                                            <CardBody>
                                                <div className="space-y-4">
                                                    <div className="flex justify-between">
                                                        <div>
                                                            <h3 className="text-xl text-gray-500">Reservation emails</h3>
                                                            <h6 className="text-xs text-gray-300">Email you receive after making a reservation This includes invitations to review the properties you stayed in</h6>
                                                        </div>
                                                        <Subscribebtn isSelected={subscribed.reservationEmails} onClick={() => handleSubscribeAll('reservationEmails')} />
                                                    </div>
                                                    <div className="flex justify-between">
                                                        <div>
                                                            <h3 className="text-base text-gray-500">Upcoming booking</h3>
                                                            <h6 className="text-xs text-gray-300">Email reminders for your upcoming booking with all the info you'll need</h6>
                                                        </div>
                                                        <Subscribebtn isSelected={subscribed.reservationEmails || subscribed.upcomingbookings} onClick={() => handleSubscribe('upcomingbookings')} />
                                                    </div>
                                                    <div className="flex justify-between">
                                                        <div>
                                                            <h3 className="text-base text-gray-500">Review invites</h3>
                                                            <h6 className="text-xs text-gray-300">Email inviting you to leave a review about the property you stayed at</h6>
                                                        </div>
                                                        <Subscribebtn isSelected={subscribed.reservationEmails || subscribed.reviewinvires} onClick={() => handleSubscribe('reviewinvires')} />
                                                    </div>
                                                    <div className="flex justify-between">
                                                        <div>
                                                            <h3 className="text-base text-gray-500">Offers in confirmation emails</h3>
                                                            <h6 className="text-xs text-gray-300">Other product deals and upgrades in your confirmation emails.</h6>
                                                        </div>
                                                        <Subscribebtn isSelected={subscribed.reservationEmails || subscribed.offersinconfirmationemails} onClick={() => handleSubscribe('offersinconfirmationemails')} />
                                                    </div>
                                                    <div className="flex justify-between">
                                                        <div>
                                                            <h3 className="text-base text-gray-500">Booking confirmation emails</h3>
                                                            <h6 className="text-xs text-gray-300">You can't Unsubscribe from booking confirmation emails</h6>
                                                        </div>
                                                        <Subscribebtn isSelected={subscribed.reservationEmails || subscribed.bookingconfirmationemails} onClick={() => handleSubscribe('bookingconfirmationemails')} />
                                                    </div>
                                                </div>
                                            </CardBody>
                                        </Card>
                                    </Tab>
                                </Tabs>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="primary" onPress={onClose}>
                                    Save
                                </Button>
                                <Button color="danger" variant="light" onPress={onClose}>
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