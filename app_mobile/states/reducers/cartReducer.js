import * as actions from "../actionTypes/actionTypes";

const reducer = (state = [], action) => {
  let done = false;
  switch (action.type) {
    case actions.CART_ADD:
      console.log(state);
      console.log(action.payload);
      state.map((item, index) => {
        if (item._id === action.payload.id) {
          done = true;
          console.log(item);
          if (item.avaiableQuantity > action.quantity) {
            state[index].quantity = state[index].quantity + action.quantity;
            state[index].avaiableQuantity = state[index].avaiableQuantity - action.quantity;
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
            _id: action.payload.id,
            category: action.payload.category,
            brand: action.payload.brand,
            description: action.payload.description,
            image: action.payload.images[0],
            price: action.payload.price,
            title: action.payload.title,
            rating: action.payload.rating,
            avaiableQuantity: action.payload.stock,
            quantity: action.quantity,
          },
        ];
      }

    case actions.CART_REMOVE:
      return state.filter((item) => item._id !== action.payload);

    case actions.INCREASE_CART_ITEM_QUANTITY:
      if (action.payload.type === "increase") {
        state.map((item, index) => {
          if (item._id === action.payload.id) {
            return (state[index].quantity = state[index].quantity + 1);
          }
        });
      }

    case actions.DECREASE_CART_ITEM_QUANTITY:
      if (action.payload.type === "decrease") {
        state.map((item, index) => {
          if (item._id === action.payload.id) {
            return (state[index].quantity = state[index].quantity - 1);
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
