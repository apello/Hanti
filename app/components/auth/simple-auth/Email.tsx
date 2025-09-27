import { User } from "@/types/schema";

const Email = ({
    userProfile,
    setUserProfile,
    onSignUpClick,
    showSignUpLink = true,
}: {
    userProfile: User;
    setUserProfile: React.Dispatch<React.SetStateAction<User>>;
    onSignUpClick?: () => void;
    showSignUpLink?: boolean;
}) => {
    return (
        <div>
            <label>Email</label>
            <input
                type="email"
                value={userProfile.email || ""}
                onChange={(e) => setUserProfile(prev => ({ ...prev, email: e.target.value }))}
                placeholder="Enter your email"
                required
            />
            {showSignUpLink && (
                <p>Don&apos;t have an account? <a href="#" onClick={(e) => { e.preventDefault(); onSignUpClick && onSignUpClick(); }}>Sign up</a></p>
            )}
        </div>
    );
};

export default Email;
