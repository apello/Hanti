const NameStep = ({
    firstName,
    setFirstName,
    lastName,
    setLastName,
}: {
    firstName: string;
    setFirstName: (firstName: string) => void;
    lastName: string;
    setLastName: (lastName: string) => void;
}) => {
    return (
        <div>
            <h1>Tell us about yourself</h1>
            <h3>We&apos;ll use this to personalize your experience</h3>

            <label>First name</label>
            <input
                type="text"
                value={firstName || ""}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="Enter your first name"
                required
            />

            <br />

            <label>Last name</label>
            <input
                type="text"
                value={lastName || ""}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Enter your last name"
                required
            />
        </div>
    );
};

export default NameStep;
