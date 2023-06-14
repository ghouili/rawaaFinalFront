import "./users.css";
import React, { useState, useEffect, useRef, Fragment } from "react";
import { Link, useNavigate } from "react-router-dom";
import swal from "sweetalert";
import axios from "axios";
import Cookies from "universal-cookie";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  avatar,
} from "@material-tailwind/react";

import { FiUserPlus, FiUpload } from "react-icons/fi";
import { GiCancel } from "react-icons/gi";
import { BsTrash3 } from "react-icons/bs";
import { AiOutlineEye } from "react-icons/ai";
import { BiEdit } from "react-icons/bi";
import { HiPencilAlt } from "react-icons/hi";

import Avatar from "../../Assets/Images/user.png";
import { path } from "../../utils/Variables";
import { InputField } from "../../components";

const Users = () => {
  const cookies = new Cookies();
  let navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [phonenumber, setPhoneNumber] = useState("");
  const [governorat, setGovernorat] = useState("Bizerte");
  const [picture, setPicture] = useState(null);
  const [date, setDate] = useState("");
  const [id, setId] = useState(null);
  const [data, setData] = useState([]);
  const [entreprise, setEntreprise] = useState("");
  const [achat, setAchat] = useState([]);

  const [filterData, setfilterData] = useState([]);
  const [masterData, setMasterData] = useState([]);
  const [search, setSearch] = useState("");

  const validate_form = () => {
    cookies.set("user", "rawaa");
    navigate("/");
  };

  const [addModal, setAddModal] = useState(false);
  const [detailsModal, setDetailsModal] = useState(false);

  //image related
  const [File, setFile] = useState();
  const [previewUrl, setPreviewUrl] = useState();
  const [isValid, setIsValid] = useState(false);
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(!open);

  const filePickerRef = useRef();
  let subtitle;

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

  /// fitering data using seaarch input ::
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

  // handelie uploading image:::
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

  const fetchUserAchat = async (id) => {
    const response = await fetch(`${path}achat/user/${id}`, {
      method: "GET",
    });
    const result = await response.json();
    console.log(result.success);
    if (result.success) {
      setAchat(result.data);
      setDetailsModal(!detailsModal);
    }
  };

  const fetchData = async () => {
    const response = await fetch(`${path}user`, {
      method: "GET",
    });

    const result = await response.json();
    if (result.success) {
      setMasterData(result.data);
      setfilterData(result.data);
    }
  };

  const fetchEntreprises = async () => {
    const response = await fetch(`${path}company`, {
      method: "GET",
    });

    const result = await response.json();
    if (result.success) {
      setData(result.data);
    }
  };

  useEffect(() => {
    fetchData();
    fetchEntreprises();
  }, []);

  const closeModel = () => {
    setEmail("");
    setDate("");
    setLastName("");
    setFirstName("");
    setPhoneNumber("");
    setGovernorat("Bizerte");
    setEntreprise("");
    setId(null);
    setAddModal(false);
    setPicture(null);
    setFile(null);
    setOpen(null);
    setPreviewUrl(null);
  };

  const updateUsers = (item) => {
    console.log(item);
    setEmail(item.email);
    setDate(item.date);
    setLastName(item.lastname);
    setFirstName(item.firstname);
    setPhoneNumber(item.phonenumber);
    setGovernorat(item.governorat);
    setOpen(!open);
    setId(item._id);
    setPicture(item.avatar);
    setEntreprise(item.id_entreprise);
  };

  const onchange = (e) => {
    if (e.target.name === "email") {
      setEmail(e.target.value);
    } else if (e.target.name === "prenom") {
      setFirstName(e.target.value);
    } else if (e.target.name === "nom") {
      setLastName(e.target.value);
    } else if (e.target.name === "phonenumber") {
      setPhoneNumber(e.target.value);
    } else if (e.target.name === "governorat") {
      setGovernorat(e.target.value);
    } else if (e.target.name === "date") {
      setDate(e.target.value);
    }
    console.log(e.target.value);
  };

  const submitUser = async (e) => {
    e.preventDefault();
    console.log(entreprise);

    const formData = new FormData();
    if (File) {
      formData.append("avatar", File);
    }
    formData.append("firstname", firstname);
    formData.append("lastname", lastname);
    formData.append("phonenumber", phonenumber);
    formData.append("email", email);
    formData.append("role", "user");
    formData.append("date", date);
    formData.append("governorat", governorat);
    formData.append("id_entrprise", entreprise);

    let url, meth;

    if (id) {
      url = `http://localhost:5000/user/update/${id}`;
      meth = "PUT";
    } else {
      url = `http://localhost:5000/user/ajout`;
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
      //   firstname,
      //   lastname,
      //   date,
      //   governorat,
      //   role: "user",
      //   id_entreprise: entreprise,
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

  const DeletUser = async (id) => {
    const willDelete = await swal({
      title: "Supprimer?",
      text: "Êtes-vous sûr de vouloir supprimer cet employé?",
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
        `http://localhost:5000/user/delete/${id}`
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
    <div className="w-full relative p-10 border">
      <div className="px-6 py-2 w-full flex flex-row bg-white dark:bg-blue-900 shadow items-center justify-between rounded-md border">
        <div className="flex flex-row gap-1 ">
          <Link to="/" className="font-semibold text-blue-900 dark:text-white">
            Home
          </Link>
          <span className="text-blue-900 dark:text-white">/</span>
          <span className="text-blue-900 dark:text-white">Utilisateur</span>
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
            className="relative w-48 inline-flex items-center justify-center p-0.5 overflow-hidden text-base font-medium text-blue-900 rounded-lg group bg-gradient-to-br from-blue-300 to-blue-900 group-hover:from-blue-600 group-hover:to-blue-900 hover:text-white  focus:ring-4 focus:outline-none focus:ring-blue-900 "
            onClick={handleOpen}
          >
            <span className="relative w-full px-2 py-1 transition-all ease-in duration-75 bg-white  rounded-md group-hover:bg-opacity-0">
              <div className="flex w-full pl-2.5 flex-row items-center gap-1.5 ">
                <FiUserPlus />
                Ajouter
              </div>
            </span>
          </button>
        </div>
      </div>
      <div className="mt-6 grid grid-cols-3 gap-10">
        {/* //////////////// */}
        {filterData
          .slice(0)
          .reverse()
          .map(
            ({
              _id,
              firstname,
              lastname,
              email,
              phonenumber,
              governorat,
              date,
              avatar,
              id_entreprise,
            }) => {
              return (
                <div
                  key={_id}
                  className="flex flex-col rounded-md p-3 h-72 shadow-lg bg-white dark:bg-blue-900 "
                >
                  <div className="avatar p-1 flex w-1/4 mx-auto  justify-center  ">
                    <div className="w-full h-0 aspect-w-4 aspect-h-5">
                      <img
                        src={`http://localhost:5000/uploads/images/${avatar}`}
                        alt="user avatar"
                        className="h-full w-full rounded "
                      />
                    </div>
                  </div>
                  <div className="user-data flex flex-col items-center  gap-2 p-3 text-blue-900 dark:text-white ">
                    <div className="flex gap-4 font-semibold ">
                      <h2 className="font-medium">Nom et prénom :</h2>
                      <h2 className=" ">
                        {firstname} {lastname}
                      </h2>
                    </div>
                    <div className="flex gap-4  font-semibold">
                      <h2 className="font-medium">Numéro de téléphone :</h2>
                      <h2 className=" "> {phonenumber} </h2>
                    </div>
                  </div>
                  <div className="w-full border-t mb-1" />
                  <div className="flex w-full flex-row justify-evenly items-center p-2  ">
                    <button
                      className="relative inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800"
                      onClick={() => fetchUserAchat(_id)}
                    >
                      <span className="relative flex gap-1 items-center px-2 py-1 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                        <AiOutlineEye />
                        Details
                      </span>
                    </button>

                    <button
                      className="relative inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800"
                      onClick={() =>
                        updateUsers({
                          _id,
                          firstname,
                          lastname,
                          email,
                          phonenumber,
                          governorat,
                          date,
                          avatar,
                          id_entreprise,
                        })
                      }
                    >
                      <span className="relative flex gap-1 items-center px-2 py-1 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                        <HiPencilAlt />
                        Modifier
                      </span>
                    </button>

                    {/*<button
                      type="button"
                      className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300  rounded text-sm px-2 py-1 text-center inline-flex items-center"
                      onClick={() =>
                        updateUsers({
                          _id,
                          firstname,
                          lastname,
                          email,
                          phonenumber,
                          governorat,
                          date,
                          avatar,
                          id_entreprise,
                        })
                      }
                    >
                      <div className="flex flex-row items-center ">
                        <HiPencilAlt />
                        Modifier
                      </div>
                    </button> */}
                    {/* <button
                      type="button"
                      className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300  rounded text-sm px-2 py-1 text-center inline-flex items-center  "
                      onClick={() => DeletUser(_id)}
                    >
                      <div className="flex flex-row items-center ">
                        <RiDeleteBin5Line />
                        Supprimer
                      </div>
                    </button> */}

                    {/* <button
                      type="button"
                      className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300  rounded text-sm px-2 py-1 text-center inline-flex items-center "
                    >
                      <div
                        className="flex flex-row items-center gap-1 "
                        onClick={() => setDetailsModal(!detailsModal)}
                      >
                        <AiOutlineRightSquare />
                        Détails
                        </div>
                      </button> */}

                    <button
                      className="relative inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-pink-500 to-red-400 group-hover:from-pink-500 group-hover:to-red-400 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800"
                      onClick={() => DeletUser(_id)}
                    >
                      <span className="relative flex gap-1 items-center px-2 py-1 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                        <BsTrash3 />
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
          <div className="fixed inset-0 hidden bg-black bg-opacity-30 backdrop-filter backdrop-blur-sm transition-opacity md:block" />
          <div
            className="relative user__modal z-20 
         rounded-lg flex flex-col  gap-10  shadow-2xl p-4"
          >
            {id ? (
              <h1
                className="text-3xl font-semibold flex justify-center items-center text-blue-700 dark:text-white 
      "
              >
                Modifier {firstname} {lastname}
              </h1>
            ) : (
              <h1
                className="text-3xl font-semibold flex justify-center items-center text-blue-700 dark:text-white 
      "
              >
                Ajouter un employé
              </h1>
            )}
            <form onSubmit={submitUser}>
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
                    label="Prénom :"
                    name="prenom"
                    placeholder="Prénom"
                    value={firstname}
                    onChange={onchange}
                  />
                  <InputField
                    type="text"
                    label="Nom de famille :"
                    name="nom"
                    placeholder="Nom de famille "
                    value={lastname}
                    onChange={onchange}
                  />
                  {/* <div className="w-full flex flex-col">
                    <label className="text-white font-semibold text-xl px-2 py-4 ">
                      Prénom :
                    </label>
                    <input
                      type="text"
                      placeholder="Prénom "
                      name="prenom"
                      value={firstname}
                      required
                      className="text-lg rounded-md h-14 w-full bg-gray-100 border-gray-100 text-blue-900 px-2"
                      onChange={(e) => onchange(e)}
                    />
                  </div>
                  <div className="w-full flex flex-col">
                    <label className="text-white font-semibold text-xl px-2 py-4 ">
                      Nom de famille :
                    </label>
                    <input
                      type="text"
                      placeholder="Nom de famille "
                      name="nom"
                      value={lastname}
                      required
                      className="text-lg rounded-md h-14 w-full bg-gray-100 border-gray-100 text-blue-900 px-2"
                      onChange={(e) => onchange(e)}
                    />
                  </div>
                  <div className="w-full flex flex-col">
                    <label className="text-white font-semibold text-xl px-2 py-4 ">
                      Numéro de téléphone :
                    </label>
                    <input
                      type="number"
                      placeholder="Numéro de téléphone "
                      name="phonenumber"
                      value={phonenumber}
                      required
                      className="text-lg rounded-md h-14 w-full bg-gray-100 border-gray-100 text-blue-900 px-2"
                      onChange={(e) => onchange(e)}
                    />
                  </div>
                  <div className="w-full flex flex-col">
                    <label className="text-white font-semibold text-xl px-2 py-4 ">
                      Adresse E-mail :
                    </label>
                    <input
                      type="email"
                      placeholder="Adresse E-mail"
                      name="email"
                      value={email}
                      required
                      className="text-lg rounded-md h-14 w-full bg-gray-100 border-gray-100 text-blue-900 px-2"
                      onChange={(e) => onchange(e)}
                    />
                  </div> */}

                  <div className="w-full flex flex-col">
                    <label className="text-white font-semibold text-xl px-2 py-4 ">
                      Date de naissance :
                    </label>
                    <input
                      type="date"
                      name="date"
                      value={date}
                      placeholder="Date of birth "
                      required
                      className="text-lg rounded-md h-14 w-full bg-gray-100 border-gray-100 text-blue-900 px-2"
                      onChange={(e) => onchange(e)}
                    />
                  </div>
                  <div className="w-full flex flex-col">
                    <label className="text-white font-semibold text-xl px-2 py-4 ">
                      Gouvernorat :
                    </label>
                    <select
                      name="governorat"
                      id=""
                      value={governorat}
                      className="text-lg rounded-md h-14 w-full bg-gray-100 border-gray-100 text-blue-900 px-2"
                      onChange={(e) => onchange(e)}
                    >
                      <option value="Bizerte">Bizerte</option>
                      <option value="Sousse">Sousse</option>
                      <option value="Ariana">Ariana</option>
                      <option value="Béja">Béja</option>
                    </select>
                  </div>

                  <div className="w-full flex flex-col">
                    <label
                      htmlFor="id"
                      className="text-white font-semibold text-xl px-2 py-4 "
                    >
                      Entreprise :
                    </label>
                    <select
                      name="id_entreprise"
                      id="id"
                      defaultValue={entreprise}
                      value={entreprise}
                      className="text-lg rounded-md h-14 w-full bg-gray-100 border-gray-100 text-blue-900 px-2"
                      onChange={(e) => setEntreprise(e.target.value)}
                    >
                      <option value="">Sélectionner une entreprise</option>
                      {data.map(({ _id, name }) => {
                        // if (nom === 'rawaa') { return; }
                        return (
                          <option key={_id} value={_id}>
                            {name}
                          </option>
                        );
                      })}
                    </select>
                  </div>
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
      {!detailsModal ? null : (
        <div className="mt-12">
          <div className="fixed inset-0 hidden bg-black bg-opacity-30 backdrop-filter backdrop-blur-sm transition-opacity md:block" />
          <div
            className="relative user__modal z-20 rounded-lg flex flex-col gap-10 shadow-2xl p-4 overflow-y-auto"
            style={{ maxHeight: "70vh" }}
          >
            <div className="flex items-center ">
              <img
                src={Avatar}
                alt="avatar"
                className="w-24 rounded-full mr-4"
              />
              <div>
                <h1 className="font-semibold text-blue-900">
                  Nom et prénom : Rawaa khelil
                </h1>
                <h1 className="font-semibold text-blue-900">
                  Numéro de téléphone : 54737258
                </h1>
              </div>
            </div>
            <div className="w-full">
              <table className="table-fixed w-full ">
                <thead className="">
                  <tr className="border-b-4 h-11 text-blue-900">
                    <th>Partenaire</th>
                    <th>Date</th>
                    <th>Prix</th>
                  </tr>
                </thead>
                <tbody>
                  {achat
                    .slice(0)
                    .reverse()
                    .map(({ date, montant, partner_id }, idx) => (
                      <tr className="h-11 border-b-4 text-blue-900  ">
                        <td className="mt-4"> {partner_id?.name}</td>
                        <td>{date}</td>
                        <td>{montant} Dt</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
            <div className="inline-flex rounded-lg shadow-sm justify-center items-center border-3 border-red-500 ">
              <button
                type="button"
                onClick={() => setDetailsModal(false)}
                className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 "
              >
                Fermer
              </button>
            </div>
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
                Modifier {firstname} {lastname}
              </h1>
            ) : (
              <h1
                className="text-2xl font-semibold flex justify-center items-center text-blue-800 dark:text-white
      "
              >
                Ajouter un employé
              </h1>
            )}
          </DialogHeader>
          <form onSubmit={submitUser}>
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
                    label="Prénom :"
                    name="prenom"
                    placeholder="Prénom"
                    value={firstname}
                    onChange={onchange}
                  />
                  <InputField
                    type="text"
                    label="Nom de famille :"
                    name="nom"
                    placeholder="Nom de famille "
                    value={lastname}
                    onChange={onchange}
                  />

                  <InputField
                    type="number"
                    label="Numéro de téléphone :"
                    name="phonenumber"
                    placeholder="Numéro de téléphone "
                    value={phonenumber}
                    onChange={onchange}
                  />
                  <InputField
                    type="email"
                    label="Adresse E-mail :"
                    name="email"
                    placeholder="Adresse E-mail "
                    value={email}
                    onChange={onchange}
                  />
                  <InputField
                    type="date"
                    label="Date de naissance :"
                    name="date"
                    placeholder="Date de naissance "
                    value={date}
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

                  <div className="w-full flex flex-col">
                    <label
                      htmlFor="id"
                      className="block mb-2 text-sm font-medium text-gray-900"
                    >
                      Entreprise :
                    </label>
                    <select
                      name="id_entreprise"
                      id="id"
                      defaultValue={entreprise}
                      value={entreprise}
                      className="block w-full p-2 text-gray-900 border border-gray-500 rounded-lg bg-gray-50 
                      sm:text-xs focus:ring-blue-500 focus:border-blue-500 focus:outline-none "
                      onChange={(e) => setEntreprise(e.target.value)}
                    >
                      <option value="">Sélectionner une entreprise</option>
                      {data.map(({ _id, name }) => {
                        // if (nom === 'rawaa') { return; }
                        return (
                          <option key={_id} value={_id}>
                            {name}
                          </option>
                        );
                      })}
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

export default Users;
