import { UseMutationResult, UseQueryResult } from "@tanstack/react-query";
import { useEffect, useMemo, useState } from "react";
import {
  CsMutateButtonClickEvent,
  CsMutateLoadEvent,
  CsQueryButtonClickEvent,
  CsQueryLoadEvent,
} from "../CsEvent";

export class CsRqMutateButtonClickEvent<
  TApiRequest,
  TApiResponse,
  TApiError = unknown,
  TContext = unknown,
> extends CsMutateButtonClickEvent<TApiRequest, TApiResponse, TApiError> {
  private mutationResult: UseMutationResult<
    TApiResponse,
    TApiError,
    TApiRequest,
    TContext
  >;
  constructor(
    mutationResult: UseMutationResult<
      TApiResponse,
      TApiError,
      TApiRequest,
      TContext
    >,
  ) {
    super();
    this.mutationResult = mutationResult;
  }

  get isLoading(): boolean {
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
    return this.mutationResult.data;
  }

  get error(): TApiError | null {
    return this.mutationResult.error;
  }

  onClick = async () => {
    if (this.apiRequest) {
      await this.mutationResult.mutateAsync(this.apiRequest);
    }
  };
}

export class CsRqQueryButtonClickEvent<
  TApiResponse,
  TApiError = unknown,
> extends CsQueryButtonClickEvent<TApiResponse, TApiError> {
  private queryResult: UseQueryResult<TApiResponse, TApiError>;

  constructor(queryResult: UseQueryResult<TApiResponse, TApiError>) {
    super();
    this.queryResult = queryResult;
  }

  get isLoading(): boolean {
    return this.queryResult.isRefetching;
  }

  get isError(): boolean {
    return this.queryResult.isError;
  }

  get isSuccess(): boolean {
    return this.queryResult.isSuccess;
  }

  get response(): TApiResponse | undefined {
    return this.queryResult.data;
  }

  get error(): TApiError | null {
    return this.queryResult.error;
  }

  onClick = async () => {
    await this.queryResult.refetch();
  };
}

export class CsRqQueryLoadEvent<
  TApiResponse,
  TApiError = unknown,
> extends CsQueryLoadEvent<TApiResponse, TApiError> {
  private queryResult: UseQueryResult<TApiResponse, TApiError>;

  constructor(queryResult: UseQueryResult<TApiResponse, TApiError>) {
    super();
    this.queryResult = queryResult;
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
    return this.queryResult.data;
  }

  get error(): TApiError | null {
    return this.queryResult.error;
  }

  reload = async () => {
    await this.queryResult.refetch();
  };
}

export class CsRqMutateLoadEvent<
  TApiRequest,
  TApiResponse,
  TApiError = unknown,
  TContext = unknown,
> extends CsMutateLoadEvent<TApiResponse, TApiError> {
  private mutationResult: UseMutationResult<
    TApiResponse,
    TApiError,
    TApiRequest,
    TContext
  >;
  apiRequest?: TApiRequest;
  constructor(
    mutationResult: UseMutationResult<
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
    return this.mutationResult.data;
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

export function useCsRqMutateButtonClickEvent<
  TApiRequest,
  TApiResponse,
  TApiError,
  TContext = unknown,
>(
  mutationResult: UseMutationResult<
    TApiResponse,
    TApiError,
    TApiRequest,
    TContext
  >,
): CsMutateButtonClickEvent<TApiRequest, TApiResponse, TApiError> {
  return new CsRqMutateButtonClickEvent<
    TApiRequest,
    TApiResponse,
    TApiError,
    TContext
  >(mutationResult);
}

export function useCsRqQueryButtonClickEvent<TApiResponse, TApiError>(
  queryResult: UseQueryResult<TApiResponse, TApiError>,
): CsQueryButtonClickEvent<TApiResponse, TApiError> {
  return new CsRqQueryButtonClickEvent<TApiResponse, TApiError>(queryResult);
}

export function useCsRqMutateLoadEvent<
  TApiRequest,
  TApiResponse,
  TApiError,
  TContext = unknown,
>(
  mutationResult: UseMutationResult<
    TApiResponse,
    TApiError,
    TApiRequest,
    TContext
  >,
  request: TApiRequest,
): CsMutateLoadEvent<TApiResponse, TApiError> {
  const mutateLoadEvent = useMemo(() => {
    return new CsRqMutateLoadEvent<
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

export function useCsRqQueryLoadEvent<TApiResponse>(
  queryResult: UseQueryResult<TApiResponse>,
): CsRqQueryLoadEvent<TApiResponse> {
  const queryLoadEvent = new CsRqQueryLoadEvent<TApiResponse>(queryResult);
  return queryLoadEvent;
}
