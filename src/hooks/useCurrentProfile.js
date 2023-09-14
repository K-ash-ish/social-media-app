const { useState, useEffect } = require("react");

export function useCurrentProfile() {
  const [profileData, setProfileData] = useState();
  useEffect(() => {
    fetch("/api/profile")
      .then(async (res) => res.json())
      .then((data) => setProfileData(data.message));
  }, []);

  return profileData;
}
