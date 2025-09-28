import { SignUpCredentials } from "@/types";

const Email = ({
    userProfile,
    setUserProfile
}: {
    userProfile: SignUpCredentials;
    setUserProfile: React.Dispatch<React.SetStateAction<SignUpCredentials>>;
}) => {
    return (
        <div>
             <h1>What&apos;s your email?</h1>
            <h3>Check your email for a verification, we&apos;ll use this to contact you</h3>

            <label>Email</label>
            <input
                type="email"
                value={userProfile.email || ""}
                onChange={(e) => setUserProfile(prev => ({ ...prev, email: e.target.value }))}
                placeholder="Enter your email"
                required
            />
        </div>
    );
};

export default Email;
