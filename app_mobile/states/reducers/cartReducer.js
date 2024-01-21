import * as actions from "../actionTypes/actionTypes";

const reducer = (state = [], action) => {
  let done = false;
  switch (action.type) {
    case actions.CART_ADD:
      // console.log(state);
      // console.log(action.payload);
      state.map((item, index) => {
        if (item._product_id === action.payload.product_id) {
          done = true;
          // console.log(item);
          if (item._avaiableQuantity > action.quantity) {
            state[index]._quantity = state[index]._quantity + action.quantity;
            state[index]._avaiableQuantity = state[index]._avaiableQuantity - action.quantity;
          } else {
            console.log("...");
          }

          return state;
        }
      });
      if (!done) {
        return [
          ...state,
          {
            _product_id: action.payload.product_id,
            _category_name: action.payload.category_name,
            _brand_name: action.payload.brand_name,
            _product_detail: action.payload.product_detail,
            _image: action.payload.product_image,
            _price: action.payload.price_in_store,
            _title: action.payload.product_name,
            _rating: action.payload.rating_score,
            _avaiableQuantity: action.payload.store_qty,
            _quantity: action.quantity,
          },
        ];
      }

    case actions.CART_REMOVE:
      return state.filter((item) => item._product_id !== action.payload);

    case actions.INCREASE_CART_ITEM_QUANTITY:
      if (action.payload.type === "increase") {
        state.map((item, index) => {
          if (item._product_id === action.payload.product_id) {
            return (state[index]._quantity = state[index]._quantity + 1);
          }
        });
      }

    case actions.DECREASE_CART_ITEM_QUANTITY:
      if (action.payload.type === "decrease") {
        state.map((item, index) => {
          if (item._product_id === action.payload.product_id) {
            return (state[index]._quantity = state[index]._quantity - 1);
          }
        });
      }
    case actions.EMPTY_CART:
      if (action.payload === "empty") {
        state.splice(0, state.length);
        return state;
      }

    default:
      return state;
  }
};

export default reducer;
