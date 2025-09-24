import { UserInfo } from "@/types";


const PhoneNumber = ({
  userProfile,
  setUserProfile,
}: {
    userProfile: UserInfo;
    setUserProfile: React.Dispatch<React.SetStateAction<UserInfo>>;
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