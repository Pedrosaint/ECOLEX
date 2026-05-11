/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { toast } from "sonner";
import { useCreateRemarkSchemeMutation, useGetRemarkSchemesQuery } from "../api/grading.api";

export interface RemarkRuleRow {
  minScore: string;
  maxScore: string;
  remark: string;
}

const DEFAULT_RULES: RemarkRuleRow[] = [
  { minScore: "70", maxScore: "100", remark: "" },
  { minScore: "50", maxScore: "69", remark: "" },
  { minScore: "0",  maxScore: "49", remark: "" },
];

export function useRemarkScheme() {
  const [schemeName, setSchemeName] = useState("");
  const [rules, setRules] = useState<RemarkRuleRow[]>(DEFAULT_RULES);

  const { data: schemesData, isLoading: loadingSchemes } = useGetRemarkSchemesQuery();
  const schemes = schemesData?.data ?? [];

  const [createRemarkScheme, { isLoading: isSaving }] = useCreateRemarkSchemeMutation();

  const updateRule = (index: number, field: keyof RemarkRuleRow, value: string) => {
    setRules((prev) =>
      prev.map((r, i) => (i === index ? { ...r, [field]: value } : r))
    );
  };

  const addRule = () => {
    setRules((prev) => [...prev, { minScore: "", maxScore: "", remark: "" }]);
  };

  const removeRule = (index: number) => {
    setRules((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    if (!schemeName.trim()) {
      toast.error("Scheme name is required");
      return;
    }
    const incomplete = rules.some(
      (r) => r.minScore === "" || r.maxScore === "" || !r.remark.trim()
    );
    if (incomplete) {
      toast.error("All rule fields (min score, max score, remark) are required");
      return;
    }
    try {
      const res = await createRemarkScheme({
        name: schemeName.trim(),
        rules: rules.map((r) => ({
          minScore: Number(r.minScore),
          maxScore: Number(r.maxScore),
          remark: `{studentName} ${r.remark.trim()}`,
        })),
      }).unwrap();
      toast.success(res.message || "Remark scheme created");
      setSchemeName("");
      setRules(DEFAULT_RULES);
    } catch (e: any) {
      toast.error(e?.data?.message || "Failed to create remark scheme");
    }
  };

  return {
    schemeName,
    setSchemeName,
    rules,
    isSaving,
    schemes,
    loadingSchemes,
    updateRule,
    addRule,
    removeRule,
    handleSubmit,
  };
}
