import {
  useCsRqMutateButtonClickEvent,
  useCsRqMutateLoadEvent,
  useCsRqQueryButtonClickEvent,
  useCsRqQueryLoadEvent,
} from "@/framework/logics/react-query/CsRQEvent";
import { describe, expect, it, jest } from "@jest/globals";
import { UseMutationResult, UseQueryResult } from "@tanstack/react-query";
import { renderHook } from "@testing-library/react";

/**
 * CsRqMutateButtonClickEventクラスのテスト
 * ※対象外※
 * (queryResultの結果をそのままreturnしているだけのため、テスト不要)
 */

/**
 * CsRqQueryButtonClickEventクラスのテスト
 * ※対象外※
 * (queryResultの結果をそのままreturnしているだけのため、テスト不要)
 */

/**
 * CsRqQueryLoadEventクラスのテスト
 * ※対象外※
 * (queryResultの結果をそのままreturnしているだけのため、テスト不要)
 */

/**
 * CsRqMutateLoadEventクラスのテスト
 * ※対象外※
 * (queryResultの結果をそのままreturnしているだけのため、テスト不要)
 */

/**
 * useCsRqMutateButtonClickEventメソッドのテスト
 */
describe("useCsRqMutateButtonClickEventメソッドのテスト", () => {
  it("mutationResultを正しく返すこと", () => {
    const mutationResult: UseMutationResult<any, any, any, any> = {
      mutateAsync: jest.fn(),
      isPending: false,
      isError: false,
      isSuccess: false,
      data: undefined,
      error: null,
    } as any;

    const { result } = renderHook(() =>
      useCsRqMutateButtonClickEvent(mutationResult),
    );

    expect(result.current.isLoading).toBe(false);
    expect(result.current.isError).toBe(false);
    expect(result.current.isSuccess).toBe(false);
    expect(result.current.response).toBeUndefined();
    expect(result.current.error).toBeNull();
  });

  it("onClickメソッドが正しく動作すること", async () => {
    const mutateAsync = jest.fn();
    const mutationResult: UseMutationResult<any, any, any, any> = {
      mutateAsync,
      isPending: false,
      isError: false,
      isSuccess: false,
      data: undefined,
      error: null,
    } as any;

    const { result } = renderHook(() =>
      useCsRqMutateButtonClickEvent(mutationResult),
    );
    const event = result.current;
    event.setRequest({ key: "value" });
    await event.onClick();

    expect(mutateAsync).toHaveBeenCalled();
  });

  it("setRequestメソッドが正しく動作すること", () => {
    const mutationResult: UseMutationResult<any, any, any, any> = {
      mutateAsync: jest.fn(),
      isPending: false,
      isError: false,
      isSuccess: false,
      data: undefined,
      error: null,
      request: undefined,
    } as any;

    const { result } = renderHook(() =>
      useCsRqMutateButtonClickEvent(mutationResult),
    );

    const request = { key: "value" };
    result.current.setRequest(request);

    expect(result.current.apiRequest).toBe(request);
  });
});

/**
 * useCsRqQueryButtonClickEventメソッドのテスト
 */
describe("useCsRqQueryButtonClickEventメソッドのテスト", () => {
  it("queryResultを正しく返すこと", () => {
    const queryResult: UseQueryResult<any, any> = {
      isRefetching: false,
      isError: false,
      isSuccess: false,
      data: undefined,
      error: null,
      refetch: jest.fn(),
    } as any;

    const { result } = renderHook(() =>
      useCsRqQueryButtonClickEvent(queryResult),
    );

    expect(result.current.isLoading).toBe(false);
    expect(result.current.isError).toBe(false);
    expect(result.current.isSuccess).toBe(false);
    expect(result.current.response).toBeUndefined();
    expect(result.current.error).toBeNull();
  });

  it("onClickメソッドが正しく動作すること", async () => {
    const refetch = jest.fn();
    const queryResult: UseQueryResult<any, any> = {
      isRefetching: false,
      isError: false,
      isSuccess: false,
      data: undefined,
      error: null,
      refetch,
    } as any;

    const { result } = renderHook(() =>
      useCsRqQueryButtonClickEvent(queryResult),
    );

    await result.current.onClick();

    expect(refetch).toHaveBeenCalled();
  });
});

/**
 * useCsRqMutateLoadEventメソッドのテスト
 */
describe("useCsRqMutateLoadEventメソッドのテスト", () => {
  it("mutationResultを正しく返すこと", () => {
    const mutationResult: UseMutationResult<any, any, any, any> = {
      mutateAsync: jest.fn(),
      isPending: false,
      isError: false,
      isSuccess: false,
      data: undefined,
      error: null,
    } as any;

    const request = { key: "value" };

    const { result } = renderHook(() =>
      useCsRqMutateLoadEvent(mutationResult, request),
    );

    expect(result.current.isLoading).toBe(false);
    expect(result.current.isError).toBe(false);
    expect(result.current.isSuccess).toBe(false);
    expect(result.current.response).toBeUndefined();
    expect(result.current.error).toBeNull();
  });

  it("startメソッドが正しく動作すること", async () => {
    const mutateAsync = jest.fn();
    const mutationResult: UseMutationResult<any, any, any, any> = {
      mutateAsync,
      isPending: false,
      isError: false,
      isSuccess: false,
      data: undefined,
      error: null,
    } as any;

    const request = { key: "value" };

    const { result } = renderHook(() =>
      useCsRqMutateLoadEvent(mutationResult, request),
    );

    await result.current.start();

    expect(mutateAsync).toHaveBeenCalledWith(request);
  });
});

/**
 * useCsRqQueryLoadEventメソッドのテスト
 */
describe("useCsRqQueryLoadEventメソッドのテスト", () => {
  it("queryResultを正しく返すこと", () => {
    const queryResult: UseQueryResult<any, any> = {
      isFetching: false,
      isRefetching: false,
      isError: false,
      isSuccess: false,
      data: undefined,
      error: null,
      refetch: jest.fn(),
    } as any;

    const { result } = renderHook(() => useCsRqQueryLoadEvent(queryResult));

    expect(result.current.isLoading).toBe(false);
    expect(result.current.isError).toBe(false);
    expect(result.current.isSuccess).toBe(false);
    expect(result.current.response).toBeUndefined();
    expect(result.current.error).toBeNull();
  });

  it("reloadメソッドが正しく動作すること", async () => {
    const refetch = jest.fn();
    const queryResult: UseQueryResult<any, any> = {
      isFetching: false,
      isRefetching: false,
      isError: false,
      isSuccess: false,
      data: undefined,
      error: null,
      refetch,
    } as any;

    const { result } = renderHook(() => useCsRqQueryLoadEvent(queryResult));

    await result.current.reload();

    expect(refetch).toHaveBeenCalled();
  });
});
