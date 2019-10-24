const express = require("express");

const wunderApi = express();

wunderApi.listen(80, () => console.log("WunderApi started on http://localhost:80"));