const LocationStep = ({
  location,
  setLocation,
}: {
  location: string;
  setLocation: (location: string) => void;
}) => {
  return (
    <div>
      <h1>Where are you looking?</h1>
      <h3>Tell us your preferred location</h3>

      <label>City, State, or ZIP code</label>
      <input
        type="text"
        value={location || ""}
        onChange={(e) => setLocation(e.target.value)}
        placeholder="e.g., New York, NY or 10001"
        required
      />
      
      <p style={{fontSize: '14px', color: '#666', marginTop: '10px'}}>
        This helps us show you relevant properties in your area
      </p>
    </div>
  );
};

export default LocationStep;
