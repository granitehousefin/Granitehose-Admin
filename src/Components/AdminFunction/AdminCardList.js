import { Form, Input,InputNumber ,Button} from "antd";
import React from "react";
import { connect } from "react-redux";
import Swal from "sweetalert2";
import { BUSDTokenABI } from "../../Config/ABI/BUSDTokenABI";
import { ICOContractaddress } from "../../Config/Contract/Contract";
import { ICOHelperContract } from "../../Helpers/ICOHelper";
import { UpdateConnectLoading } from "../../Redux/Action";
import { web3_ } from "../../Services";
import CSVUpload from "./AddBulkUser";
import AdminCard from "./AdminCard";

function AdminCardList(props) {
  console.log(props);
  return (
    <>
      {AdminFunctionData.map((item, index) => {
        console.log(item.function);
      })}
      {AdminFunctionData.map((item, index) => (
        <AdminCard
          data={item}
          key={index}
          funName={item.function}
          address={props.address}
          IDOUpadter={props.IDOUpadter}
        />
      ))}
       <CSVUpload />

       {/* //REtruve  */}
       <h1 className="text-center font-semibold mb-[10px] mt-[10px]">Retrieve  Stucked  BEP20 Token</h1>
       <Form
          class="text-left"
          id="retrieveStuckedBEP20Token"
          onFinish={async (values) => {
            let Amount = values.Amount;
            let TokenAddress = values.TokenAddress;
            let WalletAddress = values.WalletAddress;
            console.log(
              web3_.utils.toWei(Amount, "ether"),
              TokenAddress,
              WalletAddress
            );

            if (props.isConnect) {
              if (parseFloat(Amount) > 0) {
                if (
                  web3_.utils.isAddress(TokenAddress.toLowerCase()) &&
                  web3_.utils.isAddress(WalletAddress.toLowerCase())
                ) {
                  if (
                    TokenAddress.toLowerCase() !== WalletAddress.toLowerCase()
                  ) {
                    let Symbol = await new web3_.eth.Contract(
                      BUSDTokenABI,
                      TokenAddress.toLowerCase()
                    ).methods
                      .symbol()
                      .call()
                      .then((res) => {
                        return res;
                      })
                      .catch((err) => {
                        return "";
                      });
                    let BalanceOf = await new web3_.eth.Contract(
                      BUSDTokenABI,
                      TokenAddress
                    ).methods
                      .balanceOf(ICOContractaddress)
                      .call()
                      .then((res) => {
                        return res;
                      })
                      .catch((err) => {
                        return 0;
                      });

                    if (Symbol !== "") {
                      let Decimal = await new web3_.eth.Contract(
                        BUSDTokenABI,
                        TokenAddress
                      ).methods
                        .decimals()
                        .call();
                      console.log(
                        parseInt(BalanceOf) / Math.pow(10, parseInt(Decimal)),
                        parseFloat(Amount)
                      );
                      if (
                        parseInt(BalanceOf) / Math.pow(10, parseInt(Decimal)) >=
                        parseFloat(Amount)
                      ) {
                        
                        let Contract  = await ICOHelperContract(ICOContractaddress);
                        console.log( TokenAddress,
                          web3_.utils.toWei(Amount, "ether"),
                          WalletAddress,Contract);
                        UpdateConnectLoading(true);
                        await Contract.methods.retrieveStuckedERC20Token( 
                          TokenAddress,
                          web3_.utils.toWei(Amount, "ether"),
                          WalletAddress,
                        ).send({ from: props.WalletAddress})
                        .on("transactionHash", function (transactionHash) {
                          console.log(transactionHash);
                        })
                        .on("confirmation", () => {})
                        // get New Contract Address
                        
                          .then((newContractInstance) => {
                            UpdateConnectLoading(false);
                            Swal.fire({
                              icon: "success",
                              title: "Transaction Success",
                            });
                          })
                          .catch((err) => {
                            UpdateConnectLoading(false);
                            Swal.fire({
                              icon: "warning",
                              title: "Transaction failed",
                            });
                          });
                      } else {
                        Swal.fire({
                          icon: "warning",
                          title: "Contract doesn't have enough token",
                        });
                      }
                    } else {
                      Swal.fire({
                        title: "Error",
                        text: "Token is not BEP20 Token",
                        icon: "error",
                        confirmButtonText: "OK",
                      });
                    }
                  } else {
                    Swal.fire({
                      title: "Error",
                      text: "Token Address and Wallet Address must be different",
                      icon: "error",
                      confirmButtonText: "OK",
                    });
                  }
                } else {
                  Swal.fire({
                    title: "Error",
                    text: "Token Address or Wallet Address is invalid",
                    icon: "error",
                  });
                }
              } else {
                Swal.fire({
                  title: "Error",
                  text: "Amount must be greater than 0",
                  icon: "error",
                  confirmButtonText: "OK",
                });
              }
            } else {
              Swal.fire({
                icon: "warning",
                title: "Please connect your wallet",
              });
            }
          }}
        >
          <div class="flex flex-col">
            <Form.Item
              name="TokenAddress"
              rules={[
                {
                  required: true,
                  message: `Please input your TokenAddress!`,
                },
              ]}
              style={{ marginBottom: "0" }}
            >
              <div class="flex rounded-md p-[8px] border border-[#e8ecf4]  ease-in duration-300  cursor-pointer hover:ease-out hover:border-[#060b27] mb-[12px]">
                <Input
                  id="_tokenAddr"
                  placeholder="TokenAddress"
                  className=" w-full bg-[transparent]  outline-0"
                />
              </div>
            </Form.Item>
            <Form.Item
              name="Amount"
              rules={[
                {
                  required: true,
                  message: `Please input your Amount!`,
                },
              ]}
              style={{ marginBottom: "0" }}
            >
              <div class="flex rounded-md p-[8px] border border-[#e8ecf4]  ease-in duration-300  cursor-pointer hover:ease-out hover:border-[#060b27] mb-[12px]">
                <InputNumber
                  id="amount"
                  className="w-full bg-[transparent]  outline-0"
                  min="0"
                  step="0.01"
                  type="number"
                  stringMode
                  placeholder="Amount"
                />
              </div>
            </Form.Item>
            <Form.Item
              name="WalletAddress"
              rules={[
                {
                  required: true,
                  message: `Please input your WalletAddress!`,
                },
              ]}
              style={{ marginBottom: "0" }}
            >
              <div class="flex rounded-md p-[8px] border border-[#e8ecf4]  ease-in duration-300  cursor-pointer hover:ease-out hover:border-[#060b27] mb-[12px]">
                <Input
                  id="WalletAddress"
                  placeholder="WalletAddress"
                  className=" w-full bg-[transparent]  outline-0"
                />
              </div>
            </Form.Item>
          </div>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              class="px-[16px] py-[8px] bg-[#060b27] rounded-md text-white cursor-pointer ease-in duration-300  hover:shadow-xl hover:shadow-[#060b27]/20"
            >
              Update
            </Button>
          </Form.Item>
        </Form>
    </>
  );
}
const AdminFunctionData = [
  // {
  //   name: "Retrieve Stucked Granite Token: ",
  //   function: "retrieveStuckedERC20Toke",
  //   inputs: [
  //     {
  //       placeholder: "Token Address",
  //       type: "text",
  //       idName: "_tokenAddr",
  //     },
  //     {
  //       placeholder: "Amount",
  //       type: "number",
  //       idName: "_amount",
  //     },
  //     {
  //       placeholder: "Address",
  //       type: "text",
  //       idName: "_toWallet",
  //     },
  //   ],
  // },
  // {
  //   name: "Retrieve Stucked Vaulty Token: ",
  //   function: "retrieveStuckedVaultyToken",
  //   inputs: [
  //     {
  //       placeholder: "Token Address",
  //       type: "text",
  //       idName: "_tokenAddr",
  //     },
  //     {
  //       placeholder: "Amount",
  //       type: "number",
  //       idName: "_amount",
  //     },
  //     {
  //       placeholder: "Address",
  //       type: "text",
  //       idName: "_toWallet",
  //     },
  //   ],
  // },

  // {
  //   name: "Verify User: ",
  //   function: "verifyUser",
  //   inputs: [
  //     {
  //       placeholder: "User Address",
  //       type: "text",
  //       idName: "_whitelistedAddress",
  //     },
  //   ],
  // },

  // {
  //   name: "Set Start and End Date",
  //   function: "setICOTime",
  //   inputs: [
  //     {
  //       placeholder: "StartDate",
  //       type: "date",
  //       idName: "_startTime",
  //     },
  //     {
  //       placeholder: "EndDate",
  //       type: "date",
  //       idName: "_endTime",
  //     },
  //   ],
  // },
  // {
  //   name: "Presale Rate",
  //   function: "setPresaleRate",
  //   inputs: [
  //     {
  //       placeholder: "rate",
  //       type: "number",
  //       idName: "_presaleRate",
  //     },
  //   ],
  // },
  {
    name: "Vesting Function",
    function: "Vesting",
    inputs: [],
  },
];
const mapStateToProps = (state) => ({
  isConnect: state.ConnectWallet.isConnect,
  WalletAddress:state.ConnectWallet.address
});
export default connect(mapStateToProps, null) (AdminCardList);
