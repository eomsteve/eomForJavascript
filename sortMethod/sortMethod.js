let week = ['월','화','수','목','금','토','일'];

let randomWeekend = [];

let loop = 0;
while(loop < 7){
  let num = Math.floor(Math.random() * 7);
  if (!same(num)){
    randomWeekend.push(week[num]);
    loop += 1;
  }
}

function same(n){
  return randomWeekend.find((day) => (day === week[n]));
}

//랜덤 요일뽑기
console.log(randomWeekend);

//일반 sort메서드는 아스키 기준으로 정렬된다.
//이 값은 정해져 있으므로 월화수목금에 맞는 가중치를 지정해 줄수 있다.
randomWeekend.sort(); //['금', '목', '수', '월', '일', '토', '화']
let weekNum = [4, 3, 2, 0, 6, 5, 1]; //['금', '목', '수', '월', '일', '토', '화']

//요일과 가중치를 매핑해 만든뒤 배열로 만들어 sort 하고 value값을 차례로 새 배열에 저장, 반환한다.
let sortWeek = function(wd, wn){
  let weekMap = new Map();
  let sorted = [];
  for(let i = 0; i < 7; i++){
    weekMap.set(wn[i], wd[i]);
  }
  let weekMapArray = Array.from(weekMap);
  weekMapArray.sort((a,b) => a[0] - b[0]); // value 기준 오름차순 정렬
  for(const [key,value] of weekMapArray){
    sorted.push(value);
  }
  return sorted;
}

let answer = sortWeek(randomWeekend, weekNum);

console.log(answer);

//생각해보니 가중치를 이용할 것이고, 배열을 사용할거면
// Map을 안쓰고도 풀수 있지 않을까?? 배열 두개를 2차원배열로 합쳐보자

function myZipSort(arr1, arr2){
  let mat = [];
  let tmp,ans = [];
  for (let i = 0; i < 7; i++){
    tmp = [];
    tmp.push(arr1[i]);
    tmp.push(arr2[i]);
    mat.push(tmp);
  }
  mat.sort((a, b) => a[1] - b[1]);
  for (let i = 0; i < 7; i++){
    ans.push(mat[i][0]);
  }
  return ans;
}

let zipSort = myZipSort(randomWeekend,weekNum);

console.log(zipSort);

/*
맵을 이용해서 2차원배열로 합치고 싶었는데 잘 안되네용
*/