/* eslint-disable @typescript-eslint/no-explicit-any */
import { Schema, Document, Model } from 'mongoose';

export class PaginationModel<T extends Document> {
  totalDocs: number | undefined;
  limit: number | undefined = 0;
  totalPages: number | undefined;
  page: number | undefined; // current page
  hasPrevPage: boolean | undefined = false;
  hasNextPage: boolean | undefined = false;
  prevPage: number | undefined;
  nextPage: number | undefined;
  hasMore: boolean | undefined = false;
  docs: T[] = [];
}

export interface Pagination<T extends Document> extends Model<T> {
  paginate(options?: any | undefined, callback?: any | undefined): Promise<PaginationModel<T> | undefined>;
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function mongoosePagination<T extends Document>(schema: Schema<T>) {
  schema.statics.paginate = async function paginate(
    options: any | undefined,
    callback: any | undefined
  ): Promise<PaginationModel<T> | undefined> {
    //MARK: INIT

    const key = options.key ?? '_id';
    const query = options.query ?? {};
    const aggregate = options.aggregate ?? undefined;
    const populate = options.populate ?? undefined;
    const select = options.select ?? undefined;
    const sort = options.sort ?? undefined;
    const projection = options.projection ?? {};
    const forceCountFunction = options.forceCountFunction ?? false;
    const startingAfter = options.startingAfter ?? undefined;
    const endingBefore = options.endingBefore ?? undefined;
    //MARK: PAGING
    const limit = parseInt(options.limit, 10) > 0 ? parseInt(options.limit, 10) : 2;
    let page = 1;
    let skip = 0;

    // eslint-disable-next-line no-prototype-builtins
    if (options.page) {
      page = parseInt(options.page, 10);
      skip = (page - 1) * limit;
    }
    let useCursor = false;
    if (query != undefined && (startingAfter != undefined || endingBefore != undefined)) {
      useCursor = true;
      query[key] = {};
      if (endingBefore != undefined) {
        query[key] = { $lt: endingBefore };
      } else {
        query[key] = { $gt: startingAfter };
      }
    }
    //MARK: COUNTING
    let countPromise;
    if (aggregate != undefined) {
      countPromise = this.aggregate(aggregate).count('count');
    } else {
      if (forceCountFunction == true) {
        countPromise = this.count(query).exec();
      } else {
        countPromise = this.countDocuments(query).exec();
      }
    }
    //MARK: QUERY
    let docsPromise = [];
    let mQuery: any;

    if (aggregate != undefined) {
      mQuery = this.aggregate(aggregate);
      if (select != undefined) {
        mQuery = mQuery.project(select);
      }
    } else {
      mQuery = this.find(query, projection);
      if (select != undefined) {
        mQuery = mQuery.select(select);
      }
      mQuery = mQuery.lean();
      if (populate != undefined) {
        mQuery = mQuery.populate(populate);
      }
    }

    if (sort != undefined) {
      mQuery = mQuery.sort(sort);
    }

    if (limit > 0) {
      if (useCursor) {
        mQuery = mQuery.limit(limit + 1);
      } else {
        mQuery = mQuery.skip(skip);
        mQuery = mQuery.limit(limit);
      }
    }
    docsPromise = mQuery.exec();
    //MARK: PERFORM
    try {
      const values = await Promise.all([countPromise, docsPromise]);
      const [counts, docs] = values;
      let count = 0;
      if (aggregate != undefined) {
        if (counts != undefined && counts[0] != undefined && counts[0]['count'] != undefined) {
          count = counts[0]['count'];
        }
      } else {
        count = counts;
      }
      const meta = new PaginationModel<T>();
      meta.totalDocs = count;
      if (!useCursor) {
        const pages = limit > 0 ? Math.ceil(count / limit) ?? 1 : 0;
        meta.limit = count;
        meta.totalPages = 1;
        meta.page = page;
        meta.hasPrevPage = false;
        meta.hasNextPage = false;
        meta.prevPage = undefined;
        meta.nextPage = undefined;
        if (limit > 0) {
          meta.limit = limit;
          meta.totalPages = pages;
          // Set prev page
          if (page > 1) {
            meta.hasPrevPage = true;
            meta.prevPage = page - 1;
          } else if (page == 1) {
            meta.prevPage = undefined;
          } else {
            meta.prevPage = undefined;
          }
          // Set next page
          if (page < pages) {
            meta.hasNextPage = true;
            meta.nextPage = page + 1;
          } else {
            meta.nextPage = undefined;
          }
        }
        if (limit == 0) {
          meta.limit = 0;
          meta.totalPages = undefined;
          meta.page = undefined;
          meta.prevPage = undefined;
          meta.nextPage = undefined;
          meta.hasPrevPage = false;
          meta.hasNextPage = false;
        }
      } else {
        meta.limit = undefined;
        meta.totalPages = undefined;
        meta.page = undefined;
        meta.hasPrevPage = undefined;
        meta.hasNextPage = undefined;
        const hasMore = docs.length === limit + 1;
        if (hasMore) {
          docs.pop();
        }
        meta.hasMore = hasMore;
        meta.prevPage = undefined;
        meta.nextPage = undefined;
      }
      meta.docs = docs;
      if (callback != undefined) {
        callback(null, meta);
      }
      return meta;
    } catch (error) {
      if (callback != undefined) {
        callback(error);
      }
      return undefined;
    }
  };
}
