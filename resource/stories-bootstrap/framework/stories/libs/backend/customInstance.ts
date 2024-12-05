// custom-instance.ts

import Axios, { AxiosError, AxiosRequestConfig } from "axios";

const BASE_URL: string = process.env.NEXT_PUBLIC_REACT_APP_BACKEND_BASE_URL!.toString();
const backendUrl = `${BASE_URL}`;

export const AXIOS_INSTANCE = Axios.create({ baseURL: backendUrl }); // use your own URL here or environment variable

// add a second `options` argument here if you want to pass extra options to each generated query
export const customInstance = <T>(config: AxiosRequestConfig, options?: AxiosRequestConfig): Promise<T> => {
  const source = Axios.CancelToken.source();
  const promise = AXIOS_INSTANCE({
    ...config,
    ...options,
    cancelToken: source.token,
  }).then(({ data }) => data);

  return promise;
};

// In some case with react-query and swr you want to be able to override the return error type so you can also do it here like this
export type ErrorType<Error> = AxiosError<Error>;

export type BodyType<BodyData> = BodyData;
