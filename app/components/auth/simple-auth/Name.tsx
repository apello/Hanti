import { User } from "@/types/schema";

const Name = ({
    userProfile,
    setUserProfile,
}: {
    userProfile: User;
    setUserProfile: React.Dispatch<React.SetStateAction<User>>;
}) => {
    return (
        <div>
            <h1>Tell us about yourself</h1>
            <h3>We&apos;ll use this to personalize your experience</h3>

            <label>First name</label>
            <input
                type="text"
                value={userProfile.firstName || ""}
                onChange={(e) => setUserProfile(prev => ({ ...prev, firstName: e.target.value }))}
                placeholder="Enter your first name"
                required
            />

            <br />

            <label>Last name</label>
            <input
                type="text"
                value={userProfile.lastName || ""}
                onChange={(e) => setUserProfile(prev => ({ ...prev, lastName: e.target.value }))}
                placeholder="Enter your last name"
                required
            />
        </div>
    );
};

export default Name;
