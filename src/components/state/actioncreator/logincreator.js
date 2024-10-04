export const addlocalstorage=()=>{
    return (dispatch)=>{
        dispatch({
            type:'add'
        })
    }
}
export const removelocalstorage=()=>{
    return  (dispatch)=>{
        dispatch({
            type:'remove'
        })
    }
}