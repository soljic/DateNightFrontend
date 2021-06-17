import { RoseResponse } from "./RoseResponse";
import { StoryResponse } from "./StoryResponse";
import { ImageResponse } from "./ImageResponse";

export interface SpiritusResponse {
    id: number;
    name: string;
    surname: string;
    birth: string;
    death: string;
    longitude: number;
    latitude: number;
    guardians: number[];
    roses: RoseResponse[];
    stories: StoryResponse[];
    images: ImageResponse[];
    status: string;


  }

