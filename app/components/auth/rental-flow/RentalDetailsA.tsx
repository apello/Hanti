import { RentalUnit } from "@/types/schema";

const RentalDetailsA = ({
    rentalProfile,
    setRentalProfile,
}: {
    rentalProfile: RentalUnit;
    setRentalProfile: React.Dispatch<React.SetStateAction<RentalUnit>>;
}) => {
    // TODO: Need year format check, need a counter component with plus minus btn

    return (
        <div>
            <h1>Rental Property Details</h1>

            <br />

            <label>Square Footage</label>
            <input
                type="number"
                value={rentalProfile.squareFootage || ""}
                onChange={(e) => {
                    const value = parseInt(e.target.value) || 0;
                    setRentalProfile((prev) => ({ ...prev, squareFootage: value }))
                }}
                required
                placeholder="e.g., 1200"
            />

            <br />

            <label>Building Year Built</label>
            <input
                type="number"
                value={rentalProfile.buildingYear || ""}
                onChange={(e) => {
                    const value = parseInt(e.target.value) || 0;
                    setRentalProfile((prev) => ({ ...prev, buildingYear: value }))
                }}
                required
                placeholder="e.g., 2015"
            />

            <br />

            <label>Bedrooms</label>
            <input
                type="number"
                value={rentalProfile.bedrooms || ""}
                onChange={(e) => {
                    const value = parseInt(e.target.value) || 0;
                    setRentalProfile((prev) => ({ ...prev, bedrooms: value }))
                }}
                required
            />

            <br />

            <label>Full Bathrooms (with shower/bathtub, sink, and toilet)</label>
            <input
                type="number"
                value={rentalProfile.bathrooms.full || ""}
                onChange={(e) => {
                    const value = parseInt(e.target.value) || 0;
                    setRentalProfile((prev) => ({
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

            <label>Half Bathrooms (sink and toilet only)</label>
            <input
                type="number"
                value={rentalProfile.bathrooms.half || ""}
                onChange={(e) => {
                    const value = parseInt(e.target.value) || 0;
                    setRentalProfile((prev) => ({
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

            <label>Floors in Unit</label>
            <input
                type="number"
                value={rentalProfile.floorsInUnit || ""}
                onChange={(e) => {
                    const value = parseInt(e.target.value) || 1;
                    setRentalProfile((prev) => ({ ...prev, floorsInUnit: value }))
                }}
                required
                placeholder="e.g., 1 for apartment, 2 for duplex"
            />
        </div>
    );
};

export default RentalDetailsA;