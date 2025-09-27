import { PropertyListing } from "@/types/schema";

const HomeDetailsA = ({
  homeProfile,
  setHomeProfile,
}: {
  homeProfile: PropertyListing;
  setHomeProfile: React.Dispatch<React.SetStateAction<PropertyListing>>;
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
                value={homeProfile.bathrooms.full || ""}
                onChange={(e) => {
                    const value = parseInt(e.target.value) || 0;
                    setHomeProfile((prev) => ({
                        ...prev,
                        bathrooms: {
                            ...prev.bathrooms,
                            full: value,
                        },
                    }));
                }}
                required
            />
            <br />

            <label>3/4 Bathrooms (3/4 bathrooms are ...)</label>
            <input
                type="number"
                value={homeProfile.bathrooms.threeQuarter || ""}
                 onChange={(e) => {
                    const value = parseInt(e.target.value) || 0;
                    setHomeProfile((prev) => ({
                        ...prev,
                        bathrooms: {
                            ...prev.bathrooms,
                            threeQuarter: value,
                        },
                    }));
                }}
                required
            />
            <br />

            <label>1/2 Bathrooms (1/2 bathrooms are ...)</label>
            <input
                type="number"
                value={homeProfile.bathrooms.half || ""}
                onChange={(e) => {
                    const value = parseInt(e.target.value) || 0;
                    setHomeProfile((prev) => ({
                        ...prev,
                        bathrooms: {
                            ...prev.bathrooms,
                            half: value,
                        },
                    }));
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