import { create } from "zustand";
import { INITIAL_PROFILE_FORM_DATA, PROFILE_STEPS } from "../constants/profileSteps";
import type { ProfileFormData, ProfileFormErrors } from "../types/profileForm";
import { validateProfileStep } from "../validation/validateProfileStep";

type ProfileSetupState = {
  currentStep: number;
  formData: ProfileFormData;
  errors: ProfileFormErrors;
  isComplete: boolean;
  updateField: (field: keyof ProfileFormData, value: string) => void;
  goToNextStep: () => boolean;
  goToPreviousStep: () => void;
  validateCurrentStep: () => boolean;
  setComplete: (value: boolean) => void;
  reset: () => void;
};

export const useProfileSetupStore = create<ProfileSetupState>((set, get) => ({
  currentStep: 1,
  formData: { ...INITIAL_PROFILE_FORM_DATA },
  errors: {},
  isComplete: false,

  updateField: (field, value) => {
    set((state) => {
      const errors = { ...state.errors };
      delete errors[field];

      return {
        formData: { ...state.formData, [field]: value },
        errors,
      };
    });
  },

  validateCurrentStep: () => {
    const { currentStep, formData } = get();
    const stepErrors = validateProfileStep(currentStep, formData);

    if (Object.keys(stepErrors).length > 0) {
      set({ errors: stepErrors });
      return false;
    }

    set({ errors: {} });
    return true;
  },

  goToNextStep: () => {
    if (!get().validateCurrentStep()) {
      return false;
    }

    set((state) => ({
      currentStep: Math.min(state.currentStep + 1, PROFILE_STEPS.length),
    }));

    return true;
  },

  goToPreviousStep: () => {
    set((state) => ({
      errors: {},
      currentStep: Math.max(state.currentStep - 1, 1),
    }));
  },

  setComplete: (value) => set({ isComplete: value }),

  reset: () =>
    set({
      currentStep: 1,
      formData: { ...INITIAL_PROFILE_FORM_DATA },
      errors: {},
      isComplete: false,
    }),
}));
