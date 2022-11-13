let apiUrl = ''

const ENV = process.env
if (ENV.NODE_ENV === "production") {
	// 生产环境
	apiUrl = '/jeecg-boot'
} else {
	// 调试环境
	apiUrl = 'https://mock.apifox.cn/m1/1810377-0-default/jeecg-boot'
	apiUrl = 'http://127.0.0.1:4523/m1/1810377-0-default/jeecg-boot'
}

export function useGlobalSetting() {
	return {
		apiUrl
	}
}
