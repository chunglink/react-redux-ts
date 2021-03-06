export const Utils = {
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
