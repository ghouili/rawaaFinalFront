import React, { useEffect, useState } from "react";
import "./statistic.css";
import Partner from "../../Assets/Image/partnerAvatar.png";
import Company from "../../Assets/Image/apartement.png";
import User from "../../Assets/Image/user.png";
import { path } from "../../utils/Variables";
import axios from "axios";
import { BarStatsChart } from "../../components";

const Statistic = () => {
  const [achats, setAchats] = useState([]);
  const [nbr, setNbr] = useState({});

  useEffect(() => {
    fetchdata();
    fetchstats();
  }, []);

  const fetchdata = async () => {
    try {
      const response = await axios.get(`${path}achat`);
      // console.log("response");
      // console.log(response.data.data);
      setAchats(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };
  const fetchstats = async () => {
    try {
      const response = await axios.get(`${path}stats`);
      // console.log("response");
      // console.log(response.data.data);
      setNbr(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="w-full p-10 border">
      <div className="mt-6 grid grid-cols-3 gap-10 ">
        <div className="flex flex-col rounded-md p-3  shadow-lg bg-blue-50 dark:bg-blue-900 ">
          <div className="avatar p-1 flex  justify-center ">
            <img src={Partner} alt="user avatar" className="h-20 w-auto" />
          </div>
          <div className="user-data flex flex-col items-center  text-xl  gap-2 p-3 text-blue-900 dark:text-white ">
            <div className="flex gap-4 font-semibold ">
              <h2>Nombre des partenaires:</h2>
              <h2 className=" ">{nbr.partners}</h2>
            </div>
           
          </div>
        </div>

        <div className="flex flex-col rounded-md p-3  shadow-lg bg-blue-50 dark:bg-blue-900">
          <div className="avatar p-1 flex  justify-center ">
            <img src={Company} alt="user avatar" className="h-20 w-auto" />
          </div>
          <div className="user-data flex flex-col items-center  text-xl  gap-2 p-3 text-blue-900 dark:text-white ">
            <div className="flex gap-4 font-semibold ">
              <h2>Nombre des Amicales:</h2>
              <h2 className=" ">{nbr.companies}</h2>
            </div>
            
          </div>
        </div>

        <div className="flex flex-col rounded-md p-3  shadow-lg bg-blue-50 dark:bg-blue-900">
          <div className="avatar p-1 flex  justify-center ">
            <img src={User} alt="user avatar" className="h-20 w-auto" />
          </div>
          <div className="user-data flex flex-col items-center  text-xl  gap-2 p-3 text-blue-900 dark:text-white ">
            <div className="flex gap-4 font-semibold ">
              <h2>Nombre des utilisateurs VIP:</h2>
              <h2 className="">{nbr.vip}</h2>
            </div>
           
          </div>
        </div>
      </div>

      <div className="mt-6 w-1/2">
        <BarStatsChart achats={achats} />
        {/* <BarStatsChart achats={achats} /> */}
      </div>
    </div>
  );
};

export default Statistic;
