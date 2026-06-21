import { Check } from "lucide-react";
import { PROFILE_STEPS } from "./constants/profileSteps";

type StepProgressProps = {
  currentStep: number;
};

export default function StepProgress({ currentStep }: StepProgressProps) {
  return (
    <div className="w-full">
      <div className="flex items-center justify-center">
        {PROFILE_STEPS.map((step, index) => {
          const isCompleted = currentStep > step.id;
          const isActive = currentStep === step.id;
          const StepIcon = step.icon;

          return (
            <div key={step.id} className="flex flex-1 items-center">
              <div className="flex flex-col items-center gap-2 min-w-0">
                <div
                  className={[
                    "flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 transition-all duration-300",
                    isCompleted
                      ? "border-primary-500 bg-primary-500 text-white"
                      : isActive
                        ? "border-primary-500 bg-primary-50 text-primary-600 shadow-sm shadow-primary-200"
                        : "border-background-300 bg-background-100 text-text-400",
                  ].join(" ")}
                >
                  {isCompleted ? (
                    <Check className="h-4 w-4" strokeWidth={2.5} />
                  ) : (
                    <StepIcon className="h-4 w-4" />
                  )}
                </div>

                <span
                  className={[
                    "text-xs font-medium text-center truncate w-full px-1",
                    isActive || isCompleted ? "text-text-800" : "text-text-400",
                  ].join(" ")}
                >
                  {step.label}
                </span>
              </div>

              {index < PROFILE_STEPS.length && (
                <div
                  className={[
                    "mx-2 mb-6 h-0.5 flex-1 rounded-full transition-colors duration-300",
                    currentStep > step.id ? "bg-primary-500" : "bg-background-300",
                  ].join(" ")}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
