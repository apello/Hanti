const PasswordStep = ({
    password,
    setPassword,
}: {
    password: string;
    setPassword: (password: string) => void;
}) => {
    return (
        <div>
            <label>Password</label>
            <input
                type="password"
                value={password || ""}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
            />
        </div>
    );
};

export default PasswordStep;
