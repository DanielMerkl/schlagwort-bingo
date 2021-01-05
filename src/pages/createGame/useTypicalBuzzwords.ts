import { useEffect, useMemo, useState } from "react";

import { TypicalBuzzword } from "../../typing/interface/TypicalBuzzword";
import { Firebase } from "../../firebase/Firebase";

interface ReturnType {
  categories: Array<string>;
  filteredBuzzwords: Array<string>;
}

export const useTypicalBuzzwords = (filter: string | null): ReturnType => {
  const [typicalBuzzwords, setTypicalBuzzwords] = useState<
    Array<TypicalBuzzword>
  >([]);

  useEffect(() => {
    const fetchTypicalBuzzwords = async () => {
      const querySnapshot = await Firebase.firestore()
        .collection("typicalBuzzwords")
        .get();
      const typicalBuzzwords: Array<TypicalBuzzword> = querySnapshot.docs.flatMap(
        (documentData) => {
          const category: string = documentData.id;
          const buzzwords: Array<string> = documentData.get("buzzwords");
          return buzzwords.map((buzzword) => ({ category, value: buzzword }));
        }
      );
      setTypicalBuzzwords(typicalBuzzwords);
    };

    fetchTypicalBuzzwords();
  }, []);

  const categories: Array<string> = useMemo(() => {
    const categoriesWithDuplicates = typicalBuzzwords.map(
      (typicalBuzzword) => typicalBuzzword.category
    );
    return Array.from(new Set(categoriesWithDuplicates));
  }, [typicalBuzzwords]);

  const filteredBuzzwords: Array<string> = useMemo(() => {
    const buzzwordsWithDuplicated = typicalBuzzwords
      .filter((typicalBuzzword) => {
        return filter === null || typicalBuzzword.category === filter;
      })
      .map((typicalBuzzword) => typicalBuzzword.value)
      .sort();
    return Array.from(new Set(buzzwordsWithDuplicated));
  }, [filter, typicalBuzzwords]);

  return { categories, filteredBuzzwords };
};
