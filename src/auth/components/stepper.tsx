import React from "react";
import { Check } from "lucide-react";
import { cn } from "../../utils/cn";

interface StepperProps {
  steps: Array<{
    id: number;
    label: string;
    completed?: boolean;
  }>;
  currentStep: number;
}

export function Stepper({ steps, currentStep }: StepperProps) {
  return (
    <div className="flex items-center w-full mx-auto mb-4 xl:mb-9 px-2">
      {steps.map((step, index) => (
        <React.Fragment key={step.id}>
          <div className="flex items-center gap-1 flex-shrink-0">
            <div
              className={cn(
                "w-6 h-6 sm:w-7 sm:h-7 xl:w-8 xl:h-8 rounded-full flex items-center justify-center text-[10px] sm:text-xs xl:text-sm font-medium transition-colors flex-shrink-0",
                step.id <= currentStep
                  ? "bg-white text-black"
                  : "bg-gray-600 text-gray-300"
              )}
            >
              {step.completed ? (
                <Check className="w-3 h-3 sm:w-4 sm:h-4" />
              ) : (
                step.id
              )}
            </div>
            <p className="hidden sm:block text-[9px] md:text-[10px] xl:text-xs text-gray-300 whitespace-nowrap">
              {step.label}
            </p>
          </div>

          {index < steps.length - 1 && (
            <div
              className={cn(
                "flex-1 min-w-[8px] h-px mx-1 sm:mx-2 transition-colors",
                step.id < currentStep ? "bg-white" : "bg-gray-600"
              )}
            />
          )}
        </React.Fragment>
      ))}
    </div>
  );
}
