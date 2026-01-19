import { STOREGE_KEY } from "../constants/storegekeys"
import { getRequest, setRequest } from "../utils/storegehelper"
import ProductAdd from "../pages/admin-panel/ProductAdd";

const getAll =async() =>{
    return getRequest(STOREGE_KEY.PRODUCT);
}

const create =async(data)=>{
    const product =getRequest(STOREGE_KEY.PRODUCT);
    product.push(data);
   setRequest(STOREGE_KEY.PRODUCT, product)
}
const update =async(id,formdata) =>{
    const product =getRequest(STOREGE_KEY.PRODUCT);
    const data =product.map(item =>item.id ==id?formdata:item);
    
   setRequest(STOREGE_KEY.PRODUCT, data)
}

const remove =async(id) =>{
    const product =getRequest(STOREGE_KEY.PRODUCT);
    const data =product.filter(item =>item.id !=id);
    
   setRequest(STOREGE_KEY.PRODUCT, data)
}

export const productService ={
 getAll,
 create,
 update,
 remove   
}