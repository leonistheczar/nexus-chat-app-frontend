"use client";

import ThemeToggler from "../baseComponents/ThemeToggler";
import { PROFILE_STEPS } from "./constants/profileSteps";
import ProfileSetupComplete from "./ProfileSetupComplete";
import ProfileSetupForm from "./ProfileSetupForm";
import ProfileSetupHeader from "./ProfileSetupHeader";
import { useProfileSetupStore } from "./store/profileSetupStore";

export default function ProfileSetupClient() {
  const isComplete = useProfileSetupStore((state) => state.isComplete);
  const currentStep = useProfileSetupStore((state) => state.currentStep);

  if (isComplete) {
    return <ProfileSetupComplete />;
  }

  return (
    <section className=" bg-background-50 px-4 py-10">
      <div className="">
        <ThemeToggler />
      </div>
      <div className="container  flex items-center justify-center">
        <div className="w-full max-w-2xl space-y-8">
          <ProfileSetupHeader />
          <ProfileSetupForm />
          <p className="text-center text-xs text-text-400">
            Step {currentStep} of {PROFILE_STEPS.length}
          </p>
        </div>
      </div>
    </section>
  );
}
