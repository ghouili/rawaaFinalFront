import "./partners.css";
import React, { useState, useEffect, useRef, Fragment } from "react";
import { Link, useNavigate } from "react-router-dom";
import { RiDeleteBin5Line } from "react-icons/ri";
import { FiUserPlus, FiUpload } from "react-icons/fi";
import { GiCancel } from "react-icons/gi";
import { HiPencilAlt } from "react-icons/hi";
import { BiEdit } from "react-icons/bi";
import Cookies from "universal-cookie";
import swal from "sweetalert";
import axios from "axios";
import { path } from "../../utils/Variables";
import Avatar from "../../Assets/Images/user.png";
import { InputField } from "../../components";

import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";

export const Partners = () => {
  const cookies = new Cookies();
  let navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phonenumber, setPhoneNumber] = useState("");
  const [governorat, setGovernorat] = useState("");
  const [adresse, setAdresse] = useState("");
  const [picture, setPicture] = useState(null);

  const [id, setId] = useState(null);
  const [data, setData] = useState([]);

  const validate_form = () => {
    cookies.set("user", "rawaa");
    navigate("/");
  };
  const [addModal, setAddModal] = useState(false);

  const [search, setSearch] = useState("");
  const [filterData, setfilterData] = useState([]);
  const [masterData, setMasterData] = useState([]);

  const [previewUrl, setPreviewUrl] = useState();
  const [isValid, setIsValid] = useState(false);
  const [File, setFile] = useState();
  const [open, setOpen] = useState(false);

  const filePickerRef = useRef();
  let subtitle;

  const handleOpen = () => setOpen(!open);

  useEffect(() => {
    if (!File) {
      return;
    }
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPreviewUrl(fileReader.result);
    };

    fileReader.readAsDataURL(File);
  }, [File]);

  const closeModel = () => {
    setEmail("");
    setName("");
    setPhoneNumber("");
    setGovernorat("");
    setAdresse("");
    setPicture(null);
    setFile(null);
    setAddModal(false);
    setId(null);
    setOpen(null);
    setPreviewUrl(null);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const searchFilter = (text) => {
    if (text) {
      const newData = masterData.filter((item) => {
        const itemData = Object.values(item).join(" ").toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setfilterData(newData);
      setSearch(text);
    } else {
      setfilterData(masterData);
      setSearch(text);
    }
  };

  const pickedHandler = (event) => {
    let pickedFile;
    let fileIsValid = isValid;
    if (event.target.files && event.target.files.length === 1) {
      pickedFile = event.target.files[0];
      setFile(pickedFile);
      setIsValid(true);
      fileIsValid = true;
    } else {
      setIsValid(false);
      fileIsValid = false;
    }
    /* props.onInput(props.id, pickedFile, fileIsValid); */
  };

  const fetchData = async () => {
    const response = await fetch(`${path}partner`, {
      method: "GET",
    });

    const result = await response.json();
    if (result.success) {
      setMasterData(result.data);
      setfilterData(result.data);
    }
  };

  const submitPartner = async (e) => {
    e.preventDefault();
    console.log(name);
    const formData = new FormData();
    if (File) {
      formData.append("avatar", File);
    }
    formData.append("name", name);
    formData.append("phonenumber", phonenumber);
    formData.append("email", email);
    formData.append("adresse", adresse);
    formData.append("governorat", governorat);

    let url, meth;

    if (id) {
      url = `http://localhost:5000/partner/update/${id}`;
      meth = "PUT";
    } else {
      url = `http://localhost:5000/partner/ajout`;
      meth = "POST";
    }
    const response = await fetch(url, {
      method: meth,
      // headers: {
      //   "Content-Type": "application/json",
      // },
      body: formData,

      // body: JSON.stringify({
      //   email,
      //   phonenumber,
      //   name,
      //   governorat,
      //   adresse,
      // }),
    });

    const result = await response.json();
    console.log(result);
    if (result.success) {
      fetchData();
      closeModel();
      swal("Success!!", result.message, "success");
    } else {
      swal("ERROR!!", result.message, "error");
    }
  };

  const onchange = (e) => {
    if (e.target.name === "email") {
      setEmail(e.target.value);
    } else if (e.target.name === "name") {
      setName(e.target.value);
    } else if (e.target.name === "phonenumber") {
      setPhoneNumber(e.target.value);
    } else if (e.target.name === "governorat") {
      setGovernorat(e.target.value);
    } else if (e.target.name === "adresse") {
      setAdresse(e.target.value);
    }
  };

  const updatePartners = (item) => {
    console.log(item);
    setEmail(item.email);
    setFile(item.file);
    setName(item.name);
    setPhoneNumber(item.phonenumber);
    setGovernorat(item.governorat);
    setPicture(item.avatar);
    setAdresse(item.adresse);
    setOpen(!open);
    setId(item._id);
  };

  const DeletePartner = async (id) => {
    const willDelete = await swal({
      title: "Supprimer?",
      text: "Êtes-vous sûr de vouloir supprimer cet partenaire?",
      icon: "warning",
      dangerMode: true,
      buttons: {
        cancel: {
          text: "Annuler",
          value: null,
          visible: true,
          className: "",
          closeModal: true,
        },
        confirm: {
          text: "Supprimer",
          value: true,
          visible: true,
          className: "bg-red-500",
          closeModal: true,
        },
      },
    });
    if (willDelete) {
      const result = await axios.delete(
        `http://localhost:5000/partner/delete/${id}`
      );

      if (result.data.success) {
        fetchData();
        swal("Success!!", result.data.message, "success");
      } else {
        swal("ERROR!!", result.data.message, "error");
      }
    }
  };

  return (
    <div className="w-full  relative  p-10 ">
      <div className="px-6 py-2 w-full flex flex-row bg-white dark:bg-blue-900 shadow items-center justify-between rounded-md border">
        <div className="flex flex-row gap-1 ">
          <Link to="/" className="font-semibold text-blue-900 dark:text-white">
            Home
          </Link>
          <span className="text-blue-900 dark:text-white">/</span>
          <span className="text-blue-900 dark:text-white">Partenaire</span>
        </div>
        <div className="flex flex-row gap-10 items-center">
          <div className="relative w-full">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                aria-hidden="true"
                className="w-4 h-4 text-blue-900 dark:text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </div>
            <input
              type="text"
              id="simple-search"
              value={search}
              onChange={(e) => searchFilter(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-1.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search..."
            />
          </div>
          <button
            data-modal-target="defaultModal"
            data-modal-toggle="defaultModal"
            className="relative w-40 inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-medium text-blue-900 rounded-lg group bg-gradient-to-br from-blue-300 to-blue-900 group-hover:from-blue-600 group-hover:to-blue-900 hover:text-white  focus:ring-4 focus:outline-none focus:ring-blue-900 "
            onClick={handleOpen}
          >
            <span className="relative w-full px-2 py-1 transition-all ease-in duration-75 bg-white  rounded-md group-hover:bg-opacity-0">
              <div className="flex w-full pl-2.5 flex-row items-center gap-1 ">
                <FiUserPlus />
                Ajouter
              </div>
            </span>
          </button>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-3 gap-6">
        {/* //////////////// */}
        {filterData
          .slice(0)
          .reverse()
          .map(
            ({
              _id,
              name,
              email,
              phonenumber,
              governorat,
              adresse,
              avatar,
            }) => {
              return (
                <div
                  key={_id}
                  className="flex flex-col rounded-md px-6 py-4   shadow-lg bg-gray-50 "
                >
                  <div className="avatar p-1 w-1/3 mx-auto flex  justify-center ">
                    <div className="w-full h-0 aspect-w-4 aspect-h-4">
                      <img
                        src={`http://localhost:5000/uploads/images/${avatar}`}
                        alt="user avatar"
                        className="h-20 w-auto"
                      />
                    </div>
                  </div>
                  <div className="partner-data w-fit h-32 flex flex-col items-start  gap-2 p-3 text-blue-900 ">
                    <div className="flex gap-4 w-fit font-semibold ">
                      <h2 className="font-bold">Nom du partenaire:</h2>
                      <h2 className=" ">{name}</h2>
                    </div>
                    <div className="flex gap-4 w-fit font-semibold">
                      <h2 className="font-bold">Adresse:</h2>
                      <h2 className=" ">
                        {adresse}, {governorat}
                      </h2>
                    </div>
                    <div className="flex gap-4 w-fit font-semibold">
                      <h2 className="font-bold">email :</h2>
                      <h2 className=" ">{email}</h2>
                    </div>
                  </div>
                  <div className="border-b w-full mb-3" />
                  <div className="flex flex-row  justify-evenly p-2  ">
                    <button
                      className="relative inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 "
                      onClick={() =>
                        updatePartners({
                          _id,
                          name,
                          email,
                          phonenumber,
                          governorat,
                          adresse,
                          avatar,
                        })
                      }
                    >
                      <span className="relative flex flex-row items-center gap-1.5 px-2 py-1 transition-all ease-in duration-75 bg-white rounded-md group-hover:bg-opacity-0">
                        <HiPencilAlt size={18} />
                        Modifier
                      </span>
                    </button>

                    <button
                      className="relative inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-pink-500 to-red-400 group-hover:from-pink-500 group-hover:to-red-400 hover:text-white focus:ring-4 focus:outline-none focus:ring-pink-200 "
                      onClick={() => DeletePartner(_id)}
                    >
                      <span className="relative flex flex-row items-center gap-1.5 px-2 py-1 transition-all ease-in duration-75 bg-white rounded-md group-hover:bg-opacity-0">
                        <RiDeleteBin5Line size={18} />
                        Supprimer
                      </span>
                    </button>
                  </div>
                </div>
              );
            }
          )}
      </div>

      {!addModal ? null : (
        <div className="mt-12">
          <div className="fixed  inset-0 hidden bg-black bg-opacity-30 backdrop-filter backdrop-blur-sm transition-opacity md:block" />
          <div
            className="relative user__modal z-20 
         rounded-lg flex flex-col  gap-10  shadow-2xl p-4"
          >
            {id ? (
              <h1
                className="text-3xl font-semibold flex justify-center items-center text-blue-700 dark:text-white 
      "
              >
                Modifier {name}
              </h1>
            ) : (
              <h1
                className="text-3xl font-bold flex justify-center items-center text-white 
        "
              >
                Ajouter un partenaire
              </h1>
            )}
            <form onSubmit={submitPartner}>
              <div className="">
                <div className="">
                  {previewUrl ? (
                    <div className=" relative w-40 h-hidden rounded-md shadow-inner mx-auto ">
                      <img
                        src={previewUrl}
                        alt="product_pic"
                        className="h-full w-full object-cover object-center rounded-md"
                      />
                      <label
                        htmlFor="pictureID"
                        className="absolute p-1 rounded-full bg-purple-50 border border-white -bottom-3 -left-3 text-gray-700 cursor-pointer"
                      >
                        <BiEdit size={20} />
                        <input
                          type="file"
                          name="picture"
                          id="pictureID"
                          className="hidden"
                          accept=".jpg,.png,.jpeg"
                          ref={filePickerRef}
                          onChange={pickedHandler}
                        />
                      </label>
                    </div>
                  ) : picture ? (
                    <div className=" relative w-40 h-hidden rounded-md shadow-inner mx-auto ">
                      <img
                        src={`${path}uploads/images/${picture}`}
                        alt="product_pic"
                        className="h-full w-full object-cover object-center rounded-md"
                      />
                      <label
                        htmlFor="pictureID"
                        className="absolute p-1 rounded-full bg-purple-50 border border-white -bottom-3 -left-3 text-gray-700 cursor-pointer"
                      >
                        <BiEdit size={20} />
                        <input
                          type="file"
                          name="picture"
                          id="pictureID"
                          className="hidden"
                          accept=".jpg,.png,.jpeg"
                          ref={filePickerRef}
                          onChange={pickedHandler}
                        />
                      </label>
                    </div>
                  ) : (
                    <div className="w-full flex justify-center items-center pb-6 ">
                      <label
                        htmlFor="pictureID"
                        className="mx-auto w-fit flex flex-col items-center justify-center rounded-lg border-2 border-gray-100 p-4 text-gray-100 cursor-pointer"
                      >
                        <FiUpload size={30} />
                        <input
                          type="file"
                          name="picture"
                          id="pictureID"
                          className="hidden"
                          accept=".jpg,.png,.jpeg"
                          ref={filePickerRef}
                          onChange={pickedHandler}
                        />
                        <span className="text-gray-100">Select a picture</span>
                      </label>
                    </div>
                  )}
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <InputField
                    type="text"
                    label="Nom du partenaire :"
                    name="name"
                    placeholder="Nom du partenaire"
                    value={name}
                    onChange={onchange}
                  />
                  <InputField
                    type="number"
                    label="Numéro de téléphone :"
                    value={phonenumber}
                    name="phonenumber"
                    placeholder="Numéro de téléphone "
                    onChange={onchange}
                  />
                  <InputField
                    type="text"
                    label="Adresse :"
                    value={adresse}
                    name="adresse"
                    placeholder="Adresse"
                    onChange={onchange}
                  />
                  <InputField
                    type="email"
                    label="Adresse E-mail :"
                    name="email"
                    value={email}
                    placeholder="Adresse E-mail "
                    onChange={onchange}
                  />
                </div>
              </div>
              <div className="w-full flex justify-evenly">
                <button
                  className="relative inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-medium text-blue-900 rounded-lg group bg-gradient-to-br from-blue-300 to-blue-900 group-hover:from-blue-600 group-hover:to-blue-900 hover:text-white  focus:ring-4 focus:outline-none focus:ring-blue-900 "
                  type="submit"
                >
                  <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white  rounded-md group-hover:bg-opacity-0">
                    <div className="flex flex-row items-center gap-1 text-lg">
                      <FiUserPlus size={24} />
                      Ajouter
                    </div>
                  </span>
                </button>

                <button
                  className="relative inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-medium text-blue-900 rounded-lg group bg-gradient-to-br from-blue-300 to-blue-900 group-hover:from-blue-600 group-hover:to-blue-900 hover:text-white  focus:ring-4 focus:outline-none focus:ring-blue-900 "
                  onClick={() => closeModel()}
                >
                  <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white  rounded-md group-hover:bg-opacity-0">
                    <div className="flex flex-row items-center gap-1 text-lg">
                      <GiCancel size={24} />
                      Annuler
                    </div>
                  </span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <Fragment>
        <Dialog
          size="lg"
          open={open}
          handler={closeModel}
          animate={{
            mount: { scale: 1, y: 0 },
            unmount: { scale: 0.9, y: -100 },
          }}
        >
          <DialogHeader>
            {id ? (
              <h1
                className="text-2xl font-semibold flex justify-center items-center text-blue-800 dark:text-white
      "
              >
                Modifier {name}
              </h1>
            ) : (
              <h1
                className="text-2xl font-semibold flex justify-center items-center text-blue-800 dark:text-white
      "
              >
                Ajouter un Partenaire
              </h1>
            )}
          </DialogHeader>
          <form onSubmit={submitPartner}>
            <DialogBody
              divider
              className="overflow-auto"
              style={{ maxHeight: "70vh" }}
            >
              <div className="">
                <div className="">
                  {previewUrl ? (
                    <div className=" relative w-40 h-hidden rounded-md shadow-inner mx-auto ">
                      <img
                        src={previewUrl}
                        alt="product_pic"
                        className="h-full w-full object-cover object-center rounded-md"
                      />
                      <label
                        htmlFor="pictureID"
                        className="absolute p-1 rounded-full bg-purple-50 border border-white -bottom-3 -left-3 text-gray-700 cursor-pointer"
                      >
                        <BiEdit size={20} />
                        <input
                          type="file"
                          name="picture"
                          id="pictureID"
                          className="hidden"
                          accept=".jpg,.png,.jpeg"
                          ref={filePickerRef}
                          onChange={pickedHandler}
                        />
                      </label>
                    </div>
                  ) : picture ? (
                    <div className=" relative w-40 h-hidden rounded-md shadow-inner mx-auto ">
                      <img
                        src={`${path}uploads/images/${picture}`}
                        alt="product_pic"
                        className="h-full w-full object-cover object-center rounded-md"
                      />
                      <label
                        htmlFor="pictureID"
                        className="absolute p-1 rounded-full bg-purple-50 border border-white -bottom-3 -left-3 text-gray-700 cursor-pointer"
                      >
                        <BiEdit size={20} />
                        <input
                          type="file"
                          name="picture"
                          id="pictureID"
                          className="hidden"
                          accept=".jpg,.png,.jpeg"
                          ref={filePickerRef}
                          onChange={pickedHandler}
                        />
                      </label>
                    </div>
                  ) : (
                    <div className="w-full flex justify-center items-center pb-6 ">
                      <label
                        htmlFor="pictureID"
                        className="mx-auto w-fit flex flex-col items-center justify-center rounded-lg border-2 border-gray-800 p-4 text-gray-800 cursor-pointer"
                      >
                        <FiUpload size={30} />
                        <input
                          type="file"
                          name="picture"
                          id="pictureID"
                          className="hidden"
                          accept=".jpg,.png,.jpeg"
                          ref={filePickerRef}
                          onChange={pickedHandler}
                        />
                        <span className="text-gray-800">Select a picture</span>
                      </label>
                    </div>
                  )}
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <InputField
                    type="text"
                    label="Nom du partenaire :"
                    name="name"
                    value={name}
                    placeholder="Nom du partenaire "
                    onChange={onchange}
                  />

                  <InputField
                    type="number"
                    label="Numéro de téléphone :"
                    value={phonenumber}
                    name="phonenumber"
                    placeholder="Numéro de téléphone "
                    onChange={onchange}
                  />
                  <InputField
                    type="text"
                    label="Adresse :"
                    value={adresse}
                    name="adresse"
                    placeholder="Adresse"
                    onChange={onchange}
                  />
                  <InputField
                    type="email"
                    label="Adresse E-mail :"
                    name="email"
                    value={email}
                    placeholder="Adresse E-mail "
                    onChange={onchange}
                  />

                  <div className="w-full flex flex-col">
                    <label className="block mb-2 text-sm font-medium text-gray-900">
                      Gouvernorat :
                    </label>
                    <select
                      name="governorat"
                      id=""
                      value={governorat}
                      className="block w-full p-2 text-gray-900 border border-gray-500 rounded-lg bg-gray-50 
                      sm:text-xs focus:ring-blue-500 focus:border-blue-500 focus:outline-none "
                      onChange={(e) => onchange(e)}
                    >
                      <option value="Bizerte">Bizerte</option>
                      <option value="Sousse">Sousse</option>
                      <option value="Ariana">Ariana</option>
                      <option value="Béja">Béja</option>
                    </select>
                  </div>
                </div>
              </div>
            </DialogBody>
            <DialogFooter>
              <Button
                variant="text"
                color="red"
                onClick={closeModel}
                className="mr-1"
              >
                <span>Annuler</span>
              </Button>
              <Button variant="gradient" color="blue" type="submit">
                <span>Confirmer</span>
              </Button>
            </DialogFooter>
          </form>
        </Dialog>
      </Fragment>
    </div>
  );
};
export default Partners;
