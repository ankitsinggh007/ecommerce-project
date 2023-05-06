import React, { Fragment, useEffect } from "react";
import { CgMouse } from "react-icons/cg";
import "./Home.css";
import ProductCard from "./ProductCard.js";
// import MetaData from "../layout/MetaData";
import { clearErrors, getProduct } from "../../actions/productAction";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../layout/Loader/Loader";
// import { useAlert } from "react-alert";

const Home = () => {

  // const alert = useAlert();
  const dispatch = useDispatch();
  const { loading, error, product } = useSelector((state) => state.products);
  console.log("insde use effect")

  useEffect(() => {
    if (error) {

      dispatch(clearErrors());
    }
    console.log("insde use effect")
    dispatch(getProduct());
  }, [dispatch, error]);


  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          {/* <MetaData title="ECOMMERCE" /> */}

          <div className="banner">
            <p>Welcome to Ecommerce</p>
            <h1>FIND AMAZING PRODUCTS BELOW</h1>

            <a href="#container">
              <button>
                Scroll <CgMouse />
              </button>
            </a>
          </div>

          <h2 className="homeHeading">Featured Products</h2>

          <div className="container" id="container">
            {product &&
             product.map((product) => 
                <ProductCard  Product={product} />
               )} 
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Home;