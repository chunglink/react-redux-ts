export default class ExtensionChecker {
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
