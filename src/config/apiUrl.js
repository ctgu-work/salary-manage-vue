const devApiUrl = "http://localhost:8081"; //本地开发环境
const buildDevApiUrl = "https://pay.ctguqmx.cn"; //打包开发环境
const buildTestApiUrl = "https://pay.ctguqmx.cn"; //打包测试环境
const buildProApiUrl = "https://pay.ctguqmx.cn"; //打包正式环境

let useApiUrl;

if (process.env.NODE_ENV === "development") {
  useApiUrl = devApiUrl;
} else {
  //production
  switch (process.env.VUE_APP_MODE) {
    case "buildDev":
      useApiUrl = buildDevApiUrl;
      break;
    case "buildTest":
      useApiUrl = buildTestApiUrl;
      break;
    default:
      useApiUrl = buildProApiUrl;
      break;
  }
}

export { useApiUrl }; //可以导出更多需要不同环境区分的url
