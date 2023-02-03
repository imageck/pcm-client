import { useEffect } from "react";
import useAxios from "axios-hooks";

export default function useInfiniteScrolling() {
  useEffect(() => {
    let [{ data, loading, error, response}, execute, manualCancel] 
      = useAxios({ method: "GET", url }, { manual: true });
  }, [page])
  return null
}
