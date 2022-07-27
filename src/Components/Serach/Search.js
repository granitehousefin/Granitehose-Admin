import React, { useEffect, useState } from "react";

function Search(props) {
  const [FilterData, setFilterData] = useState([]);
  function handleChange(e) {
    const query = e.target.value;
    const filteredData = FilterData.filter((el) => {
      //if no input the return the original
      if (query === "") {
        return el;
      } else {
        return (
          el[0][0].toLowerCase().includes(query.toLowerCase()) ||
          el[0][1].toLowerCase().includes(query.toLowerCase())
        );
      }
    });
    props.setICODetailsFilter(filteredData);
  }
  useEffect(() => {
    setFilterData(props.filterData);
  }, [props.filterData]);
  return (
    <>
      <input
        onChange={handleChange}
        placeholder={props.placeholder}
        className={props.className}
      ></input>
    </>
  );
}

export default Search;
