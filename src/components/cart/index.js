import React, { useContext } from "react";
import { AppContext } from "../../contexts/app_context";
import CartItem from "../cart_item";
import axios from "axios";
import "./index.css";

const Cart = ({ handleChangeQty }) => {
  let { cart, setCart } = useContext(AppContext);

  let orderItemsJSX = cart.orderItems.map((cartItem) => {
    return (
      <CartItem
        key={cartItem._id}
        cartItem={cartItem}
        checkoutDone={cart.checkoutDone}
      />
    );
  });

  const handleCheckout = async () => {
    let response = await axios.put("/checkout");
    setCart(response.data);
  };

  return (
    <div className="OrderDetail">
      <div className="SectionHeading">
        {cart.checkoutDone ? (
          <>
            <span>
              ORDER <span>ABC123</span>
            </span>
            <span>order_date</span>
          </>
        ) : (
          <>
            <span>NEW ORDER</span>
            <span>{new Date().toLocaleDateString()}</span>
          </>
        )}
      </div>
      <div className="LineItemContainer">
        {orderItemsJSX}
        <section className="Total">
          {cart.checkoutDone ? (
            <span>TOTAL</span>
          ) : (
            <button className="btn-sm" onClick={handleCheckout}>
              CHECKOUT
            </button>
          )}
          <span>{cart.totalQty}</span>
          <span className="right">${cart.orderTotal}</span>
        </section>
      </div>
    </div>
  );
};

export default Cart;
