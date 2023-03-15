import { AsnConvert, AsnParser, OctetString } from "@peculiar/asn1-schema";
import * as assert from "assert";
import path from "path";
import fs from "fs/promises";
import { TimeStampToken, TSTInfo } from "@peculiar/asn1-tsp";
import { id_signedData } from "@peculiar/asn1-cms";
context("TSP", () => {
  it("parse TSTInfo", async () => {
    const file = await fs.readFile(
      path.join(__dirname, "../resoures/response.tsr")
    );
    const contentInfo = AsnParser.parse(file, TimeStampToken);
    console.log(contentInfo.contentType);
    assert.strictEqual(contentInfo.contentType, id_signedData);
    const tstInfo = AsnConvert.parse(contentInfo.content, TSTInfo);
    console.log(tstInfo);
  });
});
