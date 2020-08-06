import { useApiUrl } from "@/config/apiUrl";
import CommonConfig from "@/config/common";
import SystemConfig from "@/config/system";

export default {
  ...CommonConfig,
  ...SystemConfig,
  apiUrl: useApiUrl,
  corporation: "公司名教育科技（宜昌）有限公司",
  siteName: "创造404管理后台"
};
