import React, { useState } from "react";
import Papa from "papaparse";

import Swal from "sweetalert2";
import { web3_ } from "../../Services";
import { ICO_ABI } from "../../Config/ABI/ICO_ABI";
import { ICOContractaddress } from "../../Config/Contract/Contract";
import { UpdateConnectLoading } from "../../Redux/Action";
import { store } from "../../Redux/store";
function CSVUpload(props) {
  const [ReadCsvData, setReadCsvData] = useState(null);
  const [isUploded, setUploded] = useState(false);
  const [AddressWhitelist, setAddressWhitelist] = useState([]);
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <h3 className="text-center font-semibold mb-[10px]">
        {" "}
        Add Whitelist User
      </h3>
      <form
        class="form-inline"
        onSubmit={async (e) => {
          e.preventDefault();

          Papa.parse(document.getElementById("files").files[0], {
            header: true,
            complete: async (results) => {
              setReadCsvData(results.data);
              if (results.data !== null) {
                let Data = [];
                if (true) {
                  results.data.map((data) => {
                    console.log(data);
                    if (data.Address != "") {
                      Data.push(data.Address);
                    }

                    setAddressWhitelist((result) => [...result, data.Address]);
                  });
                  console.log(Data);
                  UpdateConnectLoading(true);
                  await new web3_.eth.Contract(
                    ICO_ABI,
                    ICOContractaddress
                  ).methods
                    .addBulkUsers(Data)
                    .send({ from: store.getState().ConnectWallet.address })
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
                } else {
                  Swal.fire("Yess");
                }
              } else {
                Swal.fire("Please Select Correct File");
              }
            },
          });
        }}
      >
        <div class="form-group">
          <input
            type="file"
            id="files"
            class="form-control"
            accept=".csv"
            required
          />
        </div>
        <div class="form-group">
          <button
            style={{
              padding: " 0.375rem 0.75rem",
              height: "42px",
              fontSize: "16px",
              lineHeight: "1.5",
              borderRadius: "0.25rem",
              color: "#000",
              outline: "none",
              border: "none",
              margin: "20px 0",
              cursor: "pointer",
              transition: "all 0.3s cubic-bezier(0.645,0.045,0.355,1)",
              background: "#FFCE33",
              borderColor: "#faa059ad",
            }}
            type="submit"
            // id="submit-file"
            class="btn btn-primary"
            onClick={() => {
              if (ReadCsvData === null) {
                // Swal.fire("Please Uploaded file");
              } else {
                setUploded(true);
                Swal.fire("File Uploaded Successfully");
              }
            }}
          >
            Add Whitelist User
          </button>
        </div>
      </form>
      <a
        className="mb-[30px]"
        href={process.env.PUBLIC_URL + "assets/Testing.csv"}
        download
      >
        Download Sample File
      </a>
    </div>
  );
}

export default CSVUpload;
