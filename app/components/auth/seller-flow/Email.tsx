import { User } from "@/types/schema";


const Email = ({
  userProfile,
  setUserProfile,
}: {
  userProfile: User;
  setUserProfile: React.Dispatch<React.SetStateAction<User>>;
}) => {
  return (
    <div>
      <h1>What&apos;s your email?</h1>
      <h3>Sign in or create an account to view your selling options:</h3>

      <label>Email</label>
      <input
        type="email"
        value={userProfile.email || ""}
        onChange={(e) =>
          setUserProfile((prev) => ({ ...prev, email: e.target.value }))
        }
        required
      />
    </div>
  );
};

export default Email;