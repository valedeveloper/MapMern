export const getData=async({keyword,method})=>{ 
    const END_POINT=`http://localhost:8000/${keyword}`
    const res = await fetch(END_POINT);
    const data = await res.json();
    return data
}