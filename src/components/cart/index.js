import React, { useContext } from "react";
import { AppContext } from "../../contexts/app_context";
import "./index.css";

const Cart = ({ handleChangeQty, handleCheckout }) => {
  // handleChangeQty -> to add item to cart, change qty, or remove it if qty set to 0

  // handleCheckout

  let { cart } = useContext(AppContext);

  return (
    <div className="Cart">
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
      <div className="OrderItemContainer">
        {/* list of order items */}
        <section>
          {cart.checkoutDone ? (
            <span>TOTAL</span>
          ) : (
            <button className="btn-sm">CHECKOUT</button>
          )}
          <span>qty</span>
          <span className="right">Order Total Price</span>
        </section>
      </div>
    </div>
  );
};

export default Cart;
