

export interface ListParams {
  page?: number;
  limit?: number;
  ordering?: string;
  [key: string]: any;
}


export interface ListResponse<T> {
    results: T[];
    count: number;
    next: number;
    previous: number;
}
