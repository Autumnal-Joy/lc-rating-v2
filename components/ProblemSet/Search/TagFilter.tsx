import { Badge } from "@/components/ui/badge";
import { useTags } from "@/hooks/useTags";
import { JoinProblem } from "@/types";
import React, { useCallback, useEffect, useState } from "react";
import { FilterFn } from "./type";
import { useGlobalSettingsStore } from "@/hooks/useGlobalSettings";

interface TagFilterProps {
  registerFilter: (newFilter: FilterFn) => void;
  registerReset: (reset: () => void) => void;
}

export const TagFilter = React.memo(
  ({ registerReset, registerFilter }: TagFilterProps) => {
    const [select, setSelect] = useState<Set<string>>(new Set());
    const { language } = useGlobalSettingsStore();
    const isZh = language === "zh";

    const onReset = useCallback(() => {
      setSelect(new Set());
    }, []);

    useEffect(() => {
      registerReset(onReset);
    }, []);

    useEffect(() => {
      registerFilter((prob: JoinProblem) => {
        return select.size === 0 || prob.tags.some((tag) => select.has(tag.id));
      });
    }, [select]);

    const handleChange = useCallback(
      (id: string) => {
        const newSelect = new Set(select);
        if (newSelect.has(id)) {
          newSelect.delete(id);
        } else {
          newSelect.add(id);
        }
        setSelect(newSelect);
      },
      [select]
    );

    const { tagMap = {} } = useTags();

    return (
      <div className="flex flex-wrap justify-center gap-1">
        {Object.values(tagMap).map((tag) => (
          <Badge
            key={tag.id}
            variant={select.has(tag.id) ? "default" : "outline"}
            onClick={handleChange.bind(this, tag.id)}
            className="text-sm"
          >
            {isZh ? tag.zh : tag.en}
          </Badge>
        ))}
      </div>
    );
  }
);
