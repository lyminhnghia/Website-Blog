import { MessageConst } from 'src/shared';

export const response = (data: any): Promise<object> => {
  return {
    ...data,
    data: data?.data || null,
    message: data?.message || [MessageConst.OK],
    error: data?.error || null,
  };
};
