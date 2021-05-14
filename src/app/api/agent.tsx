import axios, { AxiosResponse } from "axios";
import { Activity } from "../models/activity";
import { GraveyardResponse } from "../models/GraveyardResponse";
import { Page } from "../models/Page";
import { RoseRequest } from "../models/RoseRequest";
import { SpiritusResponse } from "../models/SpirirtusResponse";
import { StoryRequest } from "../models/StoryRequest";
import { StoryResponse } from "../models/StoryResponse";

axios.defaults.baseURL = "http://46.101.182.89:8080";

const responseBody = function <T>(response: AxiosResponse<T>) {
  return response.data;
};

const requests = {
  get: function <T>(url: string) {
    return axios.get<T>(url).then(responseBody);
  },
  post: function <T>(url: string, body: {}) {
    return axios.post<T>(url, body).then(responseBody);
  },
  put: function <T>(url: string, body: {}) {
    return axios.put<T>(url, body).then(responseBody);
  },
  del: function <T>(url: string) {
    return axios.delete<T>(url).then(responseBody);
  },
};

const Activities = {
  list: () => requests.get<Activity[]>("/activities"),
  graveyard: () => requests.get<GraveyardResponse[]>("/graveyards"),
  details: (id: string) => requests.get<Activity>(`/activities/${id}`),
  create: (activity: Activity) => requests.post<void>("/activities", activity),
  update: (activity: Activity) =>
    requests.put<void>(`/activities/${activity.id}`, activity),
  delete: (id: string) => requests.del<void>(`/activities/${id}`),
};

const Spiritus = {
  list: () => requests.get<Page<SpiritusResponse>>("/spiritus"),
  popularList: () => requests.get<Page<SpiritusResponse>>("/spiritus/popular"),
};

const Stories = {
  approvedList: (id:number) => requests.get<Page<StoryResponse>>(`/stories/spiritus/${id}`),
  details: (id:number) => requests.get<Page<StoryResponse>>(`/stories/${id}`),
  create: (story: StoryRequest,id: number) => requests.post<void>(`/stories/spiritus/${id}`, story),
};


const Roses = {
  create: (rose: RoseRequest,id: number) => requests.post<void>(`/roses/spiritus/${id}`, rose),
};

const Graveyard = {
  list: () => requests.get<GraveyardResponse[]>("/graveyards"),
};

const agent = {
  Activities,
  Graveyard,
  Spiritus,
  Stories,
  Roses
};

export default agent;
