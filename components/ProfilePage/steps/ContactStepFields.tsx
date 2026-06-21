import { useProfileSetupStore } from "../store/profileSetupStore";

export default function ContactStepFields() {
  const formData = useProfileSetupStore((state) => state.formData);
  const errors = useProfileSetupStore((state) => state.errors);
  const updateField = useProfileSetupStore((state) => state.updateField);

  return (
    <div className="space-y-1.5">
      <label htmlFor="contact" className="text-sm font-medium text-text-700">
        Contact number
      </label>
      <input
        id="contact"
        type="tel"
        autoComplete="tel"
        placeholder="+1 (555) 000-0000"
        value={formData.contact}
        onChange={(event) => updateField("contact", event.target.value)}
        className="input"
      />
      {errors.contact ? (
        <p className="text-xs text-accent-500">{errors.contact}</p>
      ) : (
        <p className="text-xs text-text-400">
          Include your country code for international numbers.
        </p>
      )}
    </div>
  );
}
