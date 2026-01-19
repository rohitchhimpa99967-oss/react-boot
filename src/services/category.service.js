import { STOREGE_KEY } from "../constants/storegekeys"
import { getRequest, setRequest } from "../utils/storegehelper"
import CategoryAdd from "../pages/admin-panel/CategoryAdd";
const getAll =async() =>{
    return getRequest(STOREGE_KEY.CATEGORY);
}

const create =async(data)=>{
    const category =getRequest(STOREGE_KEY.CATEGORY);
    category.push(data);
   setRequest(STOREGE_KEY.CATEGORY, category)
}
const update =async(id,formdata) =>{
    const category =getRequest(STOREGE_KEY.CATEGORY);
    const data =category.map(item =>item.id ==id?formdata:item);
    
   setRequest(STOREGE_KEY.CATEGORY, data)
}

const remove =async(id) =>{
    const role =getRequest(STOREGE_KEY.CATEGORY);
    const data =role.filter(item =>item.id !=id);
    
   setRequest(STOREGE_KEY.CATEGORY, data)
}

export const categoryService ={
 getAll,
 create,
 update,
 remove   
}