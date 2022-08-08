import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoCloseCircleSharp, IoWallet, IoExitOutline } from "react-icons/io5";
import {
  ConnectMetamask,
  ConnectWeb3Wallet,
  DisconnectWallet,
} from "../Services";
import tippy from "tippy.js";
import "tippy.js/dist/tippy.css";
import { store } from "../Redux/store";
import { spliceString } from "../Helpers/utils";
import { GetBUSDBalanceHelper } from "../Helpers/BUSDToken";
import { connect, useDispatch } from "react-redux";
import { UpdateConnectLoading, UpdateWalletBalance } from "../Redux/Action";
import { GiExitDoor, GiHamburgerMenu } from "react-icons/gi";
const mapStateToProps = (state) => ({
  address: state.ConnectWallet.address,
  _isConnectModalOpen: state.Modal.isConnectModalOpen,
});
function Header(props) {
  let navigate = useNavigate();
  const [isConnetModalOpen, setisConnetModalOpen] = useState(
    props._isConnectModalOpen
  );

  useEffect(() => {
    tippy("#exitdoor", {
      content: "Logout",
    });
  }, []);
  useEffect(() => {
    setisConnetModalOpen(props._isConnectModalOpen);
  }, [props._isConnectModalOpen]);

  const [isConnect, setisConnect] = useState(false);
  const [isBurger, setisBurger] = useState(false);
  const dispatch = useDispatch();
  // For Close Connect Modal
  function handleCloseConnectModal() {
    setisConnetModalOpen(false);
  }
  // For Open Connect Modal
  function handleOpenConnectModal() {
    setisConnetModalOpen(true);
  }

  function handleWalletDisconnect() {
    setisConnect(false);
    DisconnectWallet();
    store.getState().ConnectWallet.address = "";
    store.getState().ConnectWallet.isConnect = false;
  }
  function handleBurger() {
    setisBurger(!isBurger);
  }

  return (
    <>
      {" "}
      <div className="z-[1000] px-[40px] py-[20px] flex justify-between items-center shadow-sm top-0 bg-[#000] sticky">
        <div className="flex gap-2 items-center">
          <img
            src={process.env.PUBLIC_URL + "/assets/logo.svg"}
            className="rounded"
            width="180px"
            alt=""
          ></img>
          {/* <div className="my-[16px] tracking-tight  text-2xl  font-bold">
            VAULTY
          </div> */}
        </div>
        <div className="hidden md:flex text-[#060b27] font-semibold">
          {/* <Link
            to="/dashboard"
            className="hover:bg-[#f0f7ff] rounded-lg cursor-pointer transition duration-250 ease-out hover:ease-in"
          >
            <div className="px-[16px] py-[8px] ">Dashboard</div>
          </Link> */}
          {/* <Link
            to="/create"
            className="hover:bg-[#f0f7ff] rounded-lg cursor-pointer transition duration-250 ease-out hover:ease-in"
          >
            <div className="px-[16px] py-[8px]">Create</div>
          </Link> */}
        </div>

        {/* //Connect Wallet and Address  */}
        {isConnect && (
          <div className="group ">
            <div className="hidden md:flex  gap-3 px-[16px] py-[8px] bg-[#ffce33] rounded-md text-black cursor-pointer ease-in duration-300  hover:shadow-xl hover:shadow-[#060b27]/20">
              <span>
                <IoWallet size={20} />
              </span>{" "}
              <span>
                {spliceString(
                  store.getState().ConnectWallet.address
                ).toUpperCase()}
              </span>
            </div>
            <ul class="absolute hidden text-gray-700 pt-1  group-hover:block shadow-xl bg-[#fff] shadow-[#060b27]/20 rounded-md hover: ">
              <li
                class=" flex text-black gap-3 px-[16px] py-[8px] cursor-pointer hover:bg-[#f7f9fc] rounded-md"
                onClick={handleWalletDisconnect}
              >
                <span>
                  <IoExitOutline size={20} />
                </span>
                <span>Disconnect Wallet</span>
              </li>
              <li
                class=" flex text-black gap-3 px-[16px] py-[8px] cursor-pointer hover:bg-[#f7f9fc] rounded-md"
                onClick={() => {
                  localStorage.setItem(
                    "login",
                    JSON.stringify({ value: false })
                  );
                  handleWalletDisconnect();
                  navigate("/auth", { replace: true });
                }}
              >
                <span>
                  <IoExitOutline size={20} />
                </span>
                <span>Logout</span>
              </li>
            </ul>
          </div>
        )}
        {!isConnect && (
          <div className="flex items-center gap-5">
            <div
              onClick={handleOpenConnectModal}
              className="hidden md:block px-[16px] py-[8px] bg-[#FFCE33] rounded-md text-black cursor-pointer ease-in duration-300  hover:shadow-xl hover:shadow-[#060b27]/20"
            >
              Connect Wallet
            </div>
            <div
              id="exitdoor"
              onClick={() => {
                localStorage.setItem("login", JSON.stringify({ value: false }));
                localStorage.removeItem("WalletConnect");
                navigate("/auth", { replace: true });
              }}
              className="cursor-pointer inline-block"
            >
              <GiExitDoor size={28} color="white" />
            </div>
          </div>
        )}
        <div className="block md:hidden inline-block" onClick={handleBurger}>
          <GiHamburgerMenu size={30} color="#fff" />
        </div>
      </div>{" "}
      {/* Wallect Connect option */}
      {isConnetModalOpen && (
        <div className="fixed overflow-hidden top-0 z-[1000] h-full w-full">
          <div className="flex justify-center flex-col h-full items-center bg-[#00000052]    ">
            <div className=" rounded-lg  max-h-[500px] max-w-[500px] w-full  ">
              <div
                className="mb-[20px] cursor-pointer"
                onClick={handleCloseConnectModal}
              >
                <IoCloseCircleSharp
                  size={40}
                  color={"#060b27"}
                  className="ml-auto hover:opacity-90"
                />
              </div>
              <div className="shadow-xl shadow-[#060b27]/20">
                {" "}
                <div className="rounded-tl-lg rounded-tr-lg  py-[25px] bg-[#FFCE33]">
                  <h3 className=" text-black text-2xl m-0">Connect Wallet</h3>
                </div>
                <div className="">
                  <div className=" flex flex-col gap-5 font-semibold text-xl  bg-[#fff] p-[16px] pb-[32px]  rounded-lg">
                    <div
                      onClick={async () => {
                        UpdateConnectLoading(true);
                        await ConnectMetamask().then((res) => {
                          setisConnect(res);
                          handleCloseConnectModal();
                        });
                      }}
                      className="  flex p-3 items-center border border-[#e8ecf4] cursor-pointer hover:shadow-xl hover:shadow-[#060b27]/10 rounded ease-out duration-300"
                    >
                      <span>
                        <img
                          src={process.env.PUBLIC_URL + "/assets/metamask.svg"}
                          alt="metamask"
                          width="32px"
                        ></img>
                      </span>
                      <span className="ml-3">Metamask</span>
                    </div>
                    {/* <div
                      onClick={() => {
                        UpdateConnectLoading(true);
                        ConnectWeb3Wallet().then(async () => {
                          setisConnect(true);
                          console.log(store.getState().ConnectWallet);
                          handleCloseConnectModal();
                        });
                      }}
                      className="flex p-3 items-center border border-[#e8ecf4] cursor-pointer hover:shadow-xl hover:shadow-[#060b27]/10 rounded ease-out duration-300"
                    >
                      <span>
                        <img
                          src={
                            process.env.PUBLIC_URL + "/assets/walletconnect.png"
                          }
                          alt="wallet_Connect"
                          width="32px"
                        ></img>
                      </span>
                      <span className="ml-3">Wallet Connect</span>
                    </div> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Mobile View */}
      {isBurger && (
        <div className="fixed z-[10000] bg-white py-[10px] w-full">
          <div className="flex flex-col items-center w-full  drop-shadow-xl">
            {/* <Link
              to="/dashboard"
              onClick={() => setisBurger(false)}
              className="hover:bg-[#f0f7ff] w-full border-b-2 rounded-lg cursor-pointer transition duration-250 ease-out hover:ease-in"
            >
              <div className="px-[16px] py-[16px] ">Dashboard</div>
            </Link> */}
            {/* <Link
              to="/create"
              onClick={() => setisBurger(false)}
              className="hover:bg-[#f0f7ff] w-full border-b-2 rounded-lg cursor-pointer transition duration-250 ease-out hover:ease-in"
            >
              <div className="px-[16px] py-[16px]">Create</div>
            </Link> */}
            <div className="hover:bg-[#f0f7ff] w-full border-b-2 rounded-lg cursor-pointer transition duration-250 ease-out hover:ease-in">
              {!isConnect && (
                <div
                  onClick={() => {
                    setisBurger(false);
                    handleOpenConnectModal();
                  }}
                  className="  px-[16px] py-[8px] bg-[#FFCE33] rounded-md text-white cursor-pointer ease-in duration-300  hover:shadow-xl hover:shadow-[#060b27]/20"
                >
                  Connect Wallet
                </div>
              )}
            </div>
            <div className="hover:bg-[#f0f7ff] w-full border-b-2 rounded-lg cursor-pointer transition duration-250 ease-out hover:ease-in">
              {" "}
              {isConnect && (
                <div className="group ">
                  <div className="   flex gap-3 px-[16px] py-[8px] bg-[#ffce33] rounded-md text-white cursor-pointer ease-in duration-300  hover:shadow-xl hover:shadow-[#060b27]/20">
                    <span>
                      <IoWallet size={20} />
                    </span>{" "}
                    <span>
                      {spliceString(
                        store.getState().ConnectWallet.address
                      ).toUpperCase()}
                    </span>
                  </div>
                  <ul class="absolute hidden text-gray-700 pt-1  group-hover:block shadow-xl bg-[#fff] shadow-[#060b27]/20 rounded-md hover: ">
                    <li
                      class=" flex text-black gap-3 px-[16px] py-[8px] cursor-pointer hover:bg-[#f7f9fc] rounded-md"
                      onClick={handleWalletDisconnect}
                    >
                      <span>
                        <IoExitOutline size={20} />
                      </span>
                      <span>Disconnect Wallet</span>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default connect(mapStateToProps, null)(Header);
