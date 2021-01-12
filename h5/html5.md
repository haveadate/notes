# html 5 学习笔记

## 语义化标签

### 常见

- nav：表示导航区域；
- header：表示头部区域（页眉）；
- footer：表示底部区域（页尾）；

### 低版本浏览器对不认识 HTML5 的解决方案

#### 方案一(以 nav 标签为例)

CSS 设置：

```css
nav {
  /* 配合 JS 使用 */
  display: block;
  /* others setting here. */
}
```

JS 设置：

```javascript
document.createElement('nav')
```

