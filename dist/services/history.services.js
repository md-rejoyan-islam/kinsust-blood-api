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
exports.deleteAllHistory = exports.deleteHistory = exports.updateHistory = exports.createHistory = exports.getSingleHistoryById = exports.getAllHistory = void 0;
const http_errors_1 = __importDefault(require("http-errors"));
const history_model_1 = __importDefault(require("../models/history.model"));
const donar_model_1 = __importDefault(require("../models/donar.model"));
const crypto_1 = __importDefault(require("crypto"));
const getAllHistory = () => __awaiter(void 0, void 0, void 0, function* () {
    // get all history
    const { count, rows: history } = yield history_model_1.default.findAndCountAll({});
    // if no history found
    if (!count)
        throw (0, http_errors_1.default)(400, "Couldn't find any history data.");
    return { count, history };
});
exports.getAllHistory = getAllHistory;
const getSingleHistoryById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    // find history by id
    const history = yield history_model_1.default.findByPk(id);
    // if history data not found
    if (!history)
        throw (0, http_errors_1.default)(400, "Couldn't find any history data.");
    return history;
});
exports.getSingleHistoryById = getSingleHistoryById;
const createHistory = (req) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { donarId } = req.body;
    if (!donarId)
        throw http_errors_1.default.BadRequest("Donar id is required!");
    // donar id check
    const donar = yield donar_model_1.default.findByPk(donarId);
    // if donar data not found
    if (!donar)
        throw http_errors_1.default.BadRequest("Donar id not found.");
    // create history
    const history = yield history_model_1.default.create({
        id: crypto_1.default.randomUUID(),
        name: donar.name,
        bloodGroup: donar.bloodGroup,
        donarId: donar.id,
        lastDonationDate: donar.lastDonationDate,
        phone: donar.phone,
        editedBy: (_a = req === null || req === void 0 ? void 0 : req.me) === null || _a === void 0 ? void 0 : _a.email,
    });
    return history;
});
exports.createHistory = createHistory;
const updateHistory = (req) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const id = req.params.id;
    // find history by id
    const history = yield history_model_1.default.findByPk(id);
    // if history data not found
    if (!history)
        throw (0, http_errors_1.default)(400, "Couldn't find any history data.");
    // update history
    yield history.update(Object.assign(Object.assign({}, req.body), { editedBy: (_a = req === null || req === void 0 ? void 0 : req.me) === null || _a === void 0 ? void 0 : _a.email }));
    return history;
});
exports.updateHistory = updateHistory;
const deleteHistory = (id) => __awaiter(void 0, void 0, void 0, function* () {
    // find history by id
    const history = yield history_model_1.default.findByPk(id);
    // if history data not found
    if (!history)
        throw (0, http_errors_1.default)(400, "Couldn't find any history data.");
    // delete history
    yield history.destroy();
    return history;
});
exports.deleteHistory = deleteHistory;
const deleteAllHistory = () => __awaiter(void 0, void 0, void 0, function* () {
    // delete history
    yield history_model_1.default.destroy({
        where: {},
        truncate: true,
    });
});
exports.deleteAllHistory = deleteAllHistory;
