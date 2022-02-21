import { SearchParamsActionType, SearchQueryAction } from '../types';
import { objectDeepCopy } from '../helpers/object-deep-copy';

export const useSearchParamsReducer = <T>(
  state: T,
  action: SearchQueryAction<T>
) => {
  const actions: { [key in SearchParamsActionType]: () => T } = {
    change: () =>
      objectDeepCopy({
        ...state,
        ...action.payload,
      }),
  };
  if (!actions[action.type]) throw new Error();
  return actions[action.type] && actions[action.type]();
};
