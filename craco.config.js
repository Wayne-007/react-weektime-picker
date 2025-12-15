module.exports = function ({
    env
}) {
    return {
        webpack: {
            configure: (webpackConfig) => {
                // 忽略 source map 解析警告
                webpackConfig.ignoreWarnings = [
                    /Failed to parse source map/,
                ];
                return webpackConfig;
            }
        }
    };
}
