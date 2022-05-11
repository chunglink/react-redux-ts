export const AppConsts = {
  appBaseUrl: process.env.API_URL,
  remoteServiceBaseUrl: process.env.API_URL,
  tokenCookieName: "AuthToken",
  EVENT: {
    LOADING: "LOADING",
  },
  testEmail(email: string) {
    const pattern =
      /[a-zA-Z0-9]+[\.]?([a-zA-Z0-9]+)?[\@][a-z]{3,9}[\.][a-z]{2,5}/g;
    return pattern.test(email);
  },
  testPhoneNumber(phoneNumber: string) {
    const pattern =
      /^\s*(?:\+?(\d{1,3}))?[- (]*(\d{3})[- )]*(\d{3})[- ]*(\d{4})(?: *[x/#]{1}(\d+))?\s*$/;
    return pattern.test(phoneNumber);
  },
  testMessageInput(str: string) {
    if (str === undefined) {
      return false;
    }
    const pattern = /\n$/;
    return pattern.test(str);
  },
  regexHttpChecker(url: string): boolean {
    let expression =
      /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
    let regex = new RegExp(expression);

    if (url.match(regex)) {
      return true;
    } else {
      return false;
    }
  },
  getSubString(str: string, length: number) {
    if (str && str.length > length) {
      let subStr = str.substring(0, length) + "...";
      return subStr;
    }
    return str;
  },
  regexHttpModify(str: string, colorText: string = "#1890ff"): string {
    let re =
      /(\(.*?)?\b((?:https?|ftp|file):\/\/[-a-z0-9+&@#\/%?=~_()|!:,.;]*[-a-z0-9+&@#\/%=~_()|])/gi;
    const color = colorText;
    return str.replace(re, (match, lParens, url) => {
      let rParens = "";
      lParens = lParens || "";
      let lParenCounter = /\(/g;
      while (lParenCounter.exec(lParens)) {
        let m;
        if ((m = /(.*)(\.\).*)/.exec(url) || /(.*)(\).*)/.exec(url))) {
          url = m[1];
          rParens = m[2] + rParens;
        }
      }
      return (
        lParens +
        "<a style='color:" +
        color +
        "' target='_blank' href='" +
        url +
        "'>" +
        url +
        "</a>" +
        rParens
      );
    });
  },
  getUnsignedString(str: string) {
    var signedChars =
      "àảãáạăằẳẵắặâầẩẫấậđèẻẽéẹêềểễếệìỉĩíịòỏõóọôồổỗốộơờởỡớợùủũúụưừửữứựỳỷỹýỵÀẢÃÁẠĂẰẲẴẮẶÂẦẨẪẤẬĐÈẺẼÉẸÊỀỂỄẾỆÌỈĨÍỊÒỎÕÓỌÔỒỔỖỐỘƠỜỞỠỚỢÙỦŨÚỤƯỪỬỮỨỰỲỶỸÝỴ";
    var unsignedChars =
      "aaaaaaaaaaaaaaaaadeeeeeeeeeeeiiiiiooooooooooooooooouuuuuuuuuuuyyyyyAAAAAAAAAAAAAAAAADEEEEEEEEEEEIIIIIOOOOOOOOOOOOOOOOOUUUUUUUUUUUYYYYY";
    var pattern = new RegExp("[" + signedChars + "]", "g");
    var output = str.replace(pattern, function (m, key, value) {
      return unsignedChars.charAt(signedChars.indexOf(m));
    });
    return output;
  },
};

export default class ExtentionCheck {
  static IMAGE_EXT: number = 0;
  static VIDEO_EXT: number = 1;
  static TXT_EXT: number = 2;
  static EXCEL_EXT: number = 3;
  static PP_EXT: number = 4;
  static PDF_EXT: number = 5;
  static OTHER_EXT: number = 6;

  static IMAGE_EXT_LIST: string[] = [
    ".jpg",
    ".jpeg",
    ".jpe",
    ".jif",
    ".jfif",
    ".jfi",
    ".png",
    ".tiff",
    ".tif",
    "bmp",
    ".JPG",
    ".PNG",
    ".JPEG",
  ];
  static VIDEO_EXT_LIST: string[] = [
    ".mp4",
    ".m4a",
    ".m4v",
    ".f4v",
    ".f4a",
    ".m4b",
    ".m4r",
    ".f4b",
    ".mov",
    ".3gp",
    ".3gp2",
    ".3g2",
    ".3gpp",
    ".3gpp2",
    ".ogg",
    ".oga",
    ".ogv",
    ".ogx",
    ".wmv",
    ".wma",
  ];
  static TXT_EXT_LIST: string[] = [".doc", ".docx", ".txt"];
  static EXCEL_EXT_LIST: string[] = [
    ".xls",
    ".xlsx",
    ".xlt",
    ".xltx",
    ".xltm",
    ".xlsm",
  ];
  static PP_EXT_LIST: string[] = [
    ".ppt",
    ".pot",
    ".pps",
    ".pptx",
    ".pptm",
    ".potx",
    ".potm",
    ".ppsx",
  ];
  static PDF_EXT_LIST: string[] = [".pdf"];
  static checkExtentionFileType(ext: string) {
    if (this.IMAGE_EXT_LIST.includes(ext)) {
      return this.IMAGE_EXT;
    } else if (this.VIDEO_EXT_LIST.includes(ext)) {
      return this.VIDEO_EXT;
    } else if (this.TXT_EXT_LIST.includes(ext)) {
      return this.TXT_EXT;
    } else if (this.EXCEL_EXT_LIST.includes(ext)) {
      return this.EXCEL_EXT;
    } else if (this.PP_EXT_LIST.includes(ext)) {
      return this.PP_EXT;
    } else if (this.PDF_EXT_LIST.includes(ext)) {
      return this.PDF_EXT;
    } else {
      return this.OTHER_EXT;
    }
  }
}
