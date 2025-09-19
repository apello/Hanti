import { HomeInfo } from "@/types";

const HomeDetailsB = ({
  homeProfile,
  setHomeProfile,
}: {
  homeProfile: HomeInfo;
  setHomeProfile: React.Dispatch<React.SetStateAction<HomeInfo>>;
}) => {
  return (
    <div>
        <h1>Home Details</h1>

        <br />

        <label>Do you have a pool?</label>
        <select
            value={homeProfile.hasPool || ""}
            onChange={(e) => {
                const newValue = e.target.value;
                setHomeProfile((prev) => ({
                    ...prev,
                    hasPool: newValue,
                    poolType: newValue === "no" ? "" : prev.poolType,
                }));
            }}
            required
        >
            <option value="">Select</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
        </select>

       

        {(homeProfile.hasPool === "yes" &&
            <>
                <br />
                <label>Type of Pool</label>
                <select
                    value={homeProfile.poolType || ""}
                        onChange={(e) =>
                        setHomeProfile((prev) => ({ ...prev, poolType: e.target.value }))
                    }
                    required
                >
                    <option value="">Select</option>
                    <option value="above ground">Above Ground</option>
                    <option value="in ground">In-Ground</option>
                </select>
            </>
        )}

      <br />

      <label>Covered Parking Spaces (Garage/Outdoor)</label>
      <input
        type="number"
        value={homeProfile.parkingSpaces || ""}
        onChange={(e) => {
            const value = parseInt(e.target.value);
            setHomeProfile((prev) => ({ ...prev, parkingSpaces: value }))
        }}
        required
      />

      <br />

      <label>Do you have a basement?</label>
      <select
        value={homeProfile.hasBasement || ""}
        onChange={(e) => {
            const newValue = e.target.value;
            setHomeProfile((prev) => ({
                ...prev,
                hasBasement: newValue,
                basementSquareFootage: newValue === "no" ? undefined : prev.basementSquareFootage,
            }));
        }}
        required
      >
        <option value="">Select</option>
        <option value="yes">Yes</option>
        <option value="no">No</option>
      </select>

      {(homeProfile.hasBasement === "yes" &&
            <>
                <br/>
                <label>Basement Square Footage</label>
                <input
                    type="number"
                    value={homeProfile.basementSquareFootage || ""}
                    onChange={(e) => {
                        const value = parseInt(e.target.value);
                        setHomeProfile((prev) => ({
                            ...prev,
                            basementSquareFootage: value
                        }))
                    }}
                    required
                />
            </>
        )}

      <br />

      <label>Gated Community?</label>
      <select
        value={homeProfile.gatedCommunity || ""}
        onChange={(e) => 
          setHomeProfile((prev) => ({ ...prev, gatedCommunity: e.target.value }))
        }
        required
      >
        <option value="">Select</option>
        <option value="yes">Yes</option>
        <option value="no">No</option>
      </select>

      <br />

    </div>
  );
};

export default HomeDetailsB;