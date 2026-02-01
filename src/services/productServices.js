import { baseUrl } from "./BaseUrl";

export const productPost=(values)=>baseUrl.post("Product/create-with-image",values)
export const productGet=()=>baseUrl.get("Product")
export const productDelete=(id)=>baseUrl.delete(`Product/${id}`)
