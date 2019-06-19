import React from "react";
const Welcome = props => {
  return (
    <div>
      <h1 className="title-container__title">
        <b>
          Welcome
          {/* {props.username} */}!
        </b>
      </h1>
      <p className="title-container__subtitle">
        {" "}
        <br />
        <br />
        Check weather conditions in different cities{" "}
      </p>
    </div>
  );
};
export default Welcome;
