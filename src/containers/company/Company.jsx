import "./company.css";
import React, { useState, useEffect, useRef, Fragment } from "react";
import { RiDeleteBin5Line, RiLockPasswordFill } from "react-icons/ri";
import { FiUserPlus, FiUsers, FiUpload } from "react-icons/fi";
import { GiCancel } from "react-icons/gi";
import { BiEdit } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import swal from "sweetalert";
import axios from "axios";
import Avatar from "../../Assets/Images/user.png";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";

import { path } from "../../utils/Variables";
import { InputField } from "../../components";

const Company = () => {
  const cookies = new Cookies();
  let navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phonenumber, setPhoneNumber] = useState("");
  const [governorat, setGovernorat] = useState("Bizerte");
  const [adresse, setAdresse] = useState("");
  const [picture, setPicture] = useState(null);
  const [id, setId] = useState(null);
  const [data, setData] = useState([]);
  const [company, setCompany] = useState({});

  const [filterData, setfilterData] = useState([]);
  const [masterData, setMasterData] = useState([]);
  const [search, setSearch] = useState("");

  const [File, setFile] = useState();
  const [previewUrl, setPreviewUrl] = useState();
  const [isValid, setIsValid] = useState(false);
  const [open, setOpen] = useState(false);
  const [openP, setOpenP] = useState(false);

  const handleOpen = () => setOpen(!open);
  const handleOpenP = () => setOpenP(!openP);

  const filePickerRef = useRef();
  let subtitle;

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

  const validate_form = () => {
    cookies.set("user", "rawaa");
    navigate("/company");
  };

  const [addModal, setAddModal] = useState(false);

  const closeModel = () => {
    setEmail("");
    setFile("");
    setName("");
    setPhoneNumber("");
    setGovernorat("Bizerte");
    setAdresse("");
    setAddModal(false);
    setOpen(null);
    setId(null);
  };

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

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const response = await fetch(`${path}company`, {
      method: "GET",
    });

    const result = await response.json();
    if (result.success) {
      setMasterData(result.data);
      setfilterData(result.data);
    }
  };

  const fetchProfileData = async (id) => {
    const response = await fetch(`${path}company/profile/${id}`, {
      method: "GET",
    });

    const result = await response.json();
    if (result.success) {
      setCompany(result.companyData);
      setData(result.userData);
      handleOpenP();
    }
  };

  const submitCompany = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    if (File) {
      formData.append("avatar", File);
    }
    formData.append("name", name);
    formData.append("phonenumber", phonenumber);
    formData.append("email", email);
    formData.append("governorat", governorat);
    formData.append("adresse", adresse);

    let url, meth;

    if (id) {
      url = `http://localhost:5000/company/update/${id}`;
      meth = "PUT";
    } else {
      url = `http://localhost:5000/company/ajout`;
      meth = "POST";
    }
    const response = await fetch(`http://localhost:5000/company/ajout`, {
      method: "POST",
      // headers: {
      //   "Content-Type": "application/json",
      // },
      body: formData,

      // body: JSON.stringify({
      //   email,
      //   phonenumber,
      //   name,
      //   adresse,
      //   governorat,
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

  const DeleteCompany = async (id) => {
    const willDelete = await swal({
      title: "Supprimer?",
      text: "Êtes-vous sûr de vouloir supprimer cette amicale?",
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
        `http://localhost:5000/company/delete/${id}`
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
          <span className="text-blue-900 dark:text-white">Amicales</span>
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
              codesecret,
            }) => {
              return (
                <div
                  key={_id}
                  className="flex flex-col rounded-md px-6 py-4  shadow-lg bg-gray-50 "
                >
                  <div className="avatar w-1/3 mx-auto flex  justify-center ">
                    <div className="w-full h-0 aspect-w-4 aspect-h-4">
                      <img
                        src={`http://localhost:5000/uploads/images/${avatar}`}
                        alt="partner avatar"
                        className="h-full w-full"
                      />
                    </div>
                  </div>
                  <div className="partner-data h-32 w-fit flex flex-col items-start gap-2 p-3 text-blue-900 ">
                    <div className="flex gap-4 font-semibold ">
                      <h2 className="font-bold">Nom de l'entreprise:</h2>
                      <h2 className=" ">{name}</h2>
                    </div>
                    <div className="flex gap-4  font-semibold">
                      <h2 className="font-bold">Adresse:</h2>
                      <h2 className=" ">
                        {" "}
                        {governorat} ,{adresse}{" "}
                      </h2>
                    </div>
                    <div className="flex gap-4  font-semibold">
                      <h2 className="font-bold">Adresse e-mail :</h2>
                      <h2 className=" ">{email} </h2>
                    </div>
                    {/* <div className="flex gap-4  font-semibold">
                      <h2 className="font-bold">code secret :</h2>
                      <h2 className=" ">{codesecret} </h2>
                    </div> */}
                  </div>
                  <div className="border-b w-full mb-1" />
                  <div className="flex flex-row justify-evenly p-2  ">
                    <button
                      className="relative inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 "
                      onClick={() => fetchProfileData(_id)}
                    >
                      <span className="relative flex flex-row items-center gap-1.5 px-2 py-1 transition-all ease-in duration-75 bg-white rounded-md group-hover:bg-opacity-0">
                        <FiUsers size={18} />
                        Profiles
                      </span>
                    </button>

                    <button
                      className="relative inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-pink-500 to-red-400 group-hover:from-pink-500 group-hover:to-red-400 hover:text-white focus:ring-4 focus:outline-none focus:ring-pink-200 "
                      onClick={() => DeleteCompany(_id)}
                    >
                      <span className="relative flex flex-row items-center gap-1.5 px-2 py-1 transition-all ease-in duration-75 bg-white rounded-md group-hover:bg-opacity-0">
                        <RiDeleteBin5Line size={18} />
                        Supprimer
                      </span>
                    </button>

                    {/* <button
                      type="button"
                      className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center mr-2 "
                      onClick={() => DeleteCompany(_id)}
                    >
                      <div className="flex flex-row items-center text-lg">
                        <RiDeleteBin5Line size={24} />
                        Supprimer
                      </div>
                    </button>
                    <button
                      type="button"
                      className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center mr-2 "
                    >
                      <div className="flex flex-row items-center text-lg ">
                        <RiLockPasswordFill size={24} />
                        Code secret
                      </div>
              </button>*/}
                  </div>
                </div>
              );
            }
          )}
      </div>
      {!addModal ? null : (
        <div className="mt-12">
          <div className="company__modal z-10 rounded-lg flex flex-col  gap-10  shadow-2xl p-4">
            <div className="fixed -z-10 inset-0 hidden bg-black bg-opacity-30 backdrop-filter backdrop-blur-sm transition-opacity md:block" />
            <h1
              className="text-3xl font-bold flex justify-center items-center text-white  border-2
        "
            >
              Ajouter une Entreprise
            </h1>
            <form onSubmit={submitCompany}>
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
                    label="Nom de l'entreprise:"
                    name="name"
                    placeholder="Nom de l'entreprise "
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
                  {/* <div className="w-full flex flex-col">
                  <label className="text-white font-semibold text-xl px-2 py-4 ">
                    Gouvernorat :
                  </label>
                  <select
                    name="governorat"
                    id=""
                    className="text-lg rounded-md h-14 w-full bg-gray-100 border-gray-100 text-blue-900 px-2"
                    onChange={(e) => onchange(e)}
                  >
                    <option value="Bizerte">Bizerte</option>
                    <option value="Sousse">Sousse</option>
                    <option value="Ariana">Ariana</option>
                    <option value="Béja">Béja</option>
                    <option value="Ben arous">Ben arous</option>
                    <option value="Gabés">Gabés</option>
                    <option value="Gafsa">Gafsa</option>
                    <option value="Jendouba">Jendouba</option>
                    <option value="Kairouan">Kairouan</option>
                    <option value="Kasserine">Kasserine</option>
                    <option value="Kébili">Kébili</option>
                    <option value="le kef">Le kef</option>
                    <option value="la manouba">La manouba</option>
                    <option value="Mahdia">Mahdia</option>
                    <option value="Monastir">Monastir</option>
                    <option value="Médenine">Médnine</option>
                    <option value="Nabeul">Nabeul</option>
                    <option value="Sfax">Sfax</option>
                    <option value="Sidi bouzid">Sidi bouzid</option>
                    <option value="Seliana">Seliana</option>
                    <option value="Tozeur">Tozeur</option>
                    <option value="Tataouine">Tataouine</option>
                    <option value="Tunis">Tunis</option>
                    <option value="Zaghouan">Zaghouan</option>
                  </select>
                </div> */}
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
            <h1
              className="text-2xl font-semibold flex justify-center items-center text-blue-800 dark:text-white
      "
            >
              Ajouter une entreprise
            </h1>
          </DialogHeader>
          <form onSubmit={submitCompany}>
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
                    label="Nom de l'entreprise :"
                    name="name"
                    value={name}
                    placeholder="Nom de l'entreprise "
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

      <Fragment>
        <Dialog
          size="lg"
          open={openP}
          handler={handleOpenP}
          animate={{
            mount: { scale: 1, y: 0 },
            unmount: { scale: 0.9, y: -100 },
          }}
        >
          <DialogHeader>
            <h1
              className="text-2xl font-semibold flex justify-center items-center text-blue-800 dark:text-white
"
            >
              {company?.name}
            </h1>
          </DialogHeader>
          <DialogBody
            divider
            className="overflow-auto"
            style={{ maxHeight: "70vh" }}
          >
            <div className="flex w-full flex-row justify-between rounded-md px-6 py-4 ">
              <div className="avatar w-1/5 mx-auto flex  justify-center ">
                <div className="w-full h-0 aspect-w-4 aspect-h-4">
                  <img
                    src={`http://localhost:5000/uploads/images/${company?.avatar}`}
                    alt="partner avatar"
                    className="h-full w-full"
                  />
                </div>
              </div>
              <div className="partner-data w-3/5 flex flex-col items-start gap-2 p-3 text-blue-900 ">
                <div className="flex gap-4 font-semibold ">
                  <h2 className="font-bold">Nom de l'entreprise:</h2>
                  <h2 className=" ">{company?.name}</h2>
                </div>
                <div className="flex gap-4  font-semibold">
                  <h2 className="font-bold">Adresse:</h2>
                  <h2 className=" ">
                    {" "}
                    {company?.governorat} ,{company?.adresse}{" "}
                  </h2>
                </div>
                <div className="flex gap-4  font-semibold">
                  <h2 className="font-bold">Adresse e-mail :</h2>
                  <h2 className=" ">{company?.email} </h2>
                </div>
              </div>
            </div>
            <div className="border w-full mb-1" />
            <div className="grid grid-cols-3 gap-4">
              {data
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
                  }) => (
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
                    </div>
                  )
                )}
            </div>
          </DialogBody>
          <DialogFooter>
            <Button
              variant="text"
              color="red"
              onClick={handleOpenP}
              className="mr-1"
            >
              <span>Annuler</span>
            </Button>
          </DialogFooter>
        </Dialog>
      </Fragment>
    </div>
  );
};

export default Company;
