import { UserInfo } from "@/types";


const FullName = ({
  userProfile,
  setUserProfile,
}: {
    userProfile: UserInfo;
    setUserProfile: React.Dispatch<React.SetStateAction<UserInfo>>;
}) => {
  return (
    <div>
      <h1>What&apos;s your name?</h1>

      <label>First Name</label>
      <input
        type="text"
        value={userProfile.firstName || ""}
        onChange={(e) =>
          setUserProfile((prev) => ({ ...prev, firstName: e.target.value }))
        }
        required
      />

      <br />

      <label>Last Name</label>
      <input
        type="text"
        value={userProfile.lastName || ""}
        onChange={(e) =>
          setUserProfile((prev) => ({ ...prev, lastName: e.target.value }))
        }
        required
      />
    </div>
  );
};

export default FullName;