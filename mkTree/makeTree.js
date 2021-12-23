/*
o
oo
ooo
oooo
ooooo
*/
console.log('1번');
for(let starLayer = 1; starLayer<= 5; starLayer++) {
    for(let draw = 1; draw <= starLayer; draw++) {
        process.stdout.write("*");
    }
    process.stdout.write("\n");
}
console.log('---------');
console.log('2번');
/*
ooooo
oooo
ooo
oo
o
*/
for(let starLayerRev = 5; starLayerRev>= 1; starLayerRev--) {
    for(let draw = 1; draw <= starLayerRev; draw++) {
        process.stdout.write("*");
    }
    process.stdout.write("\n");
}
console.log('---------');
console.log('3번');
/*
    o
   ooo
  ooooo
 ooooooo
ooooooooo
*/
let howManyStar = 1;
for(let starLayer = 10; starLayer >= 1; starLayer--) {
    if(starLayer % 2 == 1)
    {
        for(let space = starLayer/2 ; space>=0; space--)
        {
            process.stdout.write(" ");
        }
        for(let draw = 1; draw <= howManyStar; draw++) {
            process.stdout.write("*");
        }
        howManyStar += 2;
        process.stdout.write("\n");
    }else
    {
        continue;
    }
}

console.log('---------');
console.log('4번');
/*
ooooooooo
 ooooooo
  ooooo
   ooo
    o
*/
howManyStar = 9;
for(let starLayer = 1; starLayer <= 10; starLayer++) {
    if(starLayer % 2 == 1)
    {
        for(let space = starLayer/2 ; space>=0; space--)
        {
            process.stdout.write(" ");
        }
        for(let draw = 1; draw <= howManyStar; draw++) {
            process.stdout.write("*");
        }
        howManyStar -= 2;
        process.stdout.write("\n");
    }else
    {
        continue;
    }
}