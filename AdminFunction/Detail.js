// import React , { useState, useEffect } from 'react'
// import { store } from "../Redux/store";
// import { connect } from "react-redux";
// import Swal from "sweetalert2";
// import { useParams } from "react-router-dom";
// import { UpdateConnectLoading, UpdateConnectModal } from "../Redux/Action";
// import { DivideBy18 } from "../Helpers/utils";
// import {
//     ICOHelperContract,
//     ICOHelperUpdateSocialMedia,
// } from "../Helpers/ICOHelper";
// const mapStateToProps = (state) => ({
//     isConnect: state.ConnectWallet.isConnect,
//   });

// export const Detail = (props) => {

//     console.log(props.investeUser)
//   return (
//     <>
//             <div className="mt-4 max-w-[800px] mx-auto border border-[#e8ecf4] rounded-lg rounded-tr-lg">
//                 <div class="flex flex-col px-[16px] py-[8px]">
//                     <h1 className="font-bold text-xl mb-[30px] px-[16px] py-[8px]">
//                         Total No. of Vesting
//                     </h1>

//                     {props.investeUser !== null ? (
//                         <h1>{props.investeUser.length}</h1>
//                     ) : (
//                         <h3 className="font-semibold   mb-[30px] px-[16px] py-[8px]">
//                             Don't have invested User
//                         </h3>
//                     )}
//                 </div>
//             </div>
//     </>
//   )
// }

// export default connect(mapStateToProps, null)(Detail);

