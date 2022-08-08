import React, { useState, useEffect } from "react";
import { Form, Input, Button, InputNumber, DatePicker } from "antd";
import { type } from "@testing-library/user-event/dist/type";
import { UpdateConnectLoading } from "../../Redux/Action/index";
import {
  ICOHelperContract,
  ICOHelperCurrentTime,
  ICOHelperGetTokenomics,
  ICOHelperGetBalance,
  ICOHelperGetOwner,
  ICOHelperGetBalanceValty,
  ICOHelperLokingpriod,
  ICOHelperVestingCounter,
  ICOHelperAmonth,
} from "../../Helpers/ICOHelper";
import { connect } from "react-redux";
import Swal from "sweetalert2";
import { web3_ } from "../../Services";
import { store } from "../../Redux/store";
import moment from "moment";
import { BUSDTokenABI } from "../../Config/ABI/BUSDTokenABI";
import { ICOContractaddress } from "../../Config/Contract/Contract";

const mapStateToProps = (state) => ({
  isConnect: state.ConnectWallet.isConnect,
});

function AdminCard(props) {
  const [Contract, setContract] = useState(null);
  const [starttime, setStarttime] = useState();
  useEffect(async () => {
    setContract(await ICOHelperContract(props.address));
  }, []);

  async function handleClick() {
    let data = await ICOHelperGetTokenomics(props.address);
    setStarttime(data);
  }

  const onFinish = async (values, funName) => {
    console.log(values);
    if (props.isConnect) {
      let InputS = document.forms[funName].getElementsByTagName("input");
      console.log(InputS);
      let Array = [];
      for (let i = 0; i < InputS.length; i++) {
        console.log(document.getElementById(InputS[i].id).type);
        if (document.getElementById(InputS[i].id).type === "number") {
          let value = InputS[i].value;
          //           alert(value)
          Array.push(web3_.utils.toWei(value.toString(), "ether"));
        } else {
          Array.push(InputS[i].value);
        }
      }
      console.log(Array);
      let Methods = Contract.methods[funName](...Array);

      if (funName === "setICOTime") {
        let startDate = new Date(Array[0]).getTime() / 1000;
        let endDate = new Date(Array[1]).getTime() / 1000;
        if (startDate >= endDate) {
          Swal.fire(
            "Warning!",
            "Start Date cannot be greater than or equal to end Date",
            "warning"
          );
        } else {
          UpdateConnectLoading(true);
          if (startDate > endDate) {
            UpdateConnectLoading(false);
            Swal.fire(
              "Warning!",
              "Start time cannnot be greater than end time",
              "warning"
            );
          } else {
            Contract.methods[funName](
              web3_.utils.toWei(startDate.toString(), "Gwei"),
              web3_.utils.toWei(endDate.toString(), "Gwei")
            )
              .send({
                from: store.getState().ConnectWallet.address,
              })
              .on("transactionHash", function (transactionHash) {
                console.log(transactionHash);
              })
              .on("confirmation", () => {})
              // get New Contract Address
              .then(async (newContractInstance) => {
                props.IDOUpadter();
                UpdateConnectLoading(false);
              })
              .catch((err) => {
                UpdateConnectLoading(false);
              });
          }
        }
      } else if (funName === "setPresaleRate") {
        //PreSale Rate Validation
        let data = await ICOHelperGetTokenomics(props.address);
        console.log(parseInt(data[3]));
        if (new Date().getTime() / 1000 > parseInt(data[3])) {
          UpdateConnectLoading(false);
          Swal.fire(
            "Warning!",
            "Presale Price cannot be change after the start Time.",
            "warning"
          );
        } else {
          UpdateConnectLoading(true);
          Methods.send({
            from: store.getState().ConnectWallet.address,
          })
            .on("transactionHash", function (transactionHash) {
              console.log(transactionHash);
            })
            .on("confirmation", () => {})
            // get New Contract Address
            .then((newContractInstance) => {
              props.IDOUpadter();
              UpdateConnectLoading(false);
            })
            .catch((err) => {
              UpdateConnectLoading(false);
            });
        }
      }

      //set Hard Cap and Soft Cap  and Validation
      else if (funName === "setSoftHardCap") {
        UpdateConnectLoading(true);
        console.log(Array[0], Array[1]);
        if (parseInt(Array[0]) > parseInt(Array[1])) {
          UpdateConnectLoading(false);
          Swal.fire(
            "Warning!",
            "HardCap Must be Greater Than SoftCap and HardCap Value Can not be less than Total Collected BUSD Fund.",
            "warning"
          );
        } else {
          Methods.send({ from: store.getState().ConnectWallet.address })
            .on("transactionHash", function (transactionHash) {
              console.log(transactionHash);
            })
            .on("confirmation", () => {})
            // get New Contract Address
            .then((newContractInstance) => {
              props.IDOUpadter();
              UpdateConnectLoading(false);
            })
            .catch((err) => {
              UpdateConnectLoading(false);
            });
        }
      }
      // set IDO Token Contract Address
      else if (funName === "setTokenContractAddr") {
        UpdateConnectLoading(true);
        Methods.send({ from: store.getState().ConnectWallet.address })
          .on("transactionHash", function (transactionHash) {
            console.log(transactionHash);
          })
          .on("confirmation", () => {})
          // get New Contract Address
          .then((newContractInstance) => {
            props.IDOUpadter();
            UpdateConnectLoading(false);
          })
          .catch((err) => {
            UpdateConnectLoading(false);
          });
      } else if (funName === "retrieveStuckedERC20Toke") {
        UpdateConnectLoading(true);
        Methods.send({ from: store.getState().ConnectWallet.address })
          .on("transactionHash", function (transactionHash) {
            console.log(transactionHash);
          })
          .on("confirmation", () => {})
          // get New Contract Address
          .then((newContractInstance) => {
            props.IDOUpadter();
            UpdateConnectLoading(false);
          })
          .catch((err) => {
            UpdateConnectLoading(false);
          });
      } else if (funName === "retrieveStuckedVaultyToken") {
        UpdateConnectLoading(true);
        let BalanceOf = await new web3_.eth.Contract(
          BUSDTokenABI,
          Array[0]
        ).methods
          .balanceOf(ICOContractaddress)
          .call()
          .then((res) => {
            return res;
          })
          .catch((err) => {
            return 0;
          });

        console.log(BalanceOf);

        Methods.send({ from: store.getState().ConnectWallet.address })
          .on("transactionHash", function (transactionHash) {
            console.log(transactionHash);
          })
          .on("confirmation", () => {})
          // get New Contract Address
          .then((newContractInstance) => {
            props.IDOUpadter();
            UpdateConnectLoading(false);
          })
          .catch((err) => {
            UpdateConnectLoading(false);
          });
      } else if (funName === "addUser") {
        UpdateConnectLoading(true);
        Methods.send({ from: store.getState().ConnectWallet.address })
          .on("transactionHash", function (transactionHash) {
            console.log(transactionHash);
          })
          .on("confirmation", () => {})
          // get New Contract Address
          .then((newContractInstance) => {
            props.IDOUpadter();
            UpdateConnectLoading(false);
          })
          .catch((err) => {
            UpdateConnectLoading(false);
          });
      } else if (funName === "addBulkUsers") {
        UpdateConnectLoading(true);
        Methods.send({ from: store.getState().ConnectWallet.address })
          .on("transactionHash", function (transactionHash) {
            console.log(transactionHash);
          })
          .on("confirmation", () => {})
          // get New Contract Address
          .then((newContractInstance) => {
            props.IDOUpadter();
            UpdateConnectLoading(false);
          })
          .catch((err) => {
            UpdateConnectLoading(false);
          });
      } else if (funName === "verifyUser") {
        UpdateConnectLoading(true);
        Methods.call()
          .then((res) => {
            Swal.fire(
              "Whitelist User Status",
              "User Is Whitelisted",
              res == true ? "success" : "error"
            );
            props.IDOUpadter();
            UpdateConnectLoading(false);
          })
          .catch((err) => {
            Swal.fire(
              "Whitelist User Status",
              "User Is Not Whitelisted",
              "error"
            );
            UpdateConnectLoading(false);
          });
      }
      //set
      else if (funName === "Vesting") {
        // var element = document.getElementById("time").value;
        let balance = await ICOHelperGetBalance(props.address);
        let lokingTime = await ICOHelperLokingpriod(props.address);
        let graniteVlt = await ICOHelperGetBalanceValty(props.address);
        let Mothtime = await ICOHelperAmonth(props.address);

        let investor = await ICOHelperGetTokenomics(props.address);
        let vestingCounter = await ICOHelperVestingCounter();
        // alert(Mothtime, "this is the interval vesting time");

        console.log(investor[5] / Math.pow(10, 9));
        console.log(investor[4], "kgdbrbnnbnf");
        console.log(graniteVlt, "balance of granite");
        console.log("inverstor amount", investor);
        // Checking Vesting Counter
        if (vestingCounter != 12) {
          // Check Sale Status
          if (
            Math.floor(new Date().getTime() / 1000.0) > Math.floor(investor[4])
          ) {
            // Locking period Check
            if (
              new Date().getTime() / 1000 >
              parseInt(investor[4]) + parseInt(lokingTime)
            ) {
              // Check Fund of ICO
              console.log(
                parseInt(investor[4]) +
                  parseInt(lokingTime) +
                  parseInt(vestingCounter) * parseInt(Mothtime)
              );
              if (
                parseInt(investor[4]) +
                  parseInt(lokingTime) +
                  parseInt(vestingCounter) * parseInt(Mothtime) <
                new Date().getTime() / 1000
              ) {
                console.log(
                  (parseInt(investor[5]) * 0.05) / Math.pow(10, 18),
                  parseInt(balance) / Math.pow(10, 18),
                  props.address
                );
                if (
                  (parseInt(investor[5]) * 0.05) / Math.pow(10, 18) <=
                  parseInt(balance) / Math.pow(10, 18)
                ) {
                  Methods.send({
                    from: store.getState().ConnectWallet.address,
                  })
                    .on("transactionHash", function (transactionHash) {
                      console.log(transactionHash);
                    })
                    .on("confirmation", () => {})
                    // get New Contract Address
                    .then((newContractInstance) => {
                      UpdateConnectLoading(false);
                    })
                    .catch((err) => {
                      UpdateConnectLoading(false);
                    });
                } else {
                  Swal.fire("Insufficent Granite Fund In ICO", "", "error");
                }
              } else {
                Swal.fire({
                  icon: "warning",
                  title: "Next Vesting Can  Start After One Month",
                });
              }
            } else {
              Swal.fire(
                "First Vesting Can Be Start After Locking Period",
                "",
                "error"
              );
            }
          } else {
            UpdateConnectLoading(false);
            Swal.fire("Warning!", "Sale Is Not Ended. Wait For It", "warning");
          }

          // // old Code
          // if (
          //   Math.floor(new Date().getTime() / 1000.0) < Math.floor(investor[4])
          // ) {
          //   UpdateConnectLoading(false);
          //   Swal.fire("Warning!", "Sale is not Ended. Wait for it", "warning");
          // } else if (
          //   new Date().getTime() / 1000 <
          //   parseInt(investor[4]) + parseInt(lokingTime)
          // ) {
          //   //31536000)
          //   Swal.fire(
          //     "First Vesting Can be start after locking period",
          //     "",
          //     "error"
          //   );
          // } else if (60 - parseInt(vestingCounter) * 5 != 0) {
          //   if (
          //     (parseInt(investor[6]) * 0.05) / Math.pow(10, 18) >
          //     parseInt(balance) / Math.pow(10, 18)
          //   ) {
          //     Swal.fire("Unsufficent Granite Fund In ICO", "", "error");
          //   } else {
          //     if (
          //       parseInt(investor[5]) / Math.pow(10, 18) <=
          //       parseInt(graniteVlt) / Math.pow(10, 18)
          //     ) {
          //       UpdateConnectLoading(true);
          //       Methods.send({
          //         from: store.getState().ConnectWallet.address,
          //       })
          //         .on("transactionHash", function (transactionHash) {
          //           console.log(transactionHash);
          //         })
          //         .on("confirmation", () => {})
          //         // get New Contract Address
          //         .then((newContractInstance) => {
          //           UpdateConnectLoading(false);
          //         })
          //         .catch((err) => {
          //           UpdateConnectLoading(false);
          //         });
          //     } else {
          //       Swal.fire("Insufficent Token on ICO", "", "error");
          //     }
          //   }
          //   // } else if (
          //   //   parseInt(investor[4]) +
          //   //     parseInt(lokingTime) +
          //   //     parseInt(vestingCounter) * parseInt(Mothtime) <=
          //   //   new Date().getTime() / 1000
          //   // ) {
          //   //   Swal.fire({
          //   //     icon: "warning",
          //   //     title: "Next Vesting Can  Start After One Month",
          //   //   });
          //   // } else {
          //   if (
          //     (parseInt(investor[6]) * 0.05) / Math.pow(10, 18) >
          //     parseInt(balance) / Math.pow(10, 18)
          //   ) {
          //     Swal.fire("Unsufficent Granite Fund In ICO", "", "error");
          //   } else {
          //     if (
          //       parseInt(investor[5]) / Math.pow(10, 18) >=
          //       parseInt(graniteVlt) / Math.pow(10, 18)
          //     ) {
          //       UpdateConnectLoading(true);
          //       Methods.send({
          //         from: store.getState().ConnectWallet.address,
          //       })
          //         .on("transactionHash", function (transactionHash) {
          //           console.log(transactionHash);
          //         })
          //         .on("confirmation", () => {})
          //         // get New Contract Address
          //         .then((newContractInstance) => {
          //           UpdateConnectLoading(false);
          //         })
          //         .catch((err) => {
          //           UpdateConnectLoading(false);
          //         });
          //     } else {
          //       Swal.fire("Insufficent  Fund In ICO", "", "error");
          //     }
          //   }
          // }
          // }
        } else {
          Swal.fire({
            icon: "warning",
            title: "All Vesting Round Completed",
          });
        }
        // if (
        //   parseInt(investor[4]) +
        //     parseInt(lokingTime) +
        //     parseInt(vestingCounter) * parseInt(Mothtime) <=
        //   new Date().getTime() / 1000
        // ) {
        //   Swal.fire("Vesting can start one month", "", "error");
        // }
      }
    } else {
      Swal.fire({
        icon: "warning",
        title: "Please connect your wallet",
      });
    }
  };

  const config = {
    rules: [
      {
        type: "object",
        required: true,
        message: "Please select time!",
      },
    ],
  };
  console.log(props.funName);
  return (
    <div class="mb-[30px] " style={{ marginBottom: "30px" }}>
      <h3 class="text-center font-semibold mb-[10px]">{props.data.name}</h3>
      <Form
        class="text-left"
        id={props.funName}
        onFinish={(values) => onFinish(values, props.funName)}
      >
        <div class="flex flex-col">
          {props.data.inputs.map((item, index) => {
            if (item.type === "date") {
              return (
                <div
                  key={index}
                  class="rounded-md p-[8px] border border-[#e8ecf4]  ease-in duration-300  cursor-pointer hover:ease-out hover:border-[#060b27] mb-[12px]"
                >
                  <Form.Item
                    name={item.placeholder}
                    {...config}
                    style={{ marginBottom: "0" }}
                    key={index}
                  >
                    <DatePicker
                      placeholder={item.placeholder}
                      showTime
                      format="YYYY-MM-DD HH:mm:ss"
                      className="w-full hover:outline-none"
                      id={item.idName}
                      disabledDate={(current) => {
                        let customDate = moment().format("YYYY-MM-DD");
                        return (
                          current && current < moment(customDate, "YYYY-MM-DD")
                        );
                      }}
                    />
                  </Form.Item>
                </div>
              );
            } else {
              return (
                <Form.Item
                  key={index}
                  name={item.placeholder}
                  rules={[
                    {
                      required: true,
                      message: `Please input your ${item.placeholder}!`,
                    },
                  ]}
                  style={{ marginBottom: "0" }}
                >
                  <div class="flex rounded-md p-[8px] border border-[#e8ecf4]  ease-in duration-300  cursor-pointer hover:ease-out hover:border-[#060b27] mb-[12px]">
                    {/* <input
                  placeholder={item.placeholder}
                  class=" w-full bg-[transparent]  outline-0"
                  required
                  type={item.type}
                ></input> */}
                    {item.type === "text" && (
                      <Input
                        id={item.idName}
                        placeholder={item.placeholder}
                        className=" w-full bg-[transparent]  outline-0"
                      />
                    )}
                    {item.type === "number" && (
                      <InputNumber
                        id={item.idName}
                        className=" w-full bg-[transparent]  outline-0"
                        min="0"
                        step="0.00001"
                        type="number"
                        stringMode
                        placeholder={item.placeholder}
                      />
                    )}
                  </div>
                </Form.Item>
              );
            }
          })}
        </div>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            size="large"
            class="px-[16px] py-[8px] bg-[#040347] rounded-md text-white cursor-pointer ease-in duration-300  hover:shadow-xl hover:shadow-[#060b27]/20"
          >
            Submit
          </Button>
        </Form.Item>
        {/* SetTimestatus */}
        {/* <div>
          <TimeStatus />
        </div> */}
        {/* Close Stattus */}
      </Form>

      {/* <button onClick={handleClick}> starttime</button> */}
    </div>
  );
}

export default connect(mapStateToProps, null)(AdminCard);
