// import { DataProvider } from "@refinedev/core";
// import axios from "axios";

// const API_URL = "https://amitawt.pythonanywhere.com/awt/group";
// // const API_URL = "https://your-api-url.com/awt/user"; // Update to your user API URL

// // const dataProvider = (baseUrl: string): DataProvider => ({
// // export const dataProvider: DataProvider = {
// export const dataListProvider: DataProvider = {
//   getList: async ({ resource, pagination, filters, sort }) => {
//     const { current, pageSize } = pagination;

//     // Customize the API request to include page and per_page parameters
//     const response = await axios.get(API_URL, {
//       params: {
//         page: current, // Your API's page parameter
//         per_page: pageSize, // Your API's items per page parameter
//         // Add any other necessary filters or sorting here
//         ...filters,
//         sort,
//       },
//     });

//     return {
//       data: response.data.items, // Adjust based on your API response
//       total: response.data.total, // Adjust based on your API response for total count
//     };
//   },
//   // Implement other methods (getOne, create, update, etc.) as needed
// };


import type { AxiosInstance } from "axios";
import { stringify } from "query-string";
import type { DataProvider } from "@refinedev/core";
import { axiosInstance, generateSort, generateFilter } from "@refinedev/simple-rest";

type MethodTypes = "get" | "delete" | "head" | "options";
type MethodTypesWithBody = "post" | "put" | "patch";

function cloneAxiosWithToken(headersFromMeta: any) {
  // Get token from local storage or wherever you store it
  const token = localStorage.getItem('token'); // Adjust according to your token storage

  const headers = {
    ...headersFromMeta,
    Authorization: `Bearer ${token}`, // Add Authorization header
  };
  return headers;
}

function getFirstKeyFromObject(obj: any): any {
  if (obj && Object.keys(obj).length) {
    return obj[Object.keys(obj)[0]];
  }
  return null;
}

export const dataListProvider = (
  apiUrl: string,
  httpClient: AxiosInstance = axiosInstance,
): Omit<
  Required<DataProvider>,
  "createMany" | "updateMany" | "deleteMany"
> => ({
  getList: async ({ resource, pagination, filters, sorters, meta }) => {
    const url = `${apiUrl}/${resource}`;

    const { current = 1, pageSize = 10, mode = "server" } = pagination ?? {};

    const { headers: headersFromMeta, method } = meta ?? {};
    const requestMethod = (method as MethodTypes) ?? "get";

    const queryFilters = generateFilter(filters);

    const query: {
      page?: number;
      per_page?: number;
      _sort?: string;
      _order?: string;
    } = {};

    if (mode === "server") {
      query.page = current;
      query.per_page = current * pageSize;
    }

    const generatedSort = generateSort(sorters);
    if (generatedSort) {
      const { _sort, _order } = generatedSort;
      query._sort = _sort.join(",");
      query._order = _order.join(",");
    }

    const combinedQuery = { ...query, ...queryFilters };
    const urlWithQuery = Object.keys(combinedQuery).length
      ? `${url}?${stringify(combinedQuery)}`
      : url;

    // // Get token from local storage or wherever you store it
    // const token = localStorage.getItem('token'); // Adjust according to your token storage

    // const headers = {
    //   ...headersFromMeta,
    //   Authorization: `Bearer ${token}`, // Add Authorization header
    // };
    const headers = cloneAxiosWithToken(headersFromMeta);

    const { data, headers: responseHeaders } = await httpClient[requestMethod](urlWithQuery, {
      headers,
    });

    let total = +headers["count"];

    console.log("data", data);

    let resArr = [];
    if (data.results && getFirstKeyFromObject(data.results)) {
      resArr = getFirstKeyFromObject(data.results);
    }
    total = data.count;

    return {
      data: resArr,
      total: total || resArr.length,
    };
  },

  getMany: async ({ resource, ids, meta }) => {
    const { headers, method } = meta ?? {};
    const requestMethod = (method as MethodTypes) ?? "get";
    const _headers: any = cloneAxiosWithToken(headers);

    const { data } = await httpClient[requestMethod](
      `${apiUrl}/${resource}?${stringify({ id: ids })}`,
      { headers: _headers },
    );

    return {
      data,
    };
  },

  create: async ({ resource, variables, meta }) => {
    const url = `${apiUrl}/${resource}`;

    const { headers, method } = meta ?? {};
    const requestMethod = (method as MethodTypesWithBody) ?? "post";
    const _headers: any = cloneAxiosWithToken(headers);

    const { data } = await httpClient[requestMethod](url, variables, {
      headers: _headers,
    });

    return {
      data,
    };
  },

  update: async ({ resource, id, variables, meta }) => {
    const url = `${apiUrl}/${resource}/${id}`;

    const { headers, method } = meta ?? {};
    const requestMethod = (method as MethodTypesWithBody) ?? "patch";
    const _headers: any = cloneAxiosWithToken(headers);

    const { data } = await httpClient[requestMethod](url, variables, {
      headers: _headers,
    });

    return {
      data,
    };
  },

  getOne: async ({ resource, id, meta }) => {
    const url = `${apiUrl}/${resource}/${id}`;

    const { headers, method } = meta ?? {};
    const requestMethod = (method as MethodTypes) ?? "get";
    const _headers: any = cloneAxiosWithToken(headers);

    const { data } = await httpClient[requestMethod](url, { headers: _headers, });
    let obj: any = data;
    if (getFirstKeyFromObject(data))
      obj = getFirstKeyFromObject(data);

    return {
      data: obj,
    };
  },

  deleteOne: async ({ resource, id, variables, meta }) => {
    const url = `${apiUrl}/${resource}/${id}`;

    const { headers, method } = meta ?? {};
    const requestMethod = (method as MethodTypesWithBody) ?? "delete";
    const _headers: any = cloneAxiosWithToken(headers);

    const { data } = await httpClient[requestMethod](url, {
      data: variables,
      headers: _headers,
    });

    return {
      data,
    };
  },

  getApiUrl: () => {
    return apiUrl;
  },

  custom: async ({
    url,
    method,
    filters,
    sorters,
    payload,
    query,
    headers,
  }) => {
    let requestUrl = `${url}?`;

    if (sorters) {
      const generatedSort = generateSort(sorters);
      if (generatedSort) {
        const { _sort, _order } = generatedSort;
        const sortQuery = {
          _sort: _sort.join(","),
          _order: _order.join(","),
        };
        requestUrl = `${requestUrl}&${stringify(sortQuery)}`;
      }
    }

    if (filters) {
      const filterQuery = generateFilter(filters);
      requestUrl = `${requestUrl}&${stringify(filterQuery)}`;
    }

    if (query) {
      requestUrl = `${requestUrl}&${stringify(query)}`;
    }
    const _headers: any = cloneAxiosWithToken(headers);

    let axiosResponse;
    switch (method) {
      case "put":
      case "post":
      case "patch":
        axiosResponse = await httpClient[method](url, payload, {
          headers: _headers,
        });
        break;
      case "delete":
        axiosResponse = await httpClient.delete(url, {
          data: payload,
          headers: _headers,
        });
        break;
      default:
        axiosResponse = await httpClient.get(requestUrl, {
          headers,
        });
        break;
    }

    const { data } = axiosResponse;

    return Promise.resolve({ data });
  },
});
