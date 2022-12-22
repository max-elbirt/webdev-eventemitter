interface Property<T>{
    propertyExists(item: T): boolean;
}

class OddNum implements Property<number>{
    propertyExists(item: number): boolean {
        if (item % 2 === 1){
            return true
        }
        return false
    }
}

class PrimeNum {
    propertyExists(item) {
        if (item === 1 || item === 2) {
            return true;
        }
        for (let num = 2; num < item; num++) {
            if (item % num === 0){
                return false;
            }
        }
        return true;
    }
}

class PalindromeNum implements Property<number>{
    propertyExists(item: number): boolean {
        const itemString = item.toString();
        const itemStringReverse = itemString.split('').reverse().join('');
        if (item === +itemStringReverse) {
            return true;
        }
        return false
    }
}

function countElementsWithTheSameProperty<T>(arr: T[], prop: Property<T> ){
    let counter = 0;
    arr.forEach((item) => {
        if (prop.propertyExists(item)){
            counter++;
        }
    })
    return counter;
}

const testArrOdd = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const testArrPalindrome = [141, 555, 676, 8998, 1, 157, 143]

console.log(countElementsWithTheSameProperty(testArrOdd, new OddNum));
console.log(countElementsWithTheSameProperty(testArrOdd, new PrimeNum()));
console.log(countElementsWithTheSameProperty(testArrPalindrome, new PalindromeNum()));