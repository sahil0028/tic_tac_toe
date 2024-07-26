import React from "react";
import Img from "../assets/robort.png";
import Img2 from "../assets/friendship.png";

const Choice = ({changeOpp}) => {
  return (
    <div className="absolute top-4">
      <h2 className="text-3xl font-bold mb-2 ">Choose 2nd player</h2>
      {/* <div className="options flex justify-center font-semibold ">
        <div className="text-3xl">
            <input type="radio" id="html" name="fav_language" defaultValue="HTML" />
            
            <label htmlFor="html"><img className="h-5" src={Img} alt="img not found" /> HTML</label>
        </div>
        <div className="text-3xl">
            <input type="radio" id="css" name="fav_language" defaultValue="CSS" />
            <label htmlFor="css">CSS</label>
        </div>
        <br />
      </div> */}
      <div className="radio-with-Icon">
        <p className="radioOption-Item">
          <input
            type="radio"
            name="BannerTypes"
            id="BannerType1"
            defaultValue="true"
            className="ng-valid ng-dirty ng-touched ng-empty"
            aria-invalid="false"
            style={{}}
            defaultChecked
            onClick={()=>changeOpp(1)}
          />
          <label htmlFor="BannerType1" className="">
            {/* <i className="fa fa-image" /> */}
            <img src={Img} className="fa fa-image h-12 ml-4" alt="" />
            <span className="font-semibold">Computer</span>
          </label>
        </p>
        <p className="radioOption-Item">
          <input
            type="radio"
            name="BannerTypes"
            id="BannerType2"
            defaultValue="false"
            className="ng-valid ng-dirty ng-touched ng-empty"
            aria-invalid="false"
            style={{}}
            onClick={()=>changeOpp(2)}
          />
          <label htmlFor="BannerType2">
            {/* <i className="fa fa-image" /> */}
            <img src={Img2} className="fa fa-image h-12 ml-4" alt="" />
            <span className="font-semibold">Friend</span>
          </label>
        </p>
        <p className="radioOption-Item">
          <input
            type="radio"
            name="BannerTypes"
            id="BannerType3"
            defaultValue="false"
            className="ng-valid ng-dirty ng-touched ng-empty"
            aria-invalid="false"
            style={{}}
            onClick={()=>changeOpp(3)}
          />
          <label htmlFor="BannerType3">
            <img src={Img2} className="fa fa-image h-12 ml-4" alt="" />
            <span className="font-semibold">Online</span>
          </label>
        </p>
      </div>
    </div>
  );
};

export default Choice;
