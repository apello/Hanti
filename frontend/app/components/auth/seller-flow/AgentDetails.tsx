import { HomeInfo } from "@/types";

const AgentDetails = ({
  homeProfile,
  setHomeProfile,
}: {
  homeProfile: HomeInfo;
  setHomeProfile: React.Dispatch<React.SetStateAction<HomeInfo>>;
}) => {
    const options = [
        "I am a real estate agent for the owner",
        "I am a real estate agent and the owner",
        "I am working with a home builder",
        "I have signed an agreement with the agent to sell my home",
        "I am a real estate agent for the owner",
    ];

    return (
        <div>
            <h1>Before we get started, do any of these apply to you?</h1>
            <h3>
                We may be required to share your selling options with your agent if an
                agreement has been signed.
            </h3>

            {options.map((label, id) => (
                <div key={id}>
                    <input
                        type="radio"
                        name="agentDetails"
                        value={(id + 1).toString()}
                        checked={homeProfile.agentDetails === id + 1}
                        onChange={() =>
                            setHomeProfile((prev) => ({
                                ...prev,
                                agentDetails: id + 1
                            }))
                        }
                        required
                    />
                    <label>{label}</label>
                    <br />
                </div>
            ))}
        </div>
    );
};

export default AgentDetails;