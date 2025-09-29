import { RentalUnit } from "@/types/schema";

const RentalTimeline = ({
    rentalProfile,
    setRentalProfile,
}: {
    rentalProfile: RentalUnit;
    setRentalProfile: React.Dispatch<React.SetStateAction<RentalUnit>>;
}) => {
    return (
        <div>
            <h1>Rental Timeline & Pricing</h1>
            <h3>When is the property available for rent?</h3>
            <input
                type="date"
                value={rentalProfile.availableFrom ? rentalProfile.availableFrom.toISOString().split('T')[0] : ""}
                onChange={(e) => {
                    const date = new Date(e.target.value);
                    setRentalProfile((prev) => ({ ...prev, availableFrom: date }));
                }}
                required
            />

            <br />
            <br />

            <label>Preferred lease length:</label>
            <select
                value={rentalProfile.leaseLength || ""}
                onChange={(e) =>
                    setRentalProfile((prev) => ({ ...prev, leaseLength: e.target.value as "month-to-month" | "6 months" | "12 months" | "24 months" }))
                }
                required
            >
                <option value="">Select lease length</option>
                <option value="month-to-month">Month-to-Month</option>
                <option value="6 months">6 Months</option>
                <option value="12 months">12 Months</option>
                <option value="24 months">24 Months</option>
            </select>

            <br />
            <br />

            <label>Monthly Rent (KSH):</label>
            <input
                type="number"
                value={rentalProfile.monthlyRent || ""}
                onChange={(e) => {
                    const value = parseInt(e.target.value) || 0;
                    setRentalProfile((prev) => ({ ...prev, monthlyRent: value }));
                }}
                required
                placeholder="e.g., 50000"
            />

            <br />
            <br />

            <label>Security Deposit (KSH):</label>
            <input
                type="number"
                value={rentalProfile.securityDeposit || ""}
                onChange={(e) => {
                    const value = parseInt(e.target.value) || 0;
                    setRentalProfile((prev) => ({ ...prev, securityDeposit: value }));
                }}
                placeholder="e.g., 100000 (optional)"
            />
        </div>
    );
};

export default RentalTimeline;