const EmailStep = ({
    email,
    setEmail,
    onSignUpClick,
    showSignUpLink = true,
}: {
    email: string;
    setEmail: (email: string) => void;
    onSignUpClick?: () => void;
    showSignUpLink?: boolean;
}) => {
    return (
        <div>
            <label>Email</label>
            <input
                type="email"
                value={email || ""}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
            />
            {showSignUpLink && (
                <p>Don&apos;t have an account? <a href="#" onClick={(e) => { e.preventDefault(); onSignUpClick && onSignUpClick(); }}>Sign up</a></p>
            )}
        </div>
    );
};

export default EmailStep;
