"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bulkDeleteBloodDonar = exports.uploadDonarFile = exports.bulkCreateBloodDonar = exports.deleteBloodDonarById = exports.updateBloodDonarById = exports.createBloodDonar = exports.getSingleBloodDonarById = exports.getAllBloodDonars = void 0;
const donar_model_1 = __importDefault(require("../models/donar.model"));
const http_errors_1 = __importDefault(require("http-errors"));
const history_model_1 = __importDefault(require("../models/history.model"));
const filterQuery_1 = __importDefault(require("../helper/filterQuery"));
const crypto_1 = __importDefault(require("crypto"));
const csvtojson_1 = __importDefault(require("csvtojson"));
const fs_1 = require("fs");
const helper_1 = require("../helper/helper");
const getAllBloodDonars = (req) => __awaiter(void 0, void 0, void 0, function* () {
    // filter query
    const { queries, filters } = (0, filterQuery_1.default)(req);
    // get all bloods
    const { count, rows: donars } = yield donar_model_1.default.findAndCountAll({
        where: Object.assign({}, filters),
        order: queries.sortBy,
        attributes: queries.fields,
        // limit: queries.limit,
        offset: queries.offset,
    });
    // if no blood found
    if (!count)
        throw (0, http_errors_1.default)(400, "Couldn't find any donar data.");
    // page & limit
    const page = queries.page;
    const limit = queries.limit;
    // pagination object
    const pagination = {
        totalDocuments: count,
        totalPages: Math.ceil(count / limit),
        currentPage: page,
        previousPage: page > 1 ? page - 1 : null,
        nextPage: page < Math.ceil(count / limit) ? page + 1 : null,
    };
    return { count, donars, pagination };
});
exports.getAllBloodDonars = getAllBloodDonars;
const getSingleBloodDonarById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    // find blood donar by id
    const donar = yield donar_model_1.default.findByPk(id);
    // if donar data not found
    if (!donar)
        throw (0, http_errors_1.default)(400, "Couldn't find any donar data.");
    return donar;
});
exports.getSingleBloodDonarById = getSingleBloodDonarById;
const createBloodDonar = (req) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    const { name, phone, bloodGroup } = req.body;
    // name validation
    if (!name)
        throw http_errors_1.default.BadRequest("Name is required.");
    // phone validation
    if (!phone)
        throw http_errors_1.default.BadRequest("Phone number is required.");
    // blood group validation
    if (!bloodGroup)
        throw http_errors_1.default.BadRequest("Blood group is required.");
    // check donar phone number
    const existingDonar = yield donar_model_1.default.findOne({
        where: { phone: req.body.phone },
    });
    //  donar already exists
    if (existingDonar)
        throw (0, http_errors_1.default)(404, "Phone number already exists.");
    // create donar data
    const result = yield donar_model_1.default.create(Object.assign(Object.assign({}, req.body), { id: crypto_1.default.randomUUID(), lastEditedBy: (_a = req === null || req === void 0 ? void 0 : req.me) === null || _a === void 0 ? void 0 : _a.email, lastDonationDate: ((_b = req === null || req === void 0 ? void 0 : req.body) === null || _b === void 0 ? void 0 : _b.lastDonationDate)
            ? (_c = req === null || req === void 0 ? void 0 : req.body) === null || _c === void 0 ? void 0 : _c.lastDonationDate
            : null }));
    return result;
});
exports.createBloodDonar = createBloodDonar;
const updateBloodDonarById = (req) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    const id = req.params.id;
    // find donar by id
    const donarData = yield donar_model_1.default.findByPk(id);
    // if donar data not found
    if (!donarData)
        throw (0, http_errors_1.default)(400, "Couldn't find any donar data.");
    // update options
    const updateOptions = Object.assign(Object.assign({}, req.body), { lastEditedBy: (_a = req === null || req === void 0 ? void 0 : req.me) === null || _a === void 0 ? void 0 : _a.email });
    // update donar data
    yield donar_model_1.default.update(updateOptions, {
        where: {
            id,
        },
        // check validation for update
    });
    // if have donar Last donation date then add it to history
    if ((_b = req === null || req === void 0 ? void 0 : req.body) === null || _b === void 0 ? void 0 : _b.lastDonationDate) {
        // create history data
        yield history_model_1.default.create({
            name: donarData.name,
            bloodGroup: donarData.bloodGroup,
            lastDonationDate: req.body.lastDonationDate,
            donarId: id,
            id: crypto_1.default.randomUUID(),
            phone: donarData.phone,
            editedBy: (_c = req === null || req === void 0 ? void 0 : req.me) === null || _c === void 0 ? void 0 : _c.email,
        });
    }
    // find updated data
    const donar = yield donar_model_1.default.findByPk(id);
    return donar;
});
exports.updateBloodDonarById = updateBloodDonarById;
const deleteBloodDonarById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    // find donar by id
    const donar = yield donar_model_1.default.findByPk(id);
    // if donar data not found
    if (!donar)
        throw (0, http_errors_1.default)(400, "Couldn't find any donar data.");
    // data  delete from database
    yield donar.destroy({
        where: { id },
    });
    return donar;
});
exports.deleteBloodDonarById = deleteBloodDonarById;
const bulkCreateBloodDonar = (req) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    // data will be array
    if (!Array.isArray(req.body))
        throw (0, http_errors_1.default)(400, "Data must be an array of object.");
    // before all data
    const beforeAllData = yield donar_model_1.default.findAll({
        attributes: ["phone"],
    });
    // all phone numbers
    const allPhoneNumbers = beforeAllData.map((data) => data.phone);
    // data validation
    req.body.filter((item, index) => {
        // id generate
        item.id = crypto_1.default.randomUUID();
        // name, phone number and blood group is required
        if (!item.name || !item.phone || !item.bloodGroup) {
            throw http_errors_1.default.BadRequest(`Name, phone number and blood group is required for index : ${index}`);
        }
        // phone number check for duplicate
        else if (allPhoneNumbers.includes(item.phone)) {
            throw http_errors_1.default.BadRequest(`Phone number already exists for index : ${index}`);
        }
    });
    // data  delete from database
    yield donar_model_1.default.bulkCreate(Object.assign(Object.assign({}, req.body), { lastEditedBy: (_a = req === null || req === void 0 ? void 0 : req.me) === null || _a === void 0 ? void 0 : _a.email }));
});
exports.bulkCreateBloodDonar = bulkCreateBloodDonar;
const bulkDeleteBloodDonar = (ids) => __awaiter(void 0, void 0, void 0, function* () {
    if (!ids)
        throw (0, http_errors_1.default)(400, "Ids are required.");
    // data will be array
    if (!Array.isArray(ids))
        throw (0, http_errors_1.default)(400, "Ids must be an object of array.");
    const allDonars = yield donar_model_1.default.findAll({
        attributes: ["id"],
    });
    if (!allDonars)
        throw (0, http_errors_1.default)(400, "Couldn't find any donar data.");
    // convert in array
    const allDonarIds = allDonars.map((data) => data.id);
    // check all ids are exists
    ids.filter((id, index) => {
        if (!allDonarIds.includes(id))
            throw (0, http_errors_1.default)(400, `Donar id ${id} not found.Index number : ${index}`);
    });
    // delete multiple data
    yield donar_model_1.default.destroy({
        where: {
            id: ids,
        },
    });
    return ids;
});
exports.bulkDeleteBloodDonar = bulkDeleteBloodDonar;
const uploadDonarFile = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const {} = req.me;
    const file = (0, fs_1.readFileSync)(req.file.path, "utf-8");
    // fle type
    const fileType = req.file.mimetype.split("/")[1];
    let fileData = null;
    if (fileType === "json") {
        // convert json to array
        fileData = JSON.parse(file);
    }
    else if (fileType === "csv") {
        // csv file convert to json
        const jsonData = yield (0, csvtojson_1.default)().fromFile(req.file.path);
        fileData = jsonData.map((data) => {
            var _a, _b, _c, _d, _e, _f;
            return {
                name: data.name,
                phone: data.phone,
                department: data.department,
                homeDistrict: data.homeDistrict,
                bloodGroup: data.bloodGroup,
                lastDonationDate: (_a = data.lastDonationDate) !== null && _a !== void 0 ? _a : null,
                email: (_b = data.email) !== null && _b !== void 0 ? _b : null,
                age: (_c = data.age) !== null && _c !== void 0 ? _c : null,
                session: (_d = data.session) !== null && _d !== void 0 ? _d : null,
                totalDonation: (_e = data.totalDonation) !== null && _e !== void 0 ? _e : null,
                comment: (_f = data.comment) !== null && _f !== void 0 ? _f : null,
            };
        });
    }
    // data will be array
    if (!Array.isArray(fileData))
        throw (0, http_errors_1.default)(400, "Data must be an array of object.");
    // before all data
    const beforeAllData = yield donar_model_1.default.findAll({
        attributes: ["phone"],
    });
    // all phone numbers
    const allPhoneNumbers = beforeAllData.map((data) => data.phone);
    // data validation
    fileData.filter((item, index) => {
        // id generate
        item.id = crypto_1.default.randomUUID();
        // name, phone number and blood group is required
        if (!item.name || !item.phone || !item.bloodGroup) {
            throw http_errors_1.default.BadRequest(`Name, phone number and blood group is required for index : ${index}`);
        }
        // phone number check for duplicate
        else if (allPhoneNumbers.includes(item.phone)) {
            throw http_errors_1.default.BadRequest(`Phone number already exists for index : ${index}`);
        }
        // phone number validation
        if (!(0, helper_1.checkBDPhoneNumber)(item === null || item === void 0 ? void 0 : item.phone)) {
            throw http_errors_1.default.BadRequest(`Phone number is not valid for index : ${index}`);
        }
        // email validation
        if ((item === null || item === void 0 ? void 0 : item.email) && !(0, helper_1.isEmail)(item === null || item === void 0 ? void 0 : item.email)) {
            throw http_errors_1.default.BadRequest(`Email is not valid for index : ${index}`);
        }
    });
    // add edited by
    fileData = fileData.map((data) => {
        var _a;
        return Object.assign(Object.assign({}, data), { lastEditedBy: (_a = req === null || req === void 0 ? void 0 : req.me) === null || _a === void 0 ? void 0 : _a.email });
    });
    // data  delete from database
    yield donar_model_1.default.bulkCreate(fileData);
    const result = yield donar_model_1.default.findAll();
    const total = result.length;
    return { total, result };
});
exports.uploadDonarFile = uploadDonarFile;
