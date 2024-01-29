

const Theme=()=> {
    if(window.matchMedia('(prefers-color-scheme: dark)').matches){
        
        return true;
      }
      else{
      
        return false; 
    }
}

export default Theme