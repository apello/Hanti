import React from "react";

interface AgentProfile {
    estateBoardId: string;
    licenseExpiry: string;
    agencyName?: string;
    yearsOfExperience?: number;
    officeAddress?: string;
    nationalId?: string;
    kraPin?: string;
    servicesOffered?: string[];
    specializations?: string[];
}

const servicesOptions = [
    "Property Sales",
    "Property Rentals",
    "Property Management",
    "Property Valuation",
    "Investment Consulting",
    "Commercial Real Estate",
    "Residential Real Estate",
    "Land Sales",
];

const specializationOptions = [
    "Luxury Properties",
    "Commercial Properties",
    "Residential Properties",
    "Land Development",
    "Investment Properties",
    "First-time Buyers",
    "Property Flipping",
    "Rental Management",
];

const ServicesSpecialization = ({
    agentProfile,
    setAgentProfile,
}: {
    agentProfile: AgentProfile;
    setAgentProfile: React.Dispatch<React.SetStateAction<AgentProfile>>;
}) => {
    const handleServiceToggle = (service: string) => {
        const currentServices = agentProfile.servicesOffered || [];
        const updatedServices = currentServices.includes(service)
            ? currentServices.filter((s) => s !== service)
            : [...currentServices, service];

        setAgentProfile((prev) => ({ ...prev, servicesOffered: updatedServices }));
    };

    const handleSpecializationToggle = (specialization: string) => {
        const currentSpecs = agentProfile.specializations || [];
        const updatedSpecs = currentSpecs.includes(specialization)
            ? currentSpecs.filter((s) => s !== specialization)
            : [...currentSpecs, specialization];

        setAgentProfile((prev) => ({ ...prev, specializations: updatedSpecs }));
    };

    const checkboxStyle = {
        marginRight: "10px",
        transform: "scale(1.2)",
    };

    const optionStyle = {
        display: "flex",
        alignItems: "center",
        padding: "10px",
        margin: "5px 0",
        border: "1px solid #ddd",
        borderRadius: "8px",
        cursor: "pointer",
        transition: "all 0.2s ease",
    };

    return (
        <div>
            <h1>Services & Specializations</h1>
            <h3>Let clients know what services you offer</h3>

            <div style={{ marginBottom: "30px" }}>
                <h4>Services Offered (Select all that apply):</h4>
                <div style={{ display: "grid", gap: "5px" }}>
                    {servicesOptions.map((service) => {
                        const isSelected = (agentProfile.servicesOffered || []).includes(service);
                        return (
                            <label
                                key={service}
                                style={{
                                    ...optionStyle,
                                    backgroundColor: isSelected ? "#f8f9ff" : "white",
                                    borderColor: isSelected ? "#007bff" : "#ddd",
                                }}
                                onClick={() => handleServiceToggle(service)}
                            >
                                <input
                                    type="checkbox"
                                    checked={isSelected}
                                    onChange={() => handleServiceToggle(service)}
                                    style={checkboxStyle}
                                />
                                {service}
                            </label>
                        );
                    })}
                </div>
            </div>

            <div>
                <h4>Specializations (Select your areas of expertise):</h4>
                <div style={{ display: "grid", gap: "5px" }}>
                    {specializationOptions.map((specialization) => {
                        const isSelected = (agentProfile.specializations || []).includes(specialization);
                        return (
                            <label
                                key={specialization}
                                style={{
                                    ...optionStyle,
                                    backgroundColor: isSelected ? "#f8f9ff" : "white",
                                    borderColor: isSelected ? "#007bff" : "#ddd",
                                }}
                                onClick={() => handleSpecializationToggle(specialization)}
                            >
                                <input
                                    type="checkbox"
                                    checked={isSelected}
                                    onChange={() => handleSpecializationToggle(specialization)}
                                    style={checkboxStyle}
                                />
                                {specialization}
                            </label>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default ServicesSpecialization;