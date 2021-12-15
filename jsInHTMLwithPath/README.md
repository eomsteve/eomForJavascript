# JavaScript file import in HTML

## 상대경로 절대경로 (path)
### 절대경로
**절대경로**란 어떠한 웹 페이지나 파일이 가지고 있는 고유한 경로를 말한다. 

루트부터 시작하여 현재 위치한 모든 경로를 포함하며 html기준 html파일이 위치한 폴더의 파일까지를 뜻한다.
```text
    ex) C:\users\document\noname.html
```
### 상대경로
**상대경로**란 '현재 위치한 곳을 기준' 으로 해서 '그곳'의 위치이다. 
```text
    ex) C:\users\document\noname.html
    ->  .(현재위치)/noname.html
```
즉 html 파일이 위치한 폴더를 기준으로 상대적인 경로라는 것이다.

* / : 루트
* ./ : 현재 위치
* ../ : 현재 위치의 상단 폴더
  
### 장단점
* 절대경로는 정해진 경로로만 이동해서 무슨 일이 있어도 찾아가지만 후에 경로가 변경되면 파일을 찾지못해 에러가 발생할 수있다.
* 상대경로는 상위 폴더명이 바뀌어도 자기 자신을 기준으로 참조하기 때문에 유동적으로 파일을 참조할 수  있다.
* 절대경로는 외부 파일을 참조할 때 주로 사용하며, 상대 경로는 내부 파일을 연결할 때 주로 사용된다.

## 자바스크립트 파일 html에 넣기
`script src` 를 활용해 자바스크립트 파일을 `html` 에 연결할 수 있다.
```HTML
<script src="console.js">
``` 

여기서 `src` 사용시 상대경로와 절대경로를 이용해 자바스크립트의 파일을 찾아 연결할 수있는데 현재 폴더에 위치한 `console.js`파일을 넣기 위해서 
```HTML
<script src="./console.js"> </script>
<!-- ./console.js=상대경로를 사용하여 표현한 현재폴더에 있는 console.js 파일을 뜻하는 경로 -->
<script src="~/dev/domForJavascript-1/jsInHTMLwithPath/console.js"></script>
<!--절대경로 root인 ~부터 시작하여 링크하고자 하는 파일이 있는 경로까지의 모든 경로를 나타냈다.-->
``` 
위와같이 사용할 수 있다.


--------------------------------
referencs

[상대경로](https://88240.tistory.com/122)