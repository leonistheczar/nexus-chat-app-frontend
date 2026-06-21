import { useProfileSetupStore } from "../store/profileSetupStore";

export default function NameStepFields() {
  const formData = useProfileSetupStore((state) => state.formData);
  const errors = useProfileSetupStore((state) => state.errors);
  const updateField = useProfileSetupStore((state) => state.updateField);

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <div className="space-y-1.5">
        <label htmlFor="firstName" className="text-sm font-medium text-text-700">
          First name
        </label>
        <input
          id="firstName"
          type="text"
          autoComplete="given-name"
          placeholder="John"
          value={formData.firstName}
          onChange={(event) => updateField("firstName", event.target.value)}
          className="input"
        />
        {errors.firstName && (
          <p className="text-xs text-accent-500">{errors.firstName}</p>
        )}
      </div>

      <div className="space-y-1.5">
        <label htmlFor="lastName" className="text-sm font-medium text-text-700">
          Last name
        </label>
        <input
          id="lastName"
          type="text"
          autoComplete="family-name"
          placeholder="Doe"
          value={formData.lastName}
          onChange={(event) => updateField("lastName", event.target.value)}
          className="input"
        />
        {errors.lastName && (
          <p className="text-xs text-accent-500">{errors.lastName}</p>
        )}
      </div>
    </div>
  );
}
