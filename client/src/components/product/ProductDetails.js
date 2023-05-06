import React, { Fragment, useEffect,useState} from "react";
import Carousel from "react-material-ui-carousel";
import "./ProductDetails.css";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, getProductDetails } from "../../actions/productAction";
import { useParams } from "react-router-dom";
import { Rating } from "@material-ui/lab";
import Loader from "../layout/Loader/Loader";
import { addItemsToCart } from "../../actions/cartActions";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from "@material-ui/core";
import ReviewCard from "./ReviewCard.js";
const ProductDetails = ({ match }) => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { loading, product_details, error } = useSelector(
    (state) => state.product_details
  );
  console.log({ loading, product_details, error });
  const options = {
    size: "large",
    value: product_details.ratings,
    readOnly: true,
    precision: 0.5,
  };
   
  const [quantity, setQuantity] = useState(1);
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");


  const increaseQuantity = () => {
    if (product_details.Stock <= quantity) return;

    const qty = quantity + 1;
    setQuantity(qty);
  };

  const decreaseQuantity = () => {
    if (1 >= quantity) return;

    const qty = quantity - 1;
    setQuantity(qty);
  };

  const addToCartHandler = () => {
    dispatch(addItemsToCart(id, quantity));
    // alert.success("Item Added To Cart");
  };
   
  const submitReviewToggle = () => {
    open ? setOpen(false) : setOpen(true);
  };

  const reviewSubmitHandler = () => {
    // const myForm = new FormData();

    // myForm.set("rating", rating);
    // myForm.set("comment", comment);
    // myForm.set("productId", match.params.id);

    // dispatch(newReview(myForm));

    // setOpen(false);
  };

  useEffect(() => {
    if(error) dispatch(clearErrors);
    console.log("dispatched funtion started");
    dispatch(getProductDetails(id));
  }, [dispatch, id,error]);

  return (
    <Fragment>
    {loading ? (
      <Loader />
    ) : (
      <Fragment>
        {/* <MetaData title={`${product.name} -- ECOMMERCE`} /> */}
        <div className="ProductDetails">
          <div>
            <Carousel>
              {product_details.images &&
                product_details.images.map((item, i) => (
                  <img
                    className="CarouselImage"
                    key={i}
                    src={item.url}
                    alt={`${i} Slide`}
                  />
                ))}
            </Carousel>
          </div>

          <div>
            <div className="detailsBlock-1">
              <h2>{product_details.name}</h2>
              <p>product # {product_details._id}</p>
            </div>
            <div className="detailsBlock-2">
              <Rating {...options} />
              <span className="detailsBlock-2-span">
                {" "}
                ({product_details.numOfReviews} Reviews)
              </span>
            </div>
            <div className="detailsBlock-3">
              <h1>{`₹${product_details.price}`}</h1>
              <div className="detailsBlock-3-1">
                <div className="detailsBlock-3-1-1">
                  <button onClick={decreaseQuantity}>-</button>
                  {/* <input  type="number" value={100} style={{border:"1px solid black"}} /> */}
                  <span>{quantity}</span>
                  <button onClick={increaseQuantity}>+</button>
                </div>
                <button
                  disabled={product_details.Stock < 1 ? true : false}
                  onClick={addToCartHandler}
                >
                  Add to Cart
                </button>
              </div>

              <p>
                Status:
                <b className={product_details.Stock < 1 ? "redColor" : "greenColor"}>
                  {product_details.Stock < 1 ? "OutOfStock" : "InStock"}
                </b>
              </p>
            </div>

            <div className="detailsBlock-4">
              Description : <p>{product_details.description}</p>
            </div>

            <button onClick={submitReviewToggle} className="submitReview">
              Submit Review
            </button>
          </div>
        </div>

        <h3 className="reviewsHeading">REVIEWS</h3>

        <Dialog
          aria-labelledby="simple-dialog-title"
          open={open}
          onClose={submitReviewToggle}
        >
          <DialogTitle>Submit Review</DialogTitle>
          <DialogContent className="submitDialog">
            <Rating
              onChange={(e) => setRating(e.target.value)}
              value={rating}
              size="large"
            />

            <textarea
              className="submitDialogTextArea"
              cols="30"
              rows="5"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            ></textarea>
          </DialogContent>
          <DialogActions>
            <Button onClick={submitReviewToggle} color="secondary">
              Cancel
            </Button>
            <Button onClick={reviewSubmitHandler} color="primary">
              Submit
            </Button>
          </DialogActions>
        </Dialog>

        {product_details.reviews && product_details.reviews[0] ? (
          <div className="reviews">
            {product_details.reviews &&
              product_details.reviews.map((review) => (
                <ReviewCard key={review._id} review={review} />
              ))}
          </div>
        ) : (
          <p className="noReviews">No Reviews Yet</p>
        )}
      </Fragment>
    )}
  </Fragment>
  );
};

export default ProductDetails;
