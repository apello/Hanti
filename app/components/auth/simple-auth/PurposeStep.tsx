const PurposeStep = ({
    purpose,
    setPurpose,
}: {
    purpose: string;
    setPurpose: (purpose: string) => void;
}) => {
    const purposes = [
        { id: "buy", label: "I want to buy a home", description: "Find your dream property" },
        { id: "rent", label: "I want to rent", description: "Find your perfect rental" },
        { id: "sell", label: "I want to sell my home", description: "Get the best price for your property" },
        { id: "invest", label: "I&apos;m looking to invest", description: "Build your real estate portfolio" },
        { id: "explore", label: "Just exploring", description: "See what&apos;s available in my area" }
    ];

    return (
        <div>
            <h1>What brings you to Hanti today?</h1>
            <h3>Help us personalize your experience</h3>

            <div style={{ display: "grid", gap: "10px", marginTop: "20px" }}>
                {purposes.map((item) => (
                    <button
                        key={item.id}
                        type="button"
                        onClick={() => setPurpose(item.id)}
                        style={{
                            width: "100%",
                            padding: "15px",
                            border: purpose === item.id ? "2px solid #007bff" : "1px solid #ddd",
                            borderRadius: "8px",
                            backgroundColor: purpose === item.id ? "#f8f9ff" : "white",
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

export default PurposeStep;
