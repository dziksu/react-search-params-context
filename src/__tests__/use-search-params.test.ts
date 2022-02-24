import { act, renderHook } from '@testing-library/react-hooks';
import { useSearchParams } from '..';

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

    const { result, waitFor } = renderHook(() =>
      useSearchParams({
        defaultValues,
      })
    );

    act(() => {
      result.current.setValues({ age: 10, name: 'Monica', isDeleted: true });
    });

    await waitFor(() => result.all.length === 2);

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

    await waitFor(() => result.all.length === 3);

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

    const { result, waitFor } = renderHook(() =>
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

    await waitFor(() => result.all.length === 2);

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

    const { result, waitFor } = renderHook(() =>
      useSearchParams({
        sync: true,
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

    await waitFor(() => result.all.length === 2);

    const windowSearchParamsUpdated = new URLSearchParams(
      window.location.search
    );

    expect(windowSearchParamsUpdated.get('name')).toBeNull();
    expect(windowSearchParamsUpdated.get('age')).toBe('0');
  });
});
