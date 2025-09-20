import { HomeInfo } from "@/types";


const HomeAddress = ({
  homeProfile,
  setHomeProfile,
}: {
  homeProfile: HomeInfo;
  setHomeProfile: React.Dispatch<React.SetStateAction<HomeInfo>>;
}) => {
  return (
    <div>
      <h1>Tell us about your home:</h1>
      <h3>First, enter the address of the home:</h3>
      <input
        type="text"
        value={homeProfile.homeAddress || ""}
        onChange={(e) =>
          setHomeProfile((prev) => ({ ...prev, homeAddress: e.target.value }))
        }
        required
      />
    </div>
  );
};

export default HomeAddress;