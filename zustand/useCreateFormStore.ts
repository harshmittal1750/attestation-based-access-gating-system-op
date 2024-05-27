import { create } from "zustand";

interface CreateFormState {
  currentStep: number;
  formData: {
    step1: {
      name: string;
      urlName: string;
      description: string;
      contact: string;
    };
    step2: { attestations: string };
    // step3: { email: string };
  };
  setCurrentStep: (step: number) => void;
  updateFormData: (step: keyof CreateFormState["formData"], data: any) => void;
}

export const useCreateFormStore = create<CreateFormState>((set) => ({
  currentStep: 1,
  formData: {
    step1: { name: "", urlName: "", description: "", contact: "" },
    step2: { attestations: "" },
    // step3: { email: "" },
  },
  setCurrentStep: (step) => set({ currentStep: step }),
  updateFormData: (step, data) =>
    set((state) => ({
      formData: {
        ...state.formData,
        [step]: { ...state.formData[step], ...data },
      },
    })),
}));
