# Content Editable

HTML5 에서는 어떤 요소라도 수정이 가능하다. 약간의 JS 이벤트 핸들러를 사용하는 것 만으로도 웹 페이지를 완전하고 빠른 `리치-텍스트` 에디터로 변경할 수 있다. 
> 대부분의 HTML 요소를 지원하지 않는다.

## 사용법

`contentEditable` 속성을 HTML 요소에서 `true`로 설정하면 된다. 

```html
<!DOCTYPE html>
<html>
  <body>
    <div contentEditable="true">
      This text can be edited by the user.
    </div>
  </body>
</html>
```

### contentEditable ture인 div내부 엔터치면 div가 또 생기는 오류는 크롬에서만 발생한다.

div를 disply block일때 발생하는 오류인데 display를 inline 혹은 inline-block처리하면 된다.!

--------------------------------------------------------
references

https://developer.mozilla.org/ko/docs/Web/Guide/HTML/Editable_content