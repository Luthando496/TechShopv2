const addDecimals =(number)=>{
    return (Math.round(number * 100) / 100).toFixed(2)
}



export const updateCart=(state)=>{
    // items price
    state.itemsPrice = addDecimals(state.items.reduce((acc, item) =>  item.price * item.qty,0))

    // shipping price
    state.shippingPrice = addDecimals(state.itemsPrice > 100 ? 0 : 10);

    // Calculate the tax price
    state.taxPrice = addDecimals(Number((0.15 * state.itemsPrice).toFixed(2)));

    // Calculate the total price
    state.totalPrice = (
        Number(state.itemsPrice) +
        Number(state.shippingPrice) +
        Number(state.taxPrice)
    ).toFixed(2);

    localStorage.setItem('cart',JSON.stringify(state))
}