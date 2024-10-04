
const initialstate=localStorage.getItem('token')
const reducer=(state=initialstate,action)=>{
    if(action.type==='add'){
        return true;
    }
    else if(action.type==='remove'){
        return false;
    }
    else{
        return state;
    }
}

export default reducer