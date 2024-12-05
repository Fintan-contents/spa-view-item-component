import {
  QueryKey,
  UseMutationResult,
  UseQueryResult,
} from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { useEffect, useMemo, useState } from "react";
import { CsEvent, CsLoadEvent, CsMutateButtonClickEvent } from "..";

type RqAdvancedMutationResult<
  TApiResponse,
  TApiError = unknown,
  TApiRequest = unknown,
  TContext = unknown,
> = UseMutationResult<
  AxiosResponse<TApiResponse, any>,
  TApiError,
  TApiRequest,
  TContext
>;

export class CsRqAdvancedMutateButtonClickEvent<
  TApiRequest,
  TApiResponse,
  TApiError = unknown,
  TContext = unknown,
> extends CsMutateButtonClickEvent<TApiRequest, TApiResponse, TApiError> {
  private mutationResult: RqAdvancedMutationResult<
    TApiResponse,
    TApiError,
    TApiRequest,
    TContext
  >;
  constructor(
    mutationResult: RqAdvancedMutationResult<
      TApiResponse,
      TApiError,
      TApiRequest,
      TContext
    >,
  ) {
    super();
    this.mutationResult = mutationResult;
  }

  get isLoading() {
    // https://tanstack.com/query/v5/docs/framework/react/guides/migrating-to-v5
    // For mutations as well the status has been changed from loading to pending and the isLoading flag has been changed to isPending.
    return this.mutationResult.isPending;
  }

  get isError() {
    return this.mutationResult.isError;
  }

  get isSuccess() {
    return this.mutationResult.isSuccess;
  }

  get response() {
    return this.mutationResult.data?.data;
  }

  get error() {
    return this.mutationResult.error;
  }

  onClick = async () => {
    if (this.apiRequest) {
      await this.mutationResult.mutateAsync(this.apiRequest);
    }
  };
}

export type RqAdvancedQueryResult<
  TApiResponse,
  TApiError = unknown,
> = UseQueryResult<AxiosResponse<TApiResponse, any>, TApiError> & {
  queryKey: QueryKey;
};

export class CsRqAdvancedQueryButtonClickEvent<
  TApiResponse,
  TApiError = unknown,
> extends CsEvent {
  private queryResult: RqAdvancedQueryResult<TApiResponse, TApiError>;

  constructor(queryResult: RqAdvancedQueryResult<TApiResponse, TApiError>) {
    super();
    this.queryResult = queryResult;
  }

  get isLoading() {
    return this.queryResult.isRefetching;
  }

  get isError() {
    return this.queryResult.isError;
  }

  get isSuccess() {
    return this.queryResult.isSuccess;
  }

  get error(): TApiError | null {
    return this.queryResult.error;
  }

  get response(): TApiResponse | undefined {
    return this.queryResult.data?.data;
  }

  onClick = async () => {
    await this.queryResult.refetch();
  };
}

export class CsRqAdvancedQueryLoadEvent<
  TApiResponse,
  TApiError = unknown,
> extends CsLoadEvent {
  private queryResult: RqAdvancedQueryResult<TApiResponse, TApiError>;

  constructor(queryResult: RqAdvancedQueryResult<TApiResponse, TApiError>) {
    super();
    this.queryResult = queryResult;
  }

  get queryKey(): QueryKey {
    return this.queryResult.queryKey;
  }

  get isLoading(): boolean {
    return this.queryResult.isFetching || this.queryResult.isRefetching;
  }

  get isError(): boolean {
    return this.queryResult.isError;
  }

  get isSuccess(): boolean {
    return this.queryResult.isSuccess;
  }

  get response(): TApiResponse | undefined {
    return this.queryResult.data?.data;
  }

  get error(): TApiError | null {
    return this.queryResult.error;
  }

  reload = async () => {
    await this.queryResult.refetch();
  };
}

export class CsRqAdvancedMutateLoadEvent<
  TApiRequest,
  TApiResponse,
  TApiError = unknown,
  TContext = unknown,
> extends CsLoadEvent {
  private mutationResult: RqAdvancedMutationResult<
    TApiResponse,
    TApiError,
    TApiRequest,
    TContext
  >;
  apiRequest?: TApiRequest;
  constructor(
    mutationResult: RqAdvancedMutationResult<
      TApiResponse,
      TApiError,
      TApiRequest,
      TContext
    >,
  ) {
    super();
    this.mutationResult = mutationResult;
  }

  setRequest(data: TApiRequest) {
    this.apiRequest = data;
  }

  get isLoading() {
    // https://tanstack.com/query/v5/docs/framework/react/guides/migrating-to-v5
    // For mutations as well the status has been changed from loading to pending and the isLoading flag has been changed to isPending.
    return this.mutationResult.isPending;
  }

  get isError(): boolean {
    return this.mutationResult.isError;
  }

  get isSuccess(): boolean {
    return this.mutationResult.isSuccess;
  }

  get response(): TApiResponse | undefined {
    return this.mutationResult.data?.data;
  }

  get error(): TApiError | null {
    return this.mutationResult.error;
  }

  start = async () => {
    if (this.apiRequest) {
      await this.mutationResult.mutateAsync(this.apiRequest);
    }
  };
}

export function useCsRqAdvancedMutateButtonClickEvent<
  TApiRequest,
  TApiResponse,
  TApiError,
  TContext = unknown,
>(
  mutationResult: RqAdvancedMutationResult<
    TApiResponse,
    TApiError,
    TApiRequest,
    TContext
  >,
): CsRqAdvancedMutateButtonClickEvent<
  TApiRequest,
  TApiResponse,
  TApiError,
  TContext
> {
  return new CsRqAdvancedMutateButtonClickEvent<
    TApiRequest,
    TApiResponse,
    TApiError,
    TContext
  >(mutationResult);
}

export function useCsRqAdvancedQueryButtonClickEvent<TApiResponse>(
  queryResult: RqAdvancedQueryResult<TApiResponse>,
): CsRqAdvancedQueryButtonClickEvent<TApiResponse> {
  return new CsRqAdvancedQueryButtonClickEvent<TApiResponse>(queryResult);
}

export function useCsRqAdvancedMutateLoadEvent<
  TApiRequest,
  TApiResponse,
  TApiError,
  TContext = unknown,
>(
  mutationResult: RqAdvancedMutationResult<
    TApiResponse,
    TApiError,
    TApiRequest,
    TContext
  >,
  request: TApiRequest,
): CsRqAdvancedMutateLoadEvent<TApiRequest, TApiResponse, TApiError, TContext> {
  const mutateLoadEvent = useMemo(() => {
    return new CsRqAdvancedMutateLoadEvent<
      TApiRequest,
      TApiResponse,
      TApiError,
      TContext
    >(mutationResult);
  }, [mutationResult]);
  const [init, setInit] = useState(false);
  mutateLoadEvent.setRequest(request);
  useEffect(() => {
    (async () => {
      if (!init) {
        setInit(true);
        await mutateLoadEvent.start();
      }
    })();
  }, [init, mutateLoadEvent]);
  return mutateLoadEvent;
}

export function useCsRqAdvancedQueryLoadEvent<TApiResponse>(
  queryResult: RqAdvancedQueryResult<TApiResponse>,
): CsRqAdvancedQueryLoadEvent<TApiResponse> {
  const queryLoadEvent = new CsRqAdvancedQueryLoadEvent<TApiResponse>(
    queryResult,
  );
  return queryLoadEvent;
}
