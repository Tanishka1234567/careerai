import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Header {
    value: string;
    name: string;
}
export interface QuizAnswer {
    questionId: bigint;
    selectedOption: bigint;
}
export interface TransformationOutput {
    status: bigint;
    body: Uint8Array;
    headers: Array<http_header>;
}
export interface TransformationInput {
    context: Uint8Array;
    response: http_request_result;
}
export interface CareerPath {
    title: string;
    collegeRecommendations: Array<string>;
    skillMap: Array<string>;
}
export interface QuizResult {
    recommendedJob: string;
    careerScore: Array<bigint>;
    resultId: string;
    timestamp: bigint;
}
export interface Question {
    id: bigint;
    text: string;
    options: Array<string>;
}
export interface http_header {
    value: string;
    name: string;
}
export interface http_request_result {
    status: bigint;
    body: Uint8Array;
    headers: Array<http_header>;
}
export interface backendInterface {
    addQuestion(question: Question): Promise<void>;
    fetchAiResponse(endpoint: string, headers: Array<Header>, body: string): Promise<string>;
    getAllCareerPaths(): Promise<Array<CareerPath>>;
    getPredefinedPath(key: bigint): Promise<CareerPath>;
    getQuestions(): Promise<Array<Question>>;
    getQuizResult(user: Principal): Promise<QuizResult>;
    getUserAnswers(): Promise<Array<string>>;
    hasQuizResults(): Promise<boolean>;
    submitAnswers(answers: Array<QuizAnswer>, recommendedJob: string): Promise<void>;
    transform(input: TransformationInput): Promise<TransformationOutput>;
}
