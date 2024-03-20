export interface PaginationList<T> {
  data: T[];
  page: number;
  per_page: number;
  support: Support;
  total: number;
  total_pages: number;
}

interface Support {
  text: string;
  url: string;
}
