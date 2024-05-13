const getResponseFormat = (success: any, msg: any, data: any, err: any = null, statusCode: any = 400) => {
  return {success, message: msg, data, err, statusCode}
}

const getPagingData = (data: any, page: any, limit: any) => {
  const { count: totalItems, rows: items } = data;

  const currentPage = (page > 0) ? +page : 1;
  const totalPages = Math.ceil(totalItems / limit);
  return { totalItems, items, totalPages, currentPage };
};

const getPagination = (page: any, size: any) => {
  if (typeof page !== 'number') {page = parseInt(page)}; 
  if (typeof size !== 'number') {size = parseInt(size)}; 
  const limit = size ? +size : 10;
  const offset = page > 0 ? (page - 1) * limit : 0;
  return { limit, offset };
};

export {
  getPagination, 
  getPagingData, 
  getResponseFormat, 
}