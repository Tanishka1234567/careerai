import { useMutation, useQuery } from "@tanstack/react-query";
import type { QuizAnswer } from "../backend.d";
import { useActor } from "./useActor";

export function useGetQuestions() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["questions"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getQuestions();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetAllCareerPaths() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["careerPaths"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllCareerPaths();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useSubmitAnswers() {
  const { actor } = useActor();
  return useMutation({
    mutationFn: async ({
      answers,
      recommendedJob,
    }: {
      answers: QuizAnswer[];
      recommendedJob: string;
    }) => {
      if (!actor) throw new Error("No actor");
      return actor.submitAnswers(answers, recommendedJob);
    },
  });
}
