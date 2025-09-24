import { HomeInfo } from "@/types";

const SellingTimeline = ({
  homeProfile,
  setHomeProfile,
}: {
  homeProfile: HomeInfo;
  setHomeProfile: React.Dispatch<React.SetStateAction<HomeInfo>>;
}) => {
  return (
    <div>
      <h1>Timeline</h1>
      <h3>How soon do you want to sell?</h3>
      <select
        value={homeProfile.timeline || ""}
        onChange={(e) =>
          setHomeProfile((prev) => ({ ...prev, timeline: e.target.value }))
        }
        required
      >
        <option value="">Select</option>
        <option value="immediatly">Immediately</option>
        <option value="3-6 months">3–6 Months</option>
        <option value="flexible">Flexible</option>
      </select>
    </div>
  );
};

export default SellingTimeline;