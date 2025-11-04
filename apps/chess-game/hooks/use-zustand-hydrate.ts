"use client";

import { useEffect, useRef } from "react";
import type { StoreApi, UseBoundStore } from "zustand";

const HYDRATE_CACHE = new WeakMap<object, boolean>();

export function useZustandHydrate<
  TState,
  TStore extends UseBoundStore<StoreApi<TState>> = UseBoundStore<
    StoreApi<TState>
  >,
  TSelected extends keyof TState = keyof TState
>(
  store: TStore,
  selector: (state: TState) => TState[TSelected],
  value: TState[TSelected]
) {
  const hydratedRef = useRef(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (hydratedRef.current) return;

    if (HYDRATE_CACHE.get(store)) return;

    let key: keyof TState | null = null;

    const current = selector(store.getState());

    if (JSON.stringify(current) === JSON.stringify(value)) {
      HYDRATE_CACHE.set(store, true);
      return;
    }

    const proxy = new Proxy(
      {},
      {
        get: (_, prop: string) => {
          key = prop as keyof TState;
          return undefined;
        },
      }
    );

    selector(proxy as TState);

    if (!key) {
      return;
    }
    store.setState({
      [key as keyof TState]: value,
    } as unknown as Partial<TState>);
    hydratedRef.current = true;
  }, [store, selector, value]);
}
