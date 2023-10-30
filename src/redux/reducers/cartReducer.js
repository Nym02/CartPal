import ActionTypes from "../constants/action-types";

const cartProd = localStorage.getItem("cart");
const wishListProd = localStorage.getItem('wishList');

const initialState = {
    cart: cartProd ? JSON.parse(cartProd) : [],
    wishList: wishListProd ? JSON.parse(wishListProd) : [],
}

export const cartReducer = (state = initialState, { type, payload }) => {

    switch (type) {
        case ActionTypes.ADD_TO_CART:
            const { id } = payload;


            const product = state.cart.find((item) => item.id === id);
            if (product) {

                state = {
                    ...state, cart: state.cart.map((item) => {
                        if (item.id === product?.id) {
                            return { ...product, quantity: product.quantity + 1 }
                        }
                        return item;
                    })
                }

                localStorage.setItem("cart", JSON.stringify(state.cart));
            } else {
                state = { ...state, cart: [...state.cart, { ...payload, quantity: 1 }] };


                localStorage.setItem("cart", JSON.stringify(state.cart));
            }


            return state;

        case ActionTypes?.ADD_TO_WISHLIST:
            const wishListProd = state.wishList.find((item) => item?.id === payload?.id);
            if (!wishListProd) {
                state = { ...state, wishList: [...state.wishList, { ...payload, quantity: 1 }] };
            } else {
                state = {
                    ...state, wishList: state.wishList.filter((item) => {
                        if (item.id !== wishListProd?.id) {
                            return item;
                        }
                    })
                }
            }
            localStorage.setItem("wishList", JSON.stringify(state.wishList));
            console.log(state.wishList)
            return state;
        case ActionTypes?.UPDATE_CART_ITEMS:
            localStorage.setItem('cart', JSON.stringify(payload));
            return { ...state, cart: payload };
        case ActionTypes?.INCREMENT_CART_ITEM:
            state = {
                ...state, cart: state.cart.map((item) => {
                    if (item.id === payload?.id) {
                        return { ...payload }
                    }
                    return item;
                })
            };
            localStorage.setItem('cart', JSON.stringify(state.cart));
            return state;
        case ActionTypes?.DECREMENT_CART_ITEM:
            state = {
                ...state, cart: state.cart.map((item) => {
                    if (item.id === payload?.id) {
                        return { ...payload }
                    }
                    return item;
                })
            };
            localStorage.setItem('cart', JSON.stringify(state.cart));
            return state;
        case ActionTypes?.REMOVE_FROM_CART:
            state = {
                ...state, cart: state.cart.filter((item) => {
                    if (item.id !== payload?.id) {
                        return item;
                    }
                })
            };
            localStorage.setItem('cart', JSON.stringify(state.cart));
            return state;
        case ActionTypes?.REMOVE_FROM_WISHLIST:
            console.log(payload)
            state = {
                ...state, wishList: state.wishList.filter((item) => {
                    if (item.id !== payload?.id) {
                        return item;
                    }
                })
            }
            localStorage.setItem('wishList', JSON.stringify(state.wishList));
            return state;
        case ActionTypes?.ADD_ALL_WISHLIST_ITEM_TO_CART:
            // console.log(payload);
            // console.log(state.cart);

            payload.forEach((item1) => {
                // Check if the item1 is already in the cart
                const existingItem = state.cart.find((item2) => item1.id === item2.id);
            
                if (existingItem) {
                    // If the item exists, update its quantity
                    state = {
                        ...state,
                        cart: state.cart.map((item) =>
                            item.id === item1.id
                                ? { ...item, quantity: item.quantity + 1 }
                                : item
                        ),
                    };
                } else {
                    // If the item doesn't exist, add it to the cart
                    state = {
                        ...state,
                        cart: [...state.cart, { ...item1, quantity: 1 }],
                    };
                }
            });
            state = {
                ...state, wishList: []
            }
            localStorage.setItem('cart', JSON.stringify(state.cart));
            localStorage.setItem('wishList', JSON.stringify([]));
            return state;
        default:
            return state;
    }
}

