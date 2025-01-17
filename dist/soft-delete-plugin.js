"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.softDeletePlugin = void 0;
var softDeletePlugin = function (schema) {
    schema.add({
        isDeleted: {
            type: Boolean,
            required: true,
            default: false,
        },
        deletedAt: {
            type: Date,
            default: null,
        },
    });
    // @ts-ignore
    schema.pre('find', function (next) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (this.getFilter().isDeleted === true) {
                    return [2 /*return*/, next()];
                }
                this.setQuery(__assign(__assign({}, this.getFilter()), { isDeleted: false }));
                next();
                return [2 /*return*/];
            });
        });
    });
    // @ts-ignore
    schema.pre('count', function (next) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (this.getFilter().isDeleted === true) {
                    return [2 /*return*/, next()];
                }
                this.setQuery(__assign(__assign({}, this.getFilter()), { isDeleted: false }));
                next();
                return [2 /*return*/];
            });
        });
    });
    // @ts-ignore
    schema.pre('countDocuments', function (next) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (this.getFilter().isDeleted === true) {
                    return [2 /*return*/, next()];
                }
                this.setQuery(__assign(__assign({}, this.getFilter()), { isDeleted: false }));
                next();
                return [2 /*return*/];
            });
        });
    });
    schema.static('findDeleted', function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.find({ isDeleted: true })];
            });
        });
    });
    schema.static('restore', function (query) {
        return __awaiter(this, void 0, void 0, function () {
            var updatedQuery, deletedTemplates, restored, _i, deletedTemplates_1, deletedTemplate;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        updatedQuery = __assign(__assign({}, query), { isDeleted: true });
                        return [4 /*yield*/, this.find(updatedQuery)];
                    case 1:
                        deletedTemplates = _a.sent();
                        if (!deletedTemplates) {
                            return [2 /*return*/, Error('element not found')];
                        }
                        restored = 0;
                        _i = 0, deletedTemplates_1 = deletedTemplates;
                        _a.label = 2;
                    case 2:
                        if (!(_i < deletedTemplates_1.length)) return [3 /*break*/, 5];
                        deletedTemplate = deletedTemplates_1[_i];
                        if (!deletedTemplate.isDeleted) return [3 /*break*/, 4];
                        deletedTemplate.$isDeleted(false);
                        deletedTemplate.isDeleted = false;
                        deletedTemplate.deletedAt = null;
                        return [4 /*yield*/, deletedTemplate.save().then(function () { return restored++; }).catch(function (e) { throw new Error(e.name + ' ' + e.message); })];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4:
                        _i++;
                        return [3 /*break*/, 2];
                    case 5: return [2 /*return*/, { restored: restored }];
                }
            });
        });
    });
    schema.static('softDelete', function (query, options, save_options) {
        return __awaiter(this, void 0, void 0, function () {
            var templates, deleted, documents, _loop_1, _i, templates_1, template;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.find(query)];
                    case 1:
                        templates = _a.sent();
                        if (!templates) {
                            return [2 /*return*/, Error('Error in find function')];
                        }
                        deleted = 0;
                        documents = [];
                        _loop_1 = function (template) {
                            return __generator(this, function (_b) {
                                switch (_b.label) {
                                    case 0:
                                        if (!!template.isDeleted) return [3 /*break*/, 2];
                                        template.$isDeleted(true);
                                        template.isDeleted = true;
                                        template.deletedAt = new Date();
                                        return [4 /*yield*/, template.save(save_options).then(function () {
                                                if (options.returnDocument === 'before') {
                                                    documents.push(__assign(__assign({}, (template._doc)), { isDeleted: false, deletedAt: null }));
                                                }
                                                else if (options.returnDocument === 'after') {
                                                    documents.push(template._doc);
                                                }
                                                else {
                                                    deleted++;
                                                }
                                            }).catch(function (e) { throw new Error(e.name + ' ' + e.message); })];
                                    case 1:
                                        _b.sent();
                                        _b.label = 2;
                                    case 2: return [2 /*return*/];
                                }
                            });
                        };
                        _i = 0, templates_1 = templates;
                        _a.label = 2;
                    case 2:
                        if (!(_i < templates_1.length)) return [3 /*break*/, 5];
                        template = templates_1[_i];
                        return [5 /*yield**/, _loop_1(template)];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4:
                        _i++;
                        return [3 /*break*/, 2];
                    case 5:
                        if (options.returnDocument === 'before' || options.returnDocument === 'after') {
                            return [2 /*return*/, documents];
                        }
                        else {
                            return [2 /*return*/, deleted];
                        }
                        return [2 /*return*/];
                }
            });
        });
    });
};
exports.softDeletePlugin = softDeletePlugin;
