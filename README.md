# react-weektime-picker

一个 React 周时间选择器组件，支持通过拖拽选择一周中的时间段。

## 安装

```bash
npm install react-weektime-picker
# 或
yarn add react-weektime-picker
```

## 依赖

本组件依赖以下包，请确保已安装：

- `react` (^16.8.0 || ^17.0.0 || ^18.0.0)
- `react-dom` (^16.8.0 || ^17.0.0 || ^18.0.0)

## 使用方法

```jsx
import React, { useState } from 'react';
import WeektimePicker from 'react-weektime-picker';

function App() {
  const [value, setValue] = useState('');

  const handleChange = (newValue) => {
    setValue(newValue);
    console.log('选择的时间段:', newValue);
  };

  return (
    <WeektimePicker
      value={value}
      change_value={handleChange}
    />
  );
}

export default App;
```

## API

### Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| value | string | '' | 选中的时间段，格式为 336 位的二进制字符串（7天 × 48个时间段） |
| change_value | function | - | 值改变时的回调函数，参数为新值 |

### value 格式说明

`value` 是一个长度为 336 的二进制字符串，表示一周 7 天，每天 48 个时间段（每 30 分钟一个时间段）。

- `'0'` 表示未选中
- `'1'` 表示已选中

例如：`'0000...1111...'` 表示某些时间段被选中。

## 功能特性

- ✅ 支持鼠标拖拽选择时间段
- ✅ 可视化显示一周的时间安排
- ✅ 实时预览选择的时间段
- ✅ 支持清空选择
- ✅ 鼠标悬停提示当前时间段

## 开发

```bash
# 安装依赖
yarn install

# 启动开发服务器
yarn start

# 运行测试
yarn test

# 构建项目
yarn build
```

## License

MIT
