import "./dashboard.css";
import React from 'react'
 import Frontapp from "../../Assets/Image/frontapp.png"
const dashboard = () => {
  return (
    <div className="home__page w-full h-screen">
    <div className=" flex flex-row">
      <div className="w-1/2 h-screnn">
        <div className="flex flex-col justify-center items-center h-full ">
        <p className="text-sky-900 text-5xl font-bold  ">Fidness</p>
        <p className="text-yellow-600 text-5xl font-bold   ">le portefeuille mobile</p>
        <p className="text-white text-xl p-10  ">Transformer votre téléphone en portefeuille en ajoutant toutes vos cartes de fidélité en quelques secondes.Fidness est une e-wallet qui simplifie votre vie et récompense vos achats . C'est une application tout en un pour des achats malins et des courses faciles plus rapideset sans contact en caisse . MADE IN TUNISIA  </p>
        </div>
      </div>

      <div className="w-1/2 h-screen pr-4 flex justify-center items-center ">
        <img src={Frontapp} alt="frontapp" className=" max-w-full  h-auto" />
      </div>
      </div>
    </div>
  )
}

export default dashboard