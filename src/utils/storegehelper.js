export const setRequest =(key,data)=>{
  localStorage.setItem(key,JSON.stringify(data));
}

export const getRequest =(key)=>{
    try
    {
    return  JSON.parse(localStorage.getItem(key)) ||[]
    }
    catch{
        return []
    }
}