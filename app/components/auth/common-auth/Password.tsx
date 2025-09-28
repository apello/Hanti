import { SignUpCredentials } from "@/types";

const Password = ({
    userProfile,
    setUserProfile,
}: {
    userProfile: SignUpCredentials;
    setUserProfile: React.Dispatch<React.SetStateAction<SignUpCredentials>>;
}) => {
    return (
        <div>
            <label>Password</label>
            <input
                type="password"
                value={userProfile.passwordHash || ""}
                onChange={(e) => setUserProfile((prev) => ({ ...prev, passwordHash: e.target.value }))}
                placeholder="Enter your password"
                required
            />
        </div>
    );
};

export default Password;
