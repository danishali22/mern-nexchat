import { useEffect } from "react";

const useErrors = (errors = []) => {


    useEffect(() => {
      if (isError) {
        toast.error(error?.response?.data?.message || "Something went wrong");
      }
    }, [isError, error]);
}

export { useErrors }; 