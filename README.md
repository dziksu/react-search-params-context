# [POC] React Search Params Context

Hook and context factory to manage search params with possibility to sync URL 

## Getting Started

TODO

## Basic usage (not recommended)

```typescript jsx
  const Example: React.VFC = () => {
    const { values, setValues, resetValues } = useSearchParams({
      sync: true,
      omitEmpty: true,
      defaultValues: {
        page: 1,
        search: 'john',
        age: 24
      }
    });
    
    return (
      <div>
        <p>Page: {values.page}</p>
        <input
          type="number"
          value={values.page}
          onChange={(e) => setValues({ page: e.target?.value || 1 })} 
        /> 
      </div>
    )
  }
```

## Context factory (recommended)

```typescript jsx
  export const {
      Provider: SearchParamsProvider,
      useValueSelector,
      useDebouncedValueSelector,
      useSetValues,
    } = createSearchParamsContext<SearchQueryParams>({
      sync: true,
      omitEmpty: true,
      defaultValues: {
        page: 1,
      },
    });

  // example.tsx
  const Example: React.VFC = () => {
    return (
      <SearchParamsProvider>
        <Filters />
        <Table />
      </SearchParamsProvider>
    )
  }
```
