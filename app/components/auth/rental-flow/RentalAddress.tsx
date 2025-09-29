import { RentalUnit } from "@/types/schema";

const RentalAddress = ({
    rentalProfile,
    setRentalProfile,
}: {
    rentalProfile: RentalUnit;
    setRentalProfile: React.Dispatch<React.SetStateAction<RentalUnit>>;
}) => {
    return (
        <div>
            <h1>Tell us about your rental property:</h1>
            <h3>First, enter the address of the rental property:</h3>
            <input
                type="text"
                value={rentalProfile.address || ""}
                onChange={(e) =>
                    setRentalProfile((prev) => ({ ...prev, address: e.target.value }))
                }
                required
                placeholder="Enter property address"
            />
            <br />
            <br />
            <label>Unit Number (if applicable):</label>
            <input
                type="text"
                value={rentalProfile.unitNumber || ""}
                onChange={(e) =>
                    setRentalProfile((prev) => ({ ...prev, unitNumber: e.target.value }))
                }
                placeholder="e.g., Apt 2B, Unit 101 (optional)"
            />
        </div>
    );
};

export default RentalAddress;