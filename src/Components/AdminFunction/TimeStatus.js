import React, { useEffect } from "react";
import Swal from "sweetalert2";
import { web3_ } from "../../Services";
import { ICO_ABI } from "../../Config/ABI/ICO_ABI";
import { ICOContractaddress } from "../../Config/Contract/Contract";
import { UpdateConnectLoading } from "../../Redux/Action";
import { store } from "../../Redux/store";
import { connect } from "react-redux";

const TimeStatus = (props) => {
  //   const [isStartsale, setisStartsale] = React.useState(false);
  const [isStartsale, setisStartsale] = React.useState(false);
  useEffect(async () => {
    if (props.isConnect) {
      // saleStatus
      console.log(await SaleStatus());
      setisStartsale(await SaleStatus());
    }
  }, [props.isConnect]);

  const SaleStatus = async () => {
    return await new web3_.eth.Contract(ICO_ABI, ICOContractaddress).methods
      .saleStatus()
      .call();
  };

  return (
    <div>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          if (props.isConnect) {
            UpdateConnectLoading(true);
            await new web3_.eth.Contract(ICO_ABI, ICOContractaddress).methods
              .setSaleStatus()
              .send({ from: store.getState().ConnectWallet.address })
              .on("transactionHash", function (transactionHash) {
                console.log(transactionHash);
              })
              .on("confirmation", () => {})
              // get New Contract Address
              .then(async (newContractInstance) => {
                setisStartsale(await SaleStatus());
                UpdateConnectLoading(false);
              })
              .catch((err) => {
                UpdateConnectLoading(false);
              });
          }
        }}
      >
        <div className="mb-[30px] mt-[20px]">
          <h1 className="text-center font-semibold mb-[10px] mt-[10px]">
            Sale Status
          </h1>
          <button
            class="ant-btn ant-btn-primary ant-btn-lg"
            type="submit"
            // onClick={() => {
            //   if (isStartsale) {
            //     Swal.fire("Sale is ended");
            //   } else {
            //     setisStartsale(true);
            //     Swal.fire("Sale is start  successfully");
            //   }
            // }}
          >
            {" "}
            {!isStartsale ? <span>Start Sale</span> : <span>Pause Sale</span>}
          </button>
        </div>
      </form>
    </div>
  );
};

const mapStateToProps = (state) => ({
  isConnect: state.ConnectWallet.isConnect,
});
export default connect(mapStateToProps, null)(TimeStatus);
