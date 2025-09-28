import React from "react";

interface AgentProfile {
    estateBoardId: string;
    licenseExpiry: string;
    agencyName?: string;
    yearsOfExperience?: number;
}

const LicenseDetails = ({
    agentProfile,
    setAgentProfile,
}: {
    agentProfile: AgentProfile;
    setAgentProfile: React.Dispatch<React.SetStateAction<AgentProfile>>;
}) => {
    return (
        <div>
            <h1>License Details</h1>
            <h3>Please provide your professional licensing information</h3>

            <br />

            <label>Estate Agent Registration Board ID</label>
            <input
                type="text"
                value={agentProfile.estateBoardId || ""}
                onChange={(e) => {
                    setAgentProfile((prev) => ({ ...prev, estateBoardId: e.target.value }));
                }}
                placeholder="Enter your EARB registration number"
                required
            />

            <br />

            <label>License Expiry Date</label>
            <input
                type="date"
                value={agentProfile.licenseExpiry || ""}
                onChange={(e) => {
                    setAgentProfile((prev) => ({ ...prev, licenseExpiry: e.target.value }));
                }}
                required
            />

            <br />

            <label>Agency/Company Name (Optional)</label>
            <input
                type="text"
                value={agentProfile.agencyName || ""}
                onChange={(e) => {
                    setAgentProfile((prev) => ({ ...prev, agencyName: e.target.value }));
                }}
                placeholder="Enter your agency or company name"
            />

            <br />

            <label>Years of Experience (Optional)</label>
            <input
                type="number"
                min="0"
                max="50"
                value={agentProfile.yearsOfExperience || ""}
                onChange={(e) => {
                    const value = parseInt(e.target.value) || undefined;
                    setAgentProfile((prev) => ({ ...prev, yearsOfExperience: value }));
                }}
                placeholder="How many years have you been an agent?"
            />
        </div>
    );
};

export default LicenseDetails;