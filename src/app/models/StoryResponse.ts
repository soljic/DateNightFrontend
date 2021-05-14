import { ParagraphResponse } from "./ParagraphResponse";

export interface StoryResponse {
    id: number;
    name: string;
    surname: string;
    date: Date;
    description: number;
    images: string[];
    paragraphs: ParagraphResponse[];

  }