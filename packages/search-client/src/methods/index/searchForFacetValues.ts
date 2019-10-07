import { RequestOptions } from '@algolia/transporter-types';
import { SearchIndex } from '../../SearchIndex';
import { Method } from '@algolia/requester-types';
import { ConstructorOf } from '@algolia/support';
import { SearchForFacetValuesResponse } from '../types/SearchForFacetValuesResponse';
import { SearchOptions } from '../types/SearchOptions';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const searchForFacetValues = <TSearchIndex extends ConstructorOf<SearchIndex>>(
  base: TSearchIndex
) => {
  return class extends base implements HasSearchForFacetValues {
    public searchForFacetValues(
      facetName: string,
      facetQuery: string,
      requestOptions?: RequestOptions & SearchOptions
    ): Promise<SearchForFacetValuesResponse> {
      return this.transporter.read(
        {
          method: Method.Post,
          path: `1/indexes/${this.indexName}/facets/${facetName}/query`,
          data: {
            facetQuery,
          },
          cacheable: true,
        },
        requestOptions
      );
    }
  };
};

export type HasSearchForFacetValues = SearchIndex & {
  readonly searchForFacetValues: (
    facetName: string,
    facetQuery: string,
    requestOptions?: RequestOptions & SearchOptions
  ) => Promise<SearchForFacetValuesResponse>;
};
