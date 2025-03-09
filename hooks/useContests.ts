import type { ContestMap } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { fetchApi } from "@/lib/fetch";

export function useContests() {
  const {
    data: contestMap,
    isPending,
    error,
  } = useQuery<ContestMap>({
    queryKey: ["contests"],
    queryFn: () =>
      fetchApi(
        "/data/contests.json?t=" +
          (new Date().getTime() / 100000).toFixed(0)
      ).then((res) => res.json()),
  });

  return { contestMap, isPending, error };
}
