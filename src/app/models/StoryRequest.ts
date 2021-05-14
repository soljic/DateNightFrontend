import { ParagraphResponse } from "./ParagraphResponse";

export interface StoryRequest {
    title: string;
    subtitle: string;
    date: Date;
    description: number;
    paragraphs: ParagraphResponse[];

  }