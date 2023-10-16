import React, { useEffect, useState } from "react";
import { InfiniteQueryObserverResult } from "@tanstack/react-query";

//hook props interface
interface IuseObserverProps {
  threshold?: number | number[];
  hasNextPage: boolean | undefined;
  fetchNextPage: () => Promise<InfiniteQueryObserverResult>;
}

export const useObserver = ({
  threshold = 0.3, //target의 가시성이 얼마나 필요한지 백분율로 표시
  hasNextPage,
  fetchNextPage,
}: IuseObserverProps) => {
  //관찰할 요소
  const [target, setTarget] = useState<HTMLDivElement | null | undefined>(null);

  const observerCallback: IntersectionObserverCallback = (entries) => {
    entries.forEach((entry) => {
      //target이 화면에 관찰되고, 다음페이지가 있다면 다음페이지를 호출
      if (entry.isIntersecting && hasNextPage) {
        fetchNextPage();
      }
    });
  };

  useEffect(() => {
    if (!target) return;

    //ointersection observer 인스턴스 생성
    const observer = new IntersectionObserver(observerCallback, {
      threshold,
    });

    // 타겟 관찰 시작
    observer.observe(target);

    // 관찰 멈춤
    return () => observer.unobserve(target);
  }, [observerCallback, threshold, target]);

  return { setTarget };
};
