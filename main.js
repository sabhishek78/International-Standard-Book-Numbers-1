// International Standard Book Numbers


// The International Standard Book Number (ISBN) is a unique identifying number given to each published book. ISBNs assigned after January 2007 are 13 digits long (ISBN-13), however books with 10-digit ISBNs are still in wide use.


// An ISBN-10 is verified this way:

// isbn10 = "0330301624"



// Line up the digits with the numbers 10 to 1:


// 0  3  3  0  3  0  1  6  2  4
// 10 9  8  7  6  5  4  3  2  1

// Multiply each digit with the number below it (the 10th digit in an ISBN can be an X. 
// This last X simply means 10).




// Sum up the products:
// 0 + 27 + 24 + 0 + 18 + 0 + 4 + 18 + 4 + 4 = 99


// If the sum is divisible by 11, the ISBN-10 is valid.

 
// An ISBN-13 is verified this way:


// isbn13 = "9780316066525"

// Line up the digits with alternating 1s and 3s:


// 9  7  8  0  3  1  6  0  6  6  5  2  5
// 1  3  1  3  1  3  1  3  1  3  1  3  1


// Multiply each digit with the number below it and get the sum:

// ```
// 9 + 21 + 8 + 0 + 3 + 3 + 6 + 0 + 6 + 18 + 5 + 6 + 5 = 90
// ```

// If the sum is divisible by 10, the ISBN-13 is valid.

// ### Create a function that takes a string of numbers (possibly with an X at the end) and...
// - Return "Invalid" if it is not a valid ISBN-10 or ISBN-13.
// - Return "Valid" if it is a valid ISBN-13.
// - If it is a valid ISBN-10, convert it into an ISBN-13 and return the ISBN-13 number.

// Convert a valid ISBN-10 to ISBN-13 by stacking 978 to the start, then changing the last digit (the check digit) so that 
// the resulting number passes the ISBN-13 check.


// Examples

// ```js

// isbn13("9780316066525") // "Valid"

// isbn13("0330301824") // "Invalid"

// isbn13("0316066524") // "9780316066525"
// isbn13("817450494X") // '9788174504944'
  
function isbn13(isbnCode) {
  if(isbnCode.length!==13 && isbnCode.length!==10){
    return "Invalid";
  }
   if (isbnCode.length == 13) {
    return isValidIsbn13(isbnCode) ? "Valid" : "Invalid";
  } else if (isbnCode.length == 10) {
        if(isValidIsbn10(isbnCode)){
          return convertIsbn10toIsbn13(isbnCode);
        }
        else{
          return "Invalid";
        }
    }
}
function convertIsbn10toIsbn13(isbnCode) {
  let newCode = "978" + isbnCode;
  newCode = newCode.substring(0, newCode.length - 1);
  let sum=getIsbn13Sum(newCode);
  let remainder=sum%10;
  let checkSumDigit=10-remainder;
  newCode=newCode.concat(checkSumDigit.toString());
  return newCode;
  
}
function getIsbn10Sum(isbnCode){
  let baseString = "9876543210";
  let sum = 0;
  for (let i = 0; i < isbnCode.length; i++) {
    
    if(isbnCode[i]==='X'){
      sum = sum + (parseInt(baseString[i])+1) * 10; 
    }
    else{
       sum = sum + (parseInt(baseString[i])+1) * isbnCode[i];
    }
   }
  return sum;
}
function getIsbn13Sum(isbnCode) {
  let baseString = "1313131313131";
  let sum = 0;
  for (let i = 0; i < isbnCode.length; i++) {
    sum = sum + parseInt(baseString[i]) * parseInt(isbnCode[i]);
  }
  // console.log("sum="+sum);
  return sum;
}
function isValidIsbn13(isbnCode) {
 
  return getIsbn13Sum(isbnCode) % 10 === 0;
}
function isValidIsbn10(isbnCode) {
 return getIsbn10Sum(isbnCode) % 11 === 0;
}

console.log(isbn13("9780316066525")==="Valid");
console.log(isbn13("9780316066526")==="Invalid");// "Valid"
console.log(isbn13("0330301824")==="Invalid"); // "Invalid"
console.log(isbn13("0316066524")==="9780316066525"); // "9780316066525"
console.log(isbn13("817450494X")==='9788174504944');
console.log(isbn13("9788174504944")==="Valid");// 