// hooks/usePreviewText.ts
import { useState } from "react";

export const usePreviewText = () => {
  // Early Education State
  const [isEarlyEducationActive, setIsEarlyEducationActive] = useState(false);
  const [selectedEarlyName, setSelectedEarlyName] = useState<string | null>(
    null
  );
  const [earlyStartLevel, setEarlyStartLevel] = useState("");
  const [earlyEndLevel, setEarlyEndLevel] = useState("");

  // Primary State
  const [isPrimaryActive, setIsPrimaryActive] = useState(false);
  const [selectedPrimaryName, setSelectedPrimaryName] = useState<string | null>(
    null
  );
  const [primaryStartLevel, setPrimaryStartLevel] = useState("");
  const [primaryEndLevel, setPrimaryEndLevel] = useState("");

  // Junior Secondary State
  const [isJuniorSecondaryActive, setIsJuniorSecondaryActive] = useState(false);
  const [selectedJuniorSecondaryName, setSelectedJuniorSecondaryName] =
    useState<string | null>(null);
  const [juniorStartLevel, setJuniorStartLevel] = useState("");
  const [juniorEndLevel, setJuniorEndLevel] = useState("");

  // Senior Secondary State
  const [isSeniorSecondaryActive, setIsSeniorSecondaryActive] = useState(false);
  const [selectedSeniorSecondaryName, setSelectedSeniorSecondaryName] =
    useState<string | null>(null);
  const [seniorStartLevel, setSeniorStartLevel] = useState("");
  const [seniorEndLevel, setSeniorEndLevel] = useState("");

  const generatePreviewText = () => {
    const parts = [];

    if (
      isEarlyEducationActive &&
      selectedEarlyName &&
      earlyStartLevel &&
      earlyEndLevel
    ) {
      parts.push(`${selectedEarlyName} ${earlyStartLevel}-${earlyEndLevel}`);
    }

    if (
      isPrimaryActive &&
      selectedPrimaryName &&
      primaryStartLevel &&
      primaryEndLevel
    ) {
      parts.push(
        `${selectedPrimaryName} ${primaryStartLevel}-${primaryEndLevel}`
      );
    }

    if (
      isJuniorSecondaryActive &&
      selectedJuniorSecondaryName &&
      juniorStartLevel &&
      juniorEndLevel
    ) {
      parts.push(
        `${selectedJuniorSecondaryName} ${juniorStartLevel}-${juniorEndLevel}`
      );
    }

    if (
      isSeniorSecondaryActive &&
      selectedSeniorSecondaryName &&
      seniorStartLevel &&
      seniorEndLevel
    ) {
      parts.push(
        `${selectedSeniorSecondaryName} ${seniorStartLevel}-${seniorEndLevel}`
      );
    }

    return parts.length > 0 ? parts.join(", ") : "No levels selected";
  };

  return {
    // State
    isEarlyEducationActive,
    setIsEarlyEducationActive,
    selectedEarlyName,
    setSelectedEarlyName,
    earlyStartLevel,
    setEarlyStartLevel,
    earlyEndLevel,
    setEarlyEndLevel,

    isPrimaryActive,
    setIsPrimaryActive,
    selectedPrimaryName,
    setSelectedPrimaryName,
    primaryStartLevel,
    setPrimaryStartLevel,
    primaryEndLevel,
    setPrimaryEndLevel,

    isJuniorSecondaryActive,
    setIsJuniorSecondaryActive,
    selectedJuniorSecondaryName,
    setSelectedJuniorSecondaryName,
    juniorStartLevel,
    setJuniorStartLevel,
    juniorEndLevel,
    setJuniorEndLevel,

    isSeniorSecondaryActive,
    setIsSeniorSecondaryActive,
    selectedSeniorSecondaryName,
    setSelectedSeniorSecondaryName,
    seniorStartLevel,
    setSeniorStartLevel,
    seniorEndLevel,
    setSeniorEndLevel,

    // Methods
    generatePreviewText,
  };
};
