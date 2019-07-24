"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mysql_1 = __importDefault(require("../mysql/mysql"));
const express_1 = require("express");
const router = express_1.Router();
router.get('/heroes', (req, res) => {
    const query = ` 
        select 
            * from heroes `;
    mysql_1.default.runQuery(query, (err, heroes) => {
        if (err) {
            res.status(400).json({
                ok: false,
                error: err
            });
        }
        else {
            res.json({
                ok: true,
                heroes,
            });
        }
    });
});
router.get('/heroes/:id', (req, res) => {
    const id = req.params.id;
    const escapeId = mysql_1.default.instance.connection.escape(id);
    const query = ` 
        select * 
        from heroes WHERE id= ${escapeId}
        `;
    mysql_1.default.runQuery(query, (err, heroes) => {
        if (err) {
            res.status(400).json({
                ok: false,
                error: err
            });
        }
        else {
            res.json({
                ok: true,
                heroes,
            });
        }
    });
});
exports.default = router;
