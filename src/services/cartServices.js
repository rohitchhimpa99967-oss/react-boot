import { baseUrl } from "./BaseUrl";

export const getCartItems=()=> baseUrl.get("Cart/me")
export const cartItemDelete=(values)=> baseUrl.delete(`Cart/item/${values}`)
export const cartItemEdit=(values)=> baseUrl.put(`Cart/item/${values}`)