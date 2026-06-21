"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { PROFILE_STEPS } from "./constants/profileSteps";
import { useCompleteProfile } from "./hooks/useCompleteProfile";
import { useProfileSetupStore } from "./store/profileSetupStore";
import StepProgress from "./StepProgress";
import ContactStepFields from "./steps/ContactStepFields";
import NameStepFields from "./steps/NameStepFields";
import UsernameStepFields from "./steps/UsernameStepFields";

export default function ProfileSetupForm() {
  const currentStep = useProfileSetupStore((state) => state.currentStep);
  const goToNextStep = useProfileSetupStore((state) => state.goToNextStep);
  const goToPreviousStep = useProfileSetupStore((state) => state.goToPreviousStep);
  const validateCurrentStep = useProfileSetupStore(
    (state) => state.validateCurrentStep,
  );

  const { mutate: submitProfile, isPending } = useCompleteProfile();
  const activeStep = PROFILE_STEPS[currentStep - 1];

  const handleNext = () => {
    goToNextStep();
  };

  const handleBack = () => {
    goToPreviousStep();
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!validateCurrentStep()) {
      return;
    }

    submitProfile();
  };

  return (
    <div className="rounded-2xl bg-accent-50 p-6 sm:p-8 shadow-md space-y-8">
      <StepProgress currentStep={currentStep} />

      <form onSubmit={handleSubmit} className="space-y-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -24 }}
            transition={{ duration: 0.3 }}
            className="space-y-5"
          >
            <div className="space-y-1">
              <h2 className="text-xl font-semibold text-text-800">
                {activeStep.title}
              </h2>
              <p className="text-sm text-text-500">{activeStep.description}</p>
            </div>

            {currentStep === 1 && <NameStepFields />}
            {currentStep === 2 && <UsernameStepFields />}
            {currentStep === 3 && <ContactStepFields />}
          </motion.div>
        </AnimatePresence>

        <div className="flex items-center justify-between gap-3 pt-2">
          <button
            type="button"
            onClick={handleBack}
            disabled={currentStep === 1}
            className="inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-text-600 transition hover:bg-background-200 disabled:pointer-events-none disabled:opacity-40 hover:cursor-pointer"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </button>

          {currentStep < PROFILE_STEPS.length ? (
            <button
              type="button"
              onClick={handleNext}
              className="inline-flex items-center gap-2 rounded-lg bg-primary-500 px-5 py-2 text-sm font-medium text-white transition hover:bg-primary-600 hover:cursor-pointer"
            >
              Continue
              <ArrowRight className="h-4 w-4" />
            </button>
          ) : (
            <button
              type="submit"
              disabled={isPending}
              className="inline-flex items-center gap-2 rounded-lg bg-primary-500 px-5 py-2 text-sm font-medium text-white transition hover:bg-primary-600 disabled:opacity-70 hover:cursor-pointer"
            >
              {isPending ? "Saving..." : "Complete profile"}
              {!isPending && <Check className="h-4 w-4" />}
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
