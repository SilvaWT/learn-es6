const arr = [1,3,4,5,8,10];

const newArr = arr.map((item, index) => {
    return item + index; 
})

console.log(newArr);

const sum = arr.reduce((total,next) => 
    total + next
);

console.log(sum);

const filter = arr.filter(item=>
     item % 2 === 0
)

console.log(filter);
