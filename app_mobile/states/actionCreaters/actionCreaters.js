import * as actions from "../actionTypes/actionTypes";

export const addCartItem = (product, _quantity) => {
  return (dispatch) => {
    dispatch({ type: actions.CART_ADD, payload: product , quantity: _quantity});
  };
};

export const removeCartItem = (product_id) => {
  return (dispatch) => {
    dispatch({ type: actions.CART_REMOVE, payload: product_id });
  };
};

export const increaseCartItemQuantity = (product_id) => {
  return (dispatch) => {
    dispatch({ type: actions.INCREASE_CART_ITEM_QUANTITY, payload: product_id });
  };
};

export const decreaseCartItemQuantity = (product_id) => {
  return (dispatch) => {
    dispatch({ type: actions.DECREASE_CART_ITEM_QUANTITY, payload: product_id });
  };
};

export const emptyCart = (type) => {
  return (dispatch) => {
    dispatch({ type: actions.EMPTY_CART, payload: type });
  };
};
