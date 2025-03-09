import type { TagMap } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { fetchApi } from "@/lib/fetch";

export function useTags() {
  const {
    data: tagMap,
    isPending,
    error,
  } = useQuery<TagMap>({
    queryKey: ["tags"],
    queryFn: () =>
      fetchApi(
        "/data/tags.json?t=" +
          (new Date().getTime() / 100000).toFixed(0)
      ).then((res) => res.json()),
  });

  return { tagMap, isPending, error };
}
