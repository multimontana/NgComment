export interface User{
  id: number;
  parent_id: number;
  date_time: number;
  author_name: string;
  body: string;
  active: boolean;
  children: Array<string>;
}
