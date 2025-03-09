import { Input } from "@/components/ui/input";
import { JoinProblem } from "@/types";
import React, { useCallback, useEffect, useState } from "react";
import { FilterFn } from "./type";

const match = (prob: JoinProblem, keyword: string) => {
  const str = `${prob.contest?.title || ""} ${prob.id} ${prob.title} ${
    prob.solution?.title || ""
  }`;
  return str.toLowerCase().includes(keyword.toLowerCase());
};

interface WordFilterProps {
  registerReset: (reset: () => void) => void;
  registerFilter: (newFilter: FilterFn) => void;
}

export const WordFilter = React.memo(
  ({ registerReset, registerFilter }: WordFilterProps) => {
    const [value, setValue] = useState("");

    const onReset = useCallback(() => {
      setValue("");
    }, []);

    useEffect(() => {
      registerReset(onReset);
    }, []);

    useEffect(() => {
      registerFilter((prob: JoinProblem) => {
        return value === "" || match(prob, value);
      });
    }, [value]);

    const handleChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        setValue(newValue);
      },
      [setValue]
    );

    return (
      <Input
        type="text"
        placeholder="竞赛、题目、题解搜索"
        value={value}
        onChange={handleChange}
      />
    );
  }
);
