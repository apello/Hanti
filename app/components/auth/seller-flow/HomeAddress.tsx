import { PropertyListing } from "@/types/schema";


const HomeAddress = ({
  homeProfile,
  setHomeProfile,
}: {
  homeProfile: PropertyListing;
  setHomeProfile: React.Dispatch<React.SetStateAction<PropertyListing>>;
}) => {
  return (
    <div>
      <h1>Tell us about your home:</h1>
      <h3>First, enter the address of the home:</h3>
      <input
        type="text"
        value={homeProfile.address || ""}
        onChange={(e) =>
          setHomeProfile((prev) => ({ ...prev, address: e.target.value }))
        }
        required
      />
    </div>
  );
};

export default HomeAddress;