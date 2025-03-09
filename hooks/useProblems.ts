import type { ProblemMap } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { fetchApi } from "@/lib/fetch";

export function useProblems() {
  const {
    data: problemMap,
    isPending,
    error,
  } = useQuery<ProblemMap>({
    queryKey: ["problems"],
    queryFn: () =>
      fetchApi(
        "/data/problems.json?t=" +
          (new Date().getTime() / 100000).toFixed(0)
      ).then((res) => res.json()),
  });

  return { problemMap, isPending, error };
}
