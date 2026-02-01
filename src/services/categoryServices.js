import { baseUrl } from "./BaseUrl";

export const categoryPost=(values)=>baseUrl.post("Category",values)
export const categoryGet=()=>baseUrl.get("Category")
export const categoryDelete=(id)=>baseUrl.delete(`Category/${id}`)
