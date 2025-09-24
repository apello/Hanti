import { HomeInfo } from "@/types";

const HomeDetailsA = ({
  homeProfile,
  setHomeProfile,
}: {
  homeProfile: HomeInfo;
  setHomeProfile: React.Dispatch<React.SetStateAction<HomeInfo>>;
}) => {
    // TODO: Need year format check, need a counter component with plus minus btn
    
    return (
        <div>
            <h1>Home Details</h1>

            <br />

            <label>Square Footage</label>
            <input
                type="number"
                value={homeProfile.squareFootage || ""}
                onChange={(e) => {
                    const value = parseInt(e.target.value);
                    setHomeProfile((prev) => ({ ...prev, squareFootage: value }))
                }}
                required
            />

            <br />

            <label>Year Built</label>
            <input
                type="number"
                value={homeProfile.yearBuilt || ""}
                onChange={(e) => {
                    const value = parseInt(e.target.value);
                    setHomeProfile((prev) => ({ ...prev, yearBuilt: value }))
                }}
                required
            />

            <br />

            <label>Bedrooms</label>
            <input
                type="number"
                value={homeProfile.bedrooms || ""}
                onChange={(e) => {
                    const value = parseInt(e.target.value);
                    setHomeProfile((prev) => ({ ...prev, bedrooms: value }))
                }}
                required
            />

            <br />

            <label>Full Bathrooms (Full bathrooms are ...)</label>
            <input
                type="number"
                value={homeProfile.fullBathrooms || ""}
                onChange={(e) => {
                    const value = parseInt(e.target.value);
                    setHomeProfile((prev) => ({ ...prev, fullBathrooms: value }))
                }}
                required
            />
            <br />

            <label>3/4 Bathrooms (3/4 bathrooms are ...)</label>
            <input
                type="number"
                value={homeProfile.threeFourthBathrooms || ""}
                onChange={(e) => {
                    const value = parseInt(e.target.value);
                    setHomeProfile((prev) => ({ ...prev, threeFourthBathrooms: value }))
                }}
                required
            />
            <br />

            <label>1/2 Bathrooms (1/2 bathrooms are ...)</label>
            <input
                type="number"
                value={homeProfile.oneHalfBathrooms || ""}
                onChange={(e) => {
                    const value = parseInt(e.target.value);
                    setHomeProfile((prev) => ({ ...prev, oneHalfBathrooms: value }))
                }}
                required
            />
            <br />

            <label>Floors</label>
            <input
                type="number"
                value={homeProfile.floors || ""}
                onChange={(e) => {
                    const value = parseInt(e.target.value);
                    setHomeProfile((prev) => ({ ...prev, floors: value }))
                }}
                required
            />
        </div>
    );
};

export default HomeDetailsA;