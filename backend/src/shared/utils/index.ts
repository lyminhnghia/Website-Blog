import { MessageConst } from 'src/shared';

export const response = (data: any): any => {
  return {
    ...data,
    data: data?.data || null,
    message: data?.message || [MessageConst.OK],
    error: data?.error || null,
  };
};

export const pageFormat = (queryString: any): any => {
  let paging: number = parseInt(queryString?.paging) || 0;
  let page: number = parseInt(queryString?.page) || 1;
  let size: number = parseInt(queryString?.size) || 10;
  return {
    ...queryString,
    paging: paging,
    page: page,
    size: size,
  };
};
