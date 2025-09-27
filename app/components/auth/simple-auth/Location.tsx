import { User } from "@/types/schema";

const Location = ({
  userProfile,
  setUserProfile,
}: {
  userProfile: User;
  setUserProfile: React.Dispatch<React.SetStateAction<User>>;
}) => {
  return (
    <div>
      <h1>Where are you looking?</h1>
      <h3>Tell us your preferred location</h3>

      <label>City, State, ZIP code</label>
      <input
        type="text"
        value={userProfile.location || ""}
        onChange={(e) => setUserProfile((prev) => ({ ...prev, location: e.target.value }))}
        placeholder="e.g., New York, NY or 10001"
        required
      />

      <p style={{ fontSize: '14px', color: '#666', marginTop: '10px' }}>
        This helps us show you relevant properties in your area
      </p>
    </div>
  );
};

export default Location;
