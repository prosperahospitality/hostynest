'use client'
import React from 'react';
import { Check } from 'lucide-react'

const Stepper = ({ steps, currentStep }) => {

    return (
        <div className="relative flex flex-wrap">
            {steps.map((step, index) => (
                <div key={index} className="flex items-center space-x-4 mb-4 w-full sm:w-auto">
                    <div className="relative">
                        <div
                            className={`size-5 rounded-full flex items-center justify-center border-2 ${index < currentStep
                                ? 'border-primary bg-primary text-white'
                                : 'border-gray-300 text-gray-500'
                                }`}
                        >
                            {index < currentStep ? (
                                <Check />
                            ) : (
                                index === currentStep && <span className='text-[10px] font-bold text-center'>{index + 1}</span>
                            )}
                        </div>
                        {index !== steps.length - 1 && (
                            <div
                                className={`absolute h-0.5 w-[168px] bg-primary ${index < currentStep - 1 ? 'hidden' : 'left-[100%]'
                                    }`}
                                style={{ top: '50%', transform: 'translateY(-50%)' }}
                            />
                        )}
                    </div>
                    <div className='w-[150px]'>
                        <div className="font-semibold text-sm text-gray-500">{step.title}</div>
                        <div className={`text-[10px] ${index === currentStep
                            ? 'text-warning' // Status is "Initializing"
                            : index < currentStep
                                ? 'text-success' // Status is "Done"
                                : 'text-danger' // Status is "Pending"
                            }`}>
                            {
                                index === currentStep
                                    ? <>{step.pending}</>
                                    : index < currentStep
                                        ? <>{step.done}</>
                                        : <>{step.initializing}</>
                            }
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Stepper;