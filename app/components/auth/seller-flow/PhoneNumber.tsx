import { User } from "@/types/schema";


const PhoneNumber = ({
  userProfile,
  setUserProfile,
}: {
    userProfile: User;
    setUserProfile: React.Dispatch<React.SetStateAction<User>>;
}) => {
  return (
    <div>
      <h1>What&apos;s your name?</h1>
      <h3>We&apos;ll send you a text so you can get help when you&apos;re ready.</h3>

      <label>Phone</label>
      <input
        type="tel" 
        value={userProfile.phoneNumber || ""}
        onChange={(e) =>
          setUserProfile((prev) => ({ ...prev, phoneNumber: e.target.value }))
        }
        required
      />
    </div>
  );
};

export default PhoneNumber;