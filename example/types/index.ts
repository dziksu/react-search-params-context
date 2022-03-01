export type Gender = 'unknown' | 'Female' | 'Male' | 'Genderless';
export type Status = 'Dead' | 'Alive' | 'unknown';

export type Character = {
  created: Date;
  episode: string[];
  gender: Gender;
  id: number;
  image: string;
  name: string;
  location: { name: string; url: string };
  origin: {
    name: string;
    url: string;
  };
  species: string;
  status: Status;
  type: string;
  url: string;
};

export type Info = {
  count: number;
  next: string;
  pages: string;
  prev: string;
};

export type PaginatedData<TData> = {
  results: Character[];
  info: Info;
};
