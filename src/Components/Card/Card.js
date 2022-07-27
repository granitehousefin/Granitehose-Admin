import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import { DivideBy18 } from "../../Helpers/utils";
function Card(props) {
  const PayoutSymbol = "BUSD";
  return (
    <>
      {" "}
      <Link to={"/ido/" + props.data[2][1]}>
        <div class="relative rounded-lg cursor-pointer ease-in duration-300  hover:shadow-xl hover:-translate-y-6 hover:shadow-[#060b27]/30">
          <div class="relative rounded-lg bg-[#060b27]">
            <div class="relative w-full h-[150px] ">
              <img
                width="100%"
                class="absolute rounded-tl-lg rounded-tr-lg h-full "
                alt=""
                lazy="true"
                src="https://www.gbea.com.au/static/uploads/images/gbea-social-post-background-1080x1080-wffqitxgtvhl-wfsimnatqjkn.jpg"
              ></img>
              <div class="relative z-10 text-white text-2xl flex flex-col justify-center text-left h-full font-[700] px-[30px]">
                <span>{props.data[0][0]}</span>
                <span>{props.data[0][1]}</span>
                <span class="text-sm text-[#8a97b3] font-[300] flex ">
                  {/* May 21 ,2022 */}
                  <span>
                    {moment(
                      (props.data[1][3] * 1000) / Math.pow(10, 18)
                    ).format("MMM Do YYYY")}
                  </span>
                  <span class="flex-1"></span>
                  <span>
                    {moment(
                      (props.data[1][4] * 1000) / Math.pow(10, 18)
                    ).format("MMM Do YYYY")}
                  </span>
                </span>
              </div>
            </div>
            <div class="text-white px-5 py-3">
              <div class="flex justify-between mb-5">
                <span>Presale Rate</span>
                <span>
                  {DivideBy18(props.data[1][0])} {PayoutSymbol}
                </span>
              </div>
              <div class="flex justify-between mb-5">
                <span>Soft Cap </span>
                <span>
                  {DivideBy18(props.data[1][1])} {PayoutSymbol}
                </span>
              </div>
              <div class="flex justify-between mb-5">
                <span>Hard Cap</span>
                <span>
                  {DivideBy18(props.data[1][2])} {PayoutSymbol}
                </span>
              </div>
            </div>
          </div>{" "}
        </div>
      </Link>{" "}
    </>
  );
}

export default Card;
