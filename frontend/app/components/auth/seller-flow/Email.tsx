import { UserInfo } from "@/types";


const Email = ({
  userProfile,
  setUserProfile,
}: {
  userProfile: UserInfo;
  setUserProfile: React.Dispatch<React.SetStateAction<UserInfo>>;
}) => {
  return (
    <div>
      <h1>What&apos;s your email?</h1>
      <h3>Sign in or create an account to view your selling options:</h3>

      <label>Email</label>
      <input
        type="email"
        value={userProfile.sellerEmail || ""}
        onChange={(e) =>
          setUserProfile((prev) => ({ ...prev, sellerEmail: e.target.value }))
        }
        required
      />
    </div>
  );
};

export default Email;