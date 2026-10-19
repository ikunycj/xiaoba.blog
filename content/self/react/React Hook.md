## [`useCallback(fn, dependencies)`](https://zh-hans.react.dev/reference/react/useCallback#usecallback)
在组件顶层调用 `useCallback` 以便在多次渲染中缓存函数：
```js
import { useCallback } from 'react';  

export default function ProductPage({ productId, referrer, theme }) {  
const handleSubmit = useCallback((orderDetails) => {  
	post('/product/' + productId + '/buy', {  
		referrer,  
		orderDetails,  
		});  
}, [productId, referrer]);
```
## useState(fn, dependencies)