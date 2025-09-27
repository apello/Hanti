import { User } from "@/types/schema";

const PasswordStep = ({
  userProfile,
  setUserProfile,
}: {
    userProfile: User;
    setUserProfile: React.Dispatch<React.SetStateAction<User>>;
}) => {
    return (
        <div>
            <label>Password</label>
            <input
                type="password"
                value={userProfile.password || ""}
                onChange={(e) => setUserProfile((prev) => ({ ...prev, password: e.target.value }))}
                placeholder="Enter your password"
                required
            />
        </div>
    );
};

export default PasswordStep;
