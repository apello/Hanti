import { RentalUnit } from "@/types/schema";

const RentalDetailsB = ({
    rentalProfile,
    setRentalProfile,
}: {
    rentalProfile: RentalUnit;
    setRentalProfile: React.Dispatch<React.SetStateAction<RentalUnit>>;
}) => {
    return (
        <div>
            <h1>Property Amenities & Features</h1>

            <br />

            <label>Does the property have a pool?</label>
            <select
                value={rentalProfile.amenities.pool ? "yes" : "no"}
                onChange={(e) => {
                    const hasPool = e.target.value === "yes";
                    setRentalProfile((prev) => ({
                        ...prev,
                        amenities: {
                            ...prev.amenities,
                            pool: hasPool,
                        }
                    }));
                }}
                required
            >
                <option value="">Select</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
            </select>

            <br />

            <label>Parking</label>
            <select
                value={rentalProfile.amenities.parking || ""}
                onChange={(e) => {
                    setRentalProfile((prev) => ({
                        ...prev,
                        amenities: {
                            ...prev.amenities,
                            parking: e.target.value as "none" | "street" | "garage" | "lot",
                        }
                    }));
                }}
                required
            >
                <option value="">Select parking type</option>
                <option value="none">No parking</option>
                <option value="street">Street parking</option>
                <option value="garage">Garage</option>
                <option value="lot">Parking lot</option>
            </select>

            <br />

            <label>In-unit laundry?</label>
            <select
                value={rentalProfile.amenities.inUnitLaundry ? "yes" : "no"}
                onChange={(e) => {
                    const hasLaundry = e.target.value === "yes";
                    setRentalProfile((prev) => ({
                        ...prev,
                        amenities: {
                            ...prev.amenities,
                            inUnitLaundry: hasLaundry,
                        }
                    }));
                }}
                required
            >
                <option value="">Select</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
            </select>

            <br />

            <label>Gated Community?</label>
            <select
                value={rentalProfile.isGatedCommunity ? "yes" : "no"}
                onChange={(e) => {
                    const isGated = e.target.value === "yes";
                    setRentalProfile((prev) => ({ ...prev, isGatedCommunity: isGated }));
                }}
                required
            >
                <option value="">Select</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
            </select>

            <br />

            <label>Pet Friendly?</label>
            <select
                value={rentalProfile.amenities.petFriendly ? "yes" : "no"}
                onChange={(e) => {
                    const isPetFriendly = e.target.value === "yes";
                    setRentalProfile((prev) => ({
                        ...prev,
                        amenities: {
                            ...prev.amenities,
                            petFriendly: isPetFriendly,
                        }
                    }));
                }}
                required
            >
                <option value="">Select</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
            </select>

            <br />

            <label>Furnished?</label>
            <select
                value={rentalProfile.amenities.furnished ? "yes" : "no"}
                onChange={(e) => {
                    const isFurnished = e.target.value === "yes";
                    setRentalProfile((prev) => ({
                        ...prev,
                        amenities: {
                            ...prev.amenities,
                            furnished: isFurnished,
                        }
                    }));
                }}
                required
            >
                <option value="">Select</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
            </select>

            <br />

            <label>Gym/Fitness Center?</label>
            <select
                value={rentalProfile.amenities.gym ? "yes" : "no"}
                onChange={(e) => {
                    const hasGym = e.target.value === "yes";
                    setRentalProfile((prev) => ({
                        ...prev,
                        amenities: {
                            ...prev.amenities,
                            gym: hasGym,
                        }
                    }));
                }}
                required
            >
                <option value="">Select</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
            </select>

            <br />

            <label>Balcony/Patio?</label>
            <select
                value={rentalProfile.amenities.balcony ? "yes" : "no"}
                onChange={(e) => {
                    const hasBalcony = e.target.value === "yes";
                    setRentalProfile((prev) => ({
                        ...prev,
                        amenities: {
                            ...prev.amenities,
                            balcony: hasBalcony,
                        }
                    }));
                }}
                required
            >
                <option value="">Select</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
            </select>

            <br />

            <label>Air Conditioning?</label>
            <select
                value={rentalProfile.amenities.airConditioning ? "yes" : "no"}
                onChange={(e) => {
                    const hasAC = e.target.value === "yes";
                    setRentalProfile((prev) => ({
                        ...prev,
                        amenities: {
                            ...prev.amenities,
                            airConditioning: hasAC,
                        }
                    }));
                }}
                required
            >
                <option value="">Select</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
            </select>

            <br />

            <label>Storage Unit?</label>
            <select
                value={rentalProfile.amenities.storageUnit ? "yes" : "no"}
                onChange={(e) => {
                    const hasStorage = e.target.value === "yes";
                    setRentalProfile((prev) => ({
                        ...prev,
                        amenities: {
                            ...prev.amenities,
                            storageUnit: hasStorage,
                        }
                    }));
                }}
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

export default RentalDetailsB;