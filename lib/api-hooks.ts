import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then(res => res.json());

export function useExam(examId: number) {
  const { data, error, isLoading } = useSWR(`/api/exam/${examId}`, fetcher);

  return {
    exam: data,
    isLoading,
    isError: error,
  };
}