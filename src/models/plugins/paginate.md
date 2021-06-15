## Model.paginate([options], [callback])

### Parameters
- `[options]` {Object}
  - `[query]` {Object} - Query conditions. [Documents](https://docs.mongodb.com/manual/tutorial/query-documents/)
  - `[select]` {Object} - {Object | String} - Fields to return (by default returns all fields). [Documents](http://mongoosejs.com/docs/api.html#query_Query-select)
  - `[sort]` {Object | String} - Sort order. [Documents](http://mongoosejs.com/docs/api.html#query_Query-sort)
  - `[populate]` {Object | String} - Paths which should be populated with other documents. [Documents](http://mongoosejs.com/docs/api.html#query_Query-populate)
  - `[page=1]` {Number},
  - `[limit=10]` {Number}, number of docs per page, default is 10
  - `[key=_id]` {String}, cursor id pagination
  - `[startingAfter]` {String}, A cursor for use in pagination. `startingAfter` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with `obj_foo`, your subsequent call can include `startingAfter=obj_foo` in order to fetch the next page of the list.
  - `[endingBefore]` {String}, A cursor for use in pagination. `endingBefore` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, starting with `obj_bar`, your subsequent call can include `endingBefore=obj_bar` in order to fetch the previous page of the list.
  - `[forceCountFunction=false]` {Boolean} - Set this to true, if you need to support $geo queries.
- `[callback(err, result)]` - The callback is called once pagination results are retrieved or when an error has occurred

### Result value
Promise fulfilled with an Pagination:
```ts
class PaginationModel {
  totalDocs: number | undefined;
  limit: number | undefined = 0;
  totalPages: number | undefined;
  page: number | undefined;
  hasPrevPage: Boolean | undefined = false;
  hasNextPage: Boolean | undefined = false;
  prevPage: number | undefined;
  nextPage: number | undefined;
  hasMore: Boolean | undefined = false;
  docs: any[] = [];
}
```
