import axios from "axios";
import React from "react";
import { useContext } from "react";
import { AppContext } from "../../contexts/app_context";
import "./index.css";

const CartItem = ({ cartItem, checkoutDone }) => {
  const { setCart } = useContext(AppContext);

  const handleChangeQty = async (itemId, newQty) => {
    let response = await axios({
      method: "PUT",
      url: `/change_qty`,
      data: {
        itemId,
        newQty,
      },
    });
    setCart(response.data);
  };

  return (
    <div className={"LineItem"}>
      <div className="flex-ctr-ctr">{cartItem.item.emoji}</div>
      <div className="flex-ctr-ctr flex-col">
        <span className="align-ctr">{cartItem.item.name}</span>
        <span>{cartItem.item.price.toFixed(2)}</span>
      </div>
      <div
        className={"qty"}
        style={{ justifyContent: checkoutDone && "center" }}
      >
        {!checkoutDone ? (
          <button
            className="btn-xs"
            onClick={() => handleChangeQty(cartItem.item._id, cartItem.qty - 1)}
          >
            −
          </button>
        ) : null}
        <span>{cartItem.qty}</span>
        {!checkoutDone ? (
          <button
            className="btn-xs"
            onClick={() => handleChangeQty(cartItem.item._id, cartItem.qty + 1)}
          >
            +
          </button>
        ) : null}
      </div>
      <div className={"extPrice"}>${cartItem.totPrice.toFixed(2)}</div>
    </div>
  );
};

export default CartItem;
