export type TextInputTemplate = {
  id?: number,
  index?: number,
  templateId?: number,
  type?: TemplateType,
  scheme: string,  // Template string
  elements?: TemplateElement[], // elements to populate template
}

export type Template = {
  style: string,
  values: TextInputTemplate[],
}

export type TemplateResponse = Template[];


export type TemplateType = "TOP" |
  "NAME" |
  "DATE" |
  "FAREWELL" |
  "BEREAVED" |
  "BOLD_BOTTOM";


export type TemplateElement = {
  id: number
  value: string
  pattern?: string
}

export type ImageResponse = {
  id?: number;
  url?: string | null;
  height?: number;
  width?: number;
};

export type ObituaryResponse = {
  id: number
  spiritusId: number
  sex: Gender
  religiousImage: number
  style: string
  image: ImageResponse
  templates: TextInputTemplate[]
  elements: TemplateElement[]
}

export type SpiritusShort = {
  id: number;
  name: string;
  maidenName?: string;
  surname: string;
  birth: string;
  death: string;
  claimDate?: string | null;
};

export type SpiritusTableEntries = Array<SpiritusShort>;

export type GetManySpiritusResponseData = {
  totalElements: number;
  totalPages: number;
  size: number;
  content: SpiritusTableEntries;
  number: number;
  sort: {
    sorted: Boolean;
    unsorted: Boolean;
    empty: Boolean;
  };
  numberOfElements: 0;
  pageable: {
    page: number;
    size: number;
    sort: Array<string>;
  };
  first: Boolean;
  last: Boolean;
  empty: Boolean;
};

export type Spiritus = {
  id?: number;
  slug?: string;
  name: string;
  surname: string;
  maidenName: string | null;
  birth: string;
  death: string;
  cemetery?: string;
  location?: MapBoxLocation | null;
};

export type CreateObituary = {
  id?: number;
  religionId?: number;
  texts: Array<CreateObituaryText>;
};

export type UpdateObituary = {
  id: number;
  religionId: number;
  texts: Array<UpdateObituaryText>;
};

export type CreateObituaryText = {
  type: string;
  templateId: number;
  templateLocaleId: number;
  text: string | null;
};

export type UpdateObituaryText = {
  templateId: number;
  templateLocaleId: number;
  text: string | null;
};

export type MapBoxLocation = {
  id?: number;
  address: string;
  longitude: number;
  latitude: number;
  country: string;
};

export type CreateSpiritusRequestBody = {
  spiritus: Spiritus;
  obituary: CreateObituary;
  image: File | null;
};

export type UpdateSpiritusRequestBody = {
  spiritus: Spiritus;
  obituary: UpdateObituary;
};

export type ProfileImage = {
  file: File;
  preview: string;
};

export type SpiritusImagesResponse = {
  id: number | null;
  url: string | null;
  height: number | null;
  width: number | null;
};

export type CreateObituaryFormValues = {
  religionId: number;
  style: string;
  locale: string;
  sex: Gender;
  elements: TemplateElement[];
};

export type UpdateObituaryFormValues = {
  religiousImage: number;
  style: string;
  spiritusId: number;
  elements: TemplateElement[];
};


export type Gender = "M" | "F";
