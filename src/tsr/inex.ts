import { Accuracy } from "./accuracy";
import { MessageImprint } from "./message_imprint";
import { TSTInfo, TSTInfoVersion } from "./tst_info";
import fs from "fs/promises";
import { AsnConvert, OctetString } from "@peculiar/asn1-schema";
import { TimeStampToken } from "./time_stamp_token";
import path from "path";
import assert from "assert";
import { id_ct_tstInfo } from "./object_identifier";

class InitTsr {
  public async test() {
    const file = await fs.readFile(
      path.join(__dirname, "../resoures/response.tsr"),
      "hex"
    );
    const fileHex = Buffer.from(file, "hex");
    const hex =
      "30820113060B2A864886F70D0109100104A08201020481FF3081F" +
      "C02010106032901013021300906052B0E03021A05000414958114" +
      "74539B0D71C20A2107FBACCDCBCD53A8AC021401E023B62846324" +
      "6E5488B0C3F04B9A3503E2E2B180F323031373032323330393539" +
      "30345AA081A7A481A43081A131819E30090603550406130255533" +
      "025060355040B1E1E005400530050002000540065007300740020" +
      "0053006500720076006500723029060355040A1E2200500065006" +
      "30075006C006900610072002000560065006E0074007500720065" +
      "0073303F06035504031E380050006500630075006C00690061007" +
      "2002000560065006E007400750072006500730020005400530050" +
      "0020005300650072007600650072";

    const raw = Buffer.from(hex, "utf-8");
    // await fs.writeFile(path.join(__dirname, "../resoures/test.tst"), raw);
    console.log(raw);
    const contentInfo = AsnConvert.parse(fileHex, TimeStampToken);
    // assert.strictEqual(contentInfo.contentType, id_ct_tstInfo);
    const content = AsnConvert.parse(contentInfo.content, TSTInfo);

    console.log({
      raw,
      file,
      contentInfo,
      contentInfo01: contentInfo.content,
      content,
    });
  }
}

export {
  Accuracy,
  MessageImprint,
  TSTInfoVersion,
  TSTInfo,
  InitTsr,
  TimeStampToken,
  id_ct_tstInfo,
};
