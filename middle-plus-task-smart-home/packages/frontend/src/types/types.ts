export interface formData {
  username: string;
  password: string;
}

export type device = {
  type: string;
  name: string;
  id: string;
  room: Record<string, number>;
  params: Record<string, number | boolean>;
};

export type devices = device[];

export type deviceInterface = Record<
  string,
  Record<string, string | boolean | number>
>;


export interface TranslationMap {
  [key: string]: string;
}

export interface RangeConfig {
  [key: string]: Record<string, number>;
}