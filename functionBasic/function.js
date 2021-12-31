function powxy(x, y){
    while(y>1)
    {
        x += x;
        y--;
    }
    return x;
}

let powResult = powxy(2, 10);

console.log(powResult);

function mkTree(x)
{
    let howManyStarToDraw = 1;

    for(let starLayer = x * 2; starLayer >= 1; starLayer--){
        if( starLayer % 2 == 1 ){
            for(let space = starLayer / 2 ; space >= 0; space--){
                process.stdout.write(" ");
            }
            for(let drawStar = 1; drawStar <= howManyStarToDraw; drawStar++){
                process.stdout.write("*");
            }
            howManyStarToDraw += 2;
            process.stdout.write("\n");
        }else{
            continue;
        }
    }
}

mkTree(5);