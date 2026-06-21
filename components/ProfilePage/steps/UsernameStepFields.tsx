import { useProfileSetupStore } from "../store/profileSetupStore";

export default function UsernameStepFields() {
  const formData = useProfileSetupStore((state) => state.formData);
  const errors = useProfileSetupStore((state) => state.errors);
  const updateField = useProfileSetupStore((state) => state.updateField);

  return (
    <div className="space-y-1.5">
      <label htmlFor="username" className="text-sm font-medium text-text-700">
        Username
      </label>
      <div className="relative">
        <input
          id="username"
          type="text"
          autoComplete="username"
          placeholder="@johndoe"
          value={formData.username}
          onChange={(event) =>
            updateField("username", event.target.value.toLowerCase())
          }
          className="input"
        />
      </div>
      {errors.username ? (
        <p className="text-xs text-accent-500">{errors.username}</p>
      ) : (
        <p className="text-xs text-text-400">
          3–20 characters. Letters, numbers, and underscores only.
        </p>
      )}
    </div>
  );
}
