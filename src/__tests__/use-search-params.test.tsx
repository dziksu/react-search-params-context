import { act, renderHook } from '@testing-library/react-hooks';
import { useSearchParams } from '../hooks/use-search-params';

describe('Basic usage of useSearchParams', () => {
  beforeEach(() => {
    window.history.replaceState(null, '', '/');
  });

  it('setValues method updates hook values and window.location.search params', async () => {
    const defaultValues = {
      name: 'John',
      age: 23,
      isDeleted: true,
      isEmpty: false,
      tags: ['a', 'b', 'c'],
      dates: {
        from: '2022-01',
        to: '2022-02',
      },
    };

    const { result, waitForNextUpdate } = renderHook(() =>
      useSearchParams({
        defaultValues,
      })
    );

    act(() => {
      result.current.setValues({ age: 10, name: 'Monica', isDeleted: true });
    });

    await waitForNextUpdate();

    const windowSearchParams = new URLSearchParams(window.location.search);

    expect(result.current.values).toEqual({
      ...defaultValues,
      age: 10,
      name: 'Monica',
      isDeleted: true,
    });
    expect(windowSearchParams.get('name')).toBe('Monica');
    expect(windowSearchParams.get('age')).toBe('10');
    expect(windowSearchParams.get('isDeleted')).toBe('true');
    expect(windowSearchParams.get('isEmpty')).toBe('false');
    expect(windowSearchParams.get('tags')).toBe(
      encodeURIComponent(JSON.stringify(defaultValues.tags))
    );
    expect(windowSearchParams.get('dates')).toBe(
      encodeURIComponent(JSON.stringify(defaultValues.dates))
    );

    act(() => {
      result.current.setValues({ tags: ['d', 'e'] });
    });

    await waitForNextUpdate();

    const windowSearchParamsNext = new URLSearchParams(window.location.search);
    expect(windowSearchParamsNext.get('tags')).toBe(
      encodeURIComponent(JSON.stringify(['d', 'e']))
    );
  });

  it("disabled sync property won't affect on window.location.search params", async () => {
    const defaultValues = {
      name: 'John',
      age: 23,
      tags: ['a', 'b', 'c'],
    };

    const { result, waitForNextUpdate } = renderHook(() =>
      useSearchParams({
        sync: false,
        defaultValues,
      })
    );

    const windowSearchParamsInitialize = new URLSearchParams(
      window.location.search
    );

    expect(windowSearchParamsInitialize.get('name')).toBeNull();
    expect(windowSearchParamsInitialize.get('age')).toBeNull();

    act(() => {
      result.current.setValues({ age: 10, name: 'Monica' });
    });

    await waitForNextUpdate();

    const windowSearchParams = new URLSearchParams(window.location.search);

    expect(result.current.values).toEqual({
      ...defaultValues,
      age: 10,
      name: 'Monica',
    });
    expect(windowSearchParams.get('name')).toBeNull();
    expect(windowSearchParams.get('age')).toBeNull();
  });

  it('omitEmpty as true, to prevent update window.location.search with empty values', async () => {
    const defaultValues = {
      name: 'John',
      age: 23,
      tags: ['a', 'b', 'c'],
    };

    const { result, waitForNextUpdate } = renderHook(() =>
      useSearchParams({
        omitEmpty: true,
        defaultValues,
      })
    );

    const windowSearchParamsInitialize = new URLSearchParams(
      window.location.search
    );

    expect(windowSearchParamsInitialize.get('name')).toBe('John');
    expect(windowSearchParamsInitialize.get('age')).toBe('23');

    act(() => {
      result.current.setValues({ age: 0, name: '' });
    });

    await waitForNextUpdate();

    const windowSearchParamsUpdated = new URLSearchParams(
      window.location.search
    );

    expect(windowSearchParamsUpdated.get('name')).toBeNull();
    expect(windowSearchParamsUpdated.get('age')).toBe('0');
  });

  it('debouncedMilliseconds as 1 sec to debounce updates', async () => {
    const defaultValues = {
      name: 'John',
      age: 23,
      tags: ['a', 'b', 'c'],
    };

    const { result, waitForNextUpdate } = renderHook(() =>
      useSearchParams({
        debouncedMilliseconds: 500,
        defaultValues,
      })
    );

    const windowSearchParams = new URLSearchParams(window.location.search);

    expect(windowSearchParams.get('name')).toBe('John');
    expect(windowSearchParams.get('age')).toBe('23');

    act(() => {
      result.current.setValues({ name: 'Anna' });
      result.current.setValues({ name: 'Hanna' });
      result.current.setValues({ name: 'Ewa' });
    });

    const windowSearchParamsUpdated = new URLSearchParams(
      window.location.search
    );
    expect(windowSearchParamsUpdated.get('name')).toBe('John');

    await waitForNextUpdate({ timeout: 500 });

    jest.setTimeout(1000);

    const windowSearchParamsUpdated2 = new URLSearchParams(
      window.location.search
    );
    expect(windowSearchParamsUpdated2.get('name')).toBe('Ewa');
  });
});
