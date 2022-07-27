import React, { useEffect, useState } from "react";
import { GiReceiveMoney, GiTakeMyMoney } from "react-icons/gi";
import { IoMdPricetag, IoIosArrowDown } from "react-icons/io";
import { useParams } from "react-router-dom";
import AdminCard from "../Components/AdminFunction/AdminCard";
import "antd/dist/antd.css";
import {
  ICOHelperContract,
  ICOHelperUpdateSocialMedia,
} from "../Helpers/ICOHelper";
import { store } from "../Redux/store";
import { connect } from "react-redux";
import Swal from "sweetalert2";
import { UpdateConnectLoading, UpdateConnectModal } from "../Redux/Action";
import { DivideBy18 } from "../Helpers/utils";

import moment from "moment";
import Loading from "../Components/Loading/Loading";
import AdminCardList from "../Components/AdminFunction/AdminCardList";
import { Button, Form, Input } from "antd";
import TextArea from "antd/lib/input/TextArea";
import { ICOContractaddress } from "../Config/Contract/Contract";

const mapStateToProps = (state) => ({
  isConnect: state.ConnectWallet.isConnect,
  isLoadingEnable: state.UtilsReducers.isLoadingEnable,
  walletAddress: state.ConnectWallet.address,
});
function IDOPage(props) {
  const address = ICOContractaddress;
  const [ICOContract, setICOContract] = useState(null);
  const [owner, setOwner] = useState();

  const [ICOData, setICOData] = useState({
    PresaleRate: 0,
    startTime: 0,
    endTime: 0,
    rasiedAmount: 0,
    isSaleEnded: false,
    vestingCounter: 0,
    lokingPeriodTime: 0,
    aMonth: 0,
  });
  console.log(props);
  useEffect(async () => {
    if (props.isConnect) {
      console.log(address);

      let ICOcontract = await ICOHelperContract(address);
      let ICOcontractOwner = await ICOHelperContract(ICOContractaddress);
      let owner = await ICOcontractOwner.methods.owner().call();

      setOwner(owner);
      console.log(ICOcontract);
      setICOContract(ICOcontract);
      UpdateConnectLoading(true);
      // Get Basic Detils of IDO
      ICOcontract.methods
        .getTokenomics()
        .call()
        .then((result) => {
          UpdateConnectLoading(false);
          setICOData((value) => ({
            ...value,
            PresaleRate: result[0],
            startTime: result[3],
            endTime: parseInt(result[4]),
          }));
        });
      ICOcontract.methods
        .vestingCounter()
        .call()
        .then((result) => {
          UpdateConnectLoading(false);
          setICOData((value) => ({
            ...value,
            vestingCounter: parseInt(result),
          }));
        });
      ICOcontract.methods
        .lokingPeriodTime()
        .call()
        .then((result) => {
          UpdateConnectLoading(false);
          setICOData((value) => ({
            ...value,
            lokingPeriodTime: parseInt(result),
          }));
        });
      ICOcontract.methods
        .aMonth()
        .call()
        .then((result) => {
          UpdateConnectLoading(false);
          setICOData((value) => ({
            ...value,
            aMonth: parseInt(result),
          }));
        });
      ICOcontract.methods
        .isIcoOver()
        .call()
        .then((result) =>
          setICOData((value) => ({
            ...value,
            isSaleEnded: result,
          }))
        );
    } else {
      UpdateConnectLoading(false);
    }
  }, [store.getState().ConnectWallet.isConnect, props.walletAddress]);

  async function IDOUpadter() {
    await ICOContract.methods
      .getTokenomics()
      .call()
      .then((result) => {
        UpdateConnectLoading(false);
        setICOData((value) => ({
          ...value,
          PresaleRate: result[0],
          startTime: result[3],
          endTime: result[4],
        }));
      });

    await ICOContract.methods
      .getTokenomics()
      .call()
      .then((result) => {
        UpdateConnectLoading(false);
        setICOData((value) => ({
          ...value,
          PresaleRate: result[0],
          startTime: result[3],
          endTime: parseInt(result[4]),
        }));
      });
    await ICOContract.methods
      .vestingCounter()
      .call()
      .then((result) => {
        UpdateConnectLoading(false);
        setICOData((value) => ({
          ...value,
          vestingCounter: parseInt(result),
        }));
      });
    await ICOContract.methods
      .lokingPeriodTime()
      .call()
      .then((result) => {
        UpdateConnectLoading(false);
        setICOData((value) => ({
          ...value,
          lokingPeriodTime: parseInt(result),
        }));
      });
    await ICOContract.methods
      .aMonth()
      .call()
      .then((result) => {
        UpdateConnectLoading(false);
        setICOData((value) => ({
          ...value,
          aMonth: parseInt(result),
        }));
      });
  }

  async function onFinish(values) {
    console.log(values);

    let iconURL = values.IconUrl;
    let Facebook = values.FacebookUrl;
    let Twitter = values.TwitterUrl;
    let Website = values.Website;
    let Description = values.Description;

    if (values.IconUrl === undefined) {
      iconURL = "";
    }
    if (values.FacebookUrl === undefined) {
      Facebook = "";
    }
    if (values.TwitterUrl === undefined) {
      Twitter = "";
    }
    if (values.Website === undefined) {
      Website = "";
    }
    if (values.Description === undefined) {
      Description = "";
    }

    let Array = [iconURL, Facebook, Twitter, Website, Description];
    if (props.isConnect) {
      await ICOHelperUpdateSocialMedia(address, Array).then((result) => {
        UpdateConnectLoading(false);
      });
    } else {
      Swal.fire("warning", "Please connect to Wallet");
    }
  }

  console.log(store.getState().ConnectWallet.isConnect);
  if (props.isLoadingEnable) {
    return (
      <>
        <Loading />
      </>
    );
  }
  var lokingPeriodTime =
    ICOData.endTime +
    ICOData.lokingPeriodTime +
    ICOData.vestingCounter * ICOData.aMonth;
  return (
    <main className="" style={{ height: "100vh" }}>
      <div style={{ height: "100%" }}>
        {props.walletAddress === undefined ? (
          <>Yess</>
        ) : (
          <>
            {owner &&
            owner.toLowerCase() === props.walletAddress.toLowerCase() ? (
              <>
                <div className="hidden md:block"></div>
                <div className="mt-0  relative z-10 max-w-[1000px] mx-auto pb-[120px]">
                  <div className="max-h-[800px] h-full overflow-y-scroll flex flex-col md:flex-row gap-[24px] justify-center mt-[30px] ">
                    {/* These are the admin function list  */}
                    <div className=" h-full w-full md:max-w-[400px] bg-white border border-[#e8ecf4] rounded-lg  p-[40px] drop-shadow-xl">
                      <h1 className="font-bold text-xl mb-[30px]">
                        Admin Functions
                      </h1>
                      <div className="flex flex-col max-h-[1000px] overflow-y-scroll">
                        <AdminCardList
                          address={address}
                          IDOUpadter={IDOUpadter}
                        />
                      </div>
                    </div>{" "}
                    <div className=" h-full w-full md:max-w-[400px] bg-white border border-[#e8ecf4] rounded-lg  p-[40px] drop-shadow-xl">
                      <h1 className="font-bold text-xl mb-[30px]">
                        ICO Information
                      </h1>
                      <div className="flex flex-col max-h-[1000px] text-left text-xl overflow-y-scroll">
                        <div>
                          Vesting Counter :{" "}
                          <span>{ICOData.vestingCounter}</span>
                        </div>
                        <div className="my-10">
                          Vesting will start :{" "}
                          <span>
                            {console.log(
                              ICOData.endTime,
                              ICOData.lokingPeriodTime,
                              ICOData.aMonth,
                              ICOData.vestingCounter
                            )}
                            {moment(parseInt(lokingPeriodTime * 1000)).format(
                              "MMMM Do YYYY, h:mm:ss a"
                            )}
                          </span>
                        </div>{" "}
                        <div>
                          Vesting Percentage :{" "}
                          <span>
                            {ICOData.vestingCounter < 11 ? "5%" : "45%"}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div></div>
                  </div>
                </div>
              </>
            ) : (
              <>
                {props.walletAddress == "" ? (
                  <>
                    <h1 className="font-bold text-xl mb-[30px] mt-[20px]">
                      Please Connect Wallet
                    </h1>
                  </>
                ) : (
                  <>
                    {" "}
                    <h1 className="font-bold text-xl mb-[30px] mt-[20px]">
                      Caller is not the owner
                    </h1>
                  </>
                )}
              </>
            )}
          </>
        )}
      </div>
    </main>
  );
}

const IDODataInformation = [
  { title: "Invested User", icon: <GiReceiveMoney /> },
  { title: "User Allownce", icon: <GiTakeMyMoney /> },
];
export default connect(mapStateToProps, null)(IDOPage);
