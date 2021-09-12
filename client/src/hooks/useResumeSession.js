import { useEffect, useState } from "react";

const useResumeSession = isVerified => {
  const [isLoadingSession, setIsLoadingSession] = useState(false);

  useEffect(() => {
    if (isVerified === null) {
      setIsLoadingSession(true);
    } else {
      setIsLoadingSession(false);
    }
  }, [isVerified]);
  return { isLoadingSession };
};

export default useResumeSession;
