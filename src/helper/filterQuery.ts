import { Request } from "express";
import { Op } from "sequelize";

const filterQuery = (req: Request) => {
  // filter query
  let filters: any = { ...req.query };

  // sort ,page,limit exclude from filters
  const excludeFilters = ["sort", "page", "limit", "fields"];
  excludeFilters.forEach((field) => delete filters[field]);

  // filter where condition
  let whereCondition: any[] = [];
  for (let key in filters) {
    if (typeof filters[key] === "string") {
      whereCondition.push({ [key]: filters[key] });
    } else if (typeof filters[key] === "object") {
      const innerObject = filters[key];
      for (let innerKey in innerObject) {
        whereCondition.push({
          [key]: {
            [Op[innerKey as keyof typeof Op]]: Number(innerObject[innerKey]),
          },
        });
      }
    }
  }

  // convert whereCondition array to object
  filters = whereCondition.reduce((a, b) => Object.assign(a, b), {});

  // queries
  const queries: any = {};

  console.log(req.query);

  // Specify the fields to display
  if (req.query.fields) {
    const fields = (req.query.fields as string).split(",");
    queries.fields = fields;
  }

  // sort query
  if (req.query.sort) {
    const sortItems = (req.query.sort as string).split(",");
    queries.sortBy = sortItems.map((item) => {
      if (item.startsWith("-")) {
        return [item.slice(1), "DESC"];
      } else {
        return [item, "ASC"];
      }
    });
  }

  // pagination query
  if (!req.query.page && !req.query.limit) {
    queries.limit = 100;
    queries.page = 1;
  }

  if (req.query.page || req.query.limit) {
    const { page = 1, limit = 10 } = req.query;
    const skip = (Number(page) - 1) * Number(limit);
    queries.page = Number(page);
    queries.offset = skip;
    queries.limit = Number(limit);
  }

  return { filters, queries };
};

export default filterQuery;
