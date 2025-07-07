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
    <div className="flex items-center justify-between w-full  xl:max-w-2xl 2xl:max-w-4xl mx-auto mb-4 xl:mb-9">
      {steps.map((step, index) => (
        <div key={step.id} className="flex items-center">
          <div className="flex gap-1 items-center">
            <div
              className={cn(
                "xl:w-8 xl:h-8 md:w-5 md:h-5 h-3 w-3 rounded-full flex items-center justify-center text-[10px] md:text-sm font-medium transition-colors",
                step.id <= currentStep
                  ? "bg-white text-black"
                  : "bg-gray-600 text-gray-300"
              )}
            >
              {step.completed ? <Check className="xl:w-4 xl:h-4" /> : step.id}
            </div>
            <p className="xl:text-xs lg:text-[10px] text-[6px] text-gray-300 xl:mt-1">
              {step.label}
            </p>
            {index < steps.length - 1 && (
              <div
                className={cn(
                  "xl:w-3 xl:h-0.5 w-2 h-0.5 xl:mt-1 xl:mx-1 transition-colors",
                  step.id < currentStep ? "bg-white" : "bg-gray-600"
                )}
              />
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
