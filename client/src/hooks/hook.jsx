import { useEffect } from "react";
import toast from "react-hot-toast";

const useErrors = (errors = []) => {
  useEffect(() => {
    errors.forEach(({error, isError, fallback})=>{
      if (isError) {
        if(fallback) fallback
        else toast.error(error?.response?.data?.message || "Something went wrong");
      }
    })
    }, [errors]);
}

export { useErrors }; 