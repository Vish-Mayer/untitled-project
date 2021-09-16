import { useEffect, useState } from "react";
import { LOCALIP, PORT } from "react-native-dotenv";

const useGetGolfBag = user_id => {
  const [golfBagData, setGolfBagData] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch(
          `http://${LOCALIP}:${PORT}/golf-bag/${user_id}`
        );
        const parsedResponse = await response.json();
        setGolfBagData(parsedResponse);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, [user_id]);
  return {
    golfBagData
  };
};

export default useGetGolfBag;
