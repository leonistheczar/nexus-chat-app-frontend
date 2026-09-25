import { PhoneInput } from "react-international-phone";
import { useProfileSetupStore } from "../store/profileSetupStore";

import "react-international-phone/style.css"
export default function ContactStepFields() {
  const formData = useProfileSetupStore((state) => state.formData);
  const errors = useProfileSetupStore((state) => state.errors);
  const updateField = useProfileSetupStore((state) => state.updateField);

  return (
    <div className="space-y-1.5">
      <label htmlFor="contact" className="text-sm font-medium text-text-700">
        Contact number
      </label>
      <div id="phone-field">
      <PhoneInput 
        defaultCountry="pk"
        name="contact"
        placeholder="+92 (300) 000-0000"
        value={formData.contact}
        onChange={(value) => updateField("contact", value)}
      />
      </div>
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
