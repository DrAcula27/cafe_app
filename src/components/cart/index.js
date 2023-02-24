import React from "react";
import "./index.css";

const Cart = ({ handleChangeQty, handleCheckout }) => {
  // handleChangeQty -> to add item to cart, change qty, or remove it if qty set to 0

  // handleCheckout

  let checkoutDone = false;

  return (
    <div className="Cart">
      <div className="SectionHeading">
        {checkoutDone ? (
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
          {checkoutDone ? (
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
