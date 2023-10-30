import ActionTypes from "../constants/action-types"

export const setCartProducts = (product) => {
    return {
        type: ActionTypes.ADD_TO_CART,
        payload: product
    }
}

export const updateCartItems = (product) => {
    return {
        type: ActionTypes.UPDATE_CART_ITEMS,
        payload: product
    }
}

export const incrementCartItem = (product) => {
    return {
        type: ActionTypes.INCREMENT_CART_ITEM,
        payload: product
    }
}

export const decrementCartItem = (product) => {
    return {
        type: ActionTypes.DECREMENT_CART_ITEM,
        payload: product
    }
}


export const setWishListProduct = (product) => {
    return {
        type: ActionTypes?.ADD_TO_WISHLIST,
        payload: product
    }
}

export const removeCartItem = (product) => {
    return {
        type: ActionTypes?.REMOVE_FROM_CART,
        payload: product
    }
}

export const removeWishlistItem = (product) => {
    return {
        type: ActionTypes?.REMOVE_FROM_WISHLIST,
        payload: product
    }
}

export const addWishlistItemIntoCart = (products) => {
    return {
        type: ActionTypes?.ADD_ALL_WISHLIST_ITEM_TO_CART,
        payload: products
    }
}