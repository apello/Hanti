import { User } from "@/types/schema";

const Purpose = ({
    userProfile,
    setUserProfile,
}: {
    userProfile: User;
    setUserProfile: React.Dispatch<React.SetStateAction<User>>;
}) => {
    const roles = [
        { id: "buyer", label: "I'm a buyer", description: "Looking to buy property" },
        { id: "seller", label: "I'm a seller", description: "Looking to sell my property" },
        { id: "agent", label: "I'm an agent", description: "Real estate professional" }
    ];

    return (
        <div>
            <h1>What's your role?</h1>
            <h3>Help us personalize your experience</h3>

            <div style={{ display: "grid", gap: "10px", marginTop: "20px" }}>
                {roles.map((item) => (
                    <button
                        key={item.id}
                        type="button"
                        onClick={() => setUserProfile(prev => ({ ...prev, role: item.id as "buyer" | "seller" | "agent" }))}
                        style={{
                            width: "100%",
                            padding: "15px",
                            border: userProfile.role === item.id ? "2px solid #007bff" : "1px solid #ddd",
                            borderRadius: "8px",
                            backgroundColor: userProfile.role === item.id ? "#f8f9ff" : "white",
                            cursor: "pointer",
                            textAlign: "left"
                        }}
                    >
                        <div style={{ fontWeight: "600", fontSize: "16px", color: "#333" }}>
                            {item.label}
                        </div>
                        <div style={{ fontSize: "14px", color: "#666", marginTop: "5px" }}>
                            {item.description}
                        </div>
                    </button>
                ))}
            </div>
        </div>
    );
};

export default Purpose;
