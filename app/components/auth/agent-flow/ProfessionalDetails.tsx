import React from "react";

interface AgentProfile {
    estateBoardId: string;
    licenseExpiry: string;
    agencyName?: string;
    yearsOfExperience?: number;
    officeAddress?: string;
    nationalId?: string;
    kraPin?: string;
}

const ProfessionalDetails = ({
    agentProfile,
    setAgentProfile,
}: {
    agentProfile: AgentProfile;
    setAgentProfile: React.Dispatch<React.SetStateAction<AgentProfile>>;
}) => {
    return (
        <div>
            <h1>Professional Details</h1>
            <h3>Help us verify your professional credentials</h3>

            <br />

            <label>Office Address (Optional)</label>
            <input
                type="text"
                value={agentProfile.officeAddress || ""}
                onChange={(e) => {
                    setAgentProfile((prev) => ({ ...prev, officeAddress: e.target.value }));
                }}
                placeholder="Enter your office or agency address"
            />

            <br />

            <label>National ID (Optional)</label>
            <input
                type="text"
                value={agentProfile.nationalId || ""}
                onChange={(e) => {
                    setAgentProfile((prev) => ({ ...prev, nationalId: e.target.value }));
                }}
                placeholder="Enter your Kenya National ID for verification"
            />

            <br />

            <label>KRA PIN (Optional)</label>
            <input
                type="text"
                value={agentProfile.kraPin || ""}
                onChange={(e) => {
                    setAgentProfile((prev) => ({ ...prev, kraPin: e.target.value }));
                }}
                placeholder="Enter your Kenya Revenue Authority PIN"
            />

            <br />

            <div style={{
                backgroundColor: "#f8f9fa",
                padding: "15px",
                borderRadius: "8px",
                marginTop: "20px",
                border: "1px solid #dee2e6"
            }}>
                <h4 style={{ margin: "0 0 10px 0", color: "#495057" }}>Why we collect this information:</h4>
                <ul style={{ margin: 0, paddingLeft: "20px", color: "#6c757d" }}>
                    <li>To verify your professional credentials</li>
                    <li>To ensure compliance with Kenya real estate regulations</li>
                    <li>To build trust with potential clients</li>
                    <li>All information is kept secure and confidential</li>
                </ul>
            </div>
        </div>
    );
};

export default ProfessionalDetails;