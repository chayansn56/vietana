type EventMap = {
  "open-emergency": undefined;
};

type EventName = keyof EventMap;

export const events = {
  dispatch<T extends EventName>(event: T, payload?: EventMap[T]) {
    const customEvent = new CustomEvent(event, { detail: payload });
    window.dispatchEvent(customEvent);
  },

  subscribe<T extends EventName>(
    event: T,
    callback: (payload: EventMap[T]) => void
  ) {
    const handler = (e: Event) => {
      const customEvent = e as CustomEvent<EventMap[T]>;
      callback(customEvent.detail);
    };
    window.addEventListener(event, handler);
    return () => window.removeEventListener(event, handler);
  },
};
