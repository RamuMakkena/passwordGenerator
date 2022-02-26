// Arrays for alphabets, numbers, special characters.
var charactersArray = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
var numbersArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
var specialCharactersArray = ['!', '@', '#', '$', '%', '^', '&', '*', '(', ')'];
var minTypeSelectionError = "<h4 style='color:red'>ERROR: Select atleast one character type. Try Again</h4>";
var validPasswordLengthError = "<h4 style='color:red'>ERROR: Password length should minimum 8 characters and maximum 128 characters. Try Again</h4>";


//prompts to user for selectoins
var includeLowercase = () => {
  return confirm("do you want to include lowercase characters?");
}

var includeUpperCase = () => {
  return confirm("do you want to include uppercase characters?");
}
var includeNumbers = () => {
  return confirm("do you want to include numbers?");
}

var includeSpecialChars = () => {
  return confirm("do you want to include special characters?");
}
var length = () => {
  return prompt("Length of the pasword(Min:8 char Max:128 chat) :");
}

//starting function for generating password
function generatePassword() {
  var lowerCase = includeLowercase();
  var upperCase = includeUpperCase();
  var specialCharacters = includeSpecialChars();
  var numbers = includeNumbers();
  //validating minimum selection of atleast one character type
  if (lowerCase || upperCase || specialCharacters || numbers) {
    var lengthOfThePassword = length();
    //validation of valid password length;
    if (lengthOfThePassword > 128 || lengthOfThePassword < 8) {
      return "wronglength";
    }
    return passwordGenerator(lowerCase, upperCase, numbers, specialCharacters, lengthOfThePassword);
  }
  else {
    return "charactertype";
  }
}

//for selecting random index from arrays
function getRandomArrayIndex(typeOfArray) {
  switch (typeOfArray) {
    case 'alphabet':
      return Math.floor(Math.random() * 25);
    case 'numbers':
      return Math.floor(Math.random() * 9);
    case 'splcharcters':
      return Math.floor(Math.random() * (specialCharactersArray.length - 1));
  }
}

function passwordGenerator(smallchars, upperchars, numbers, splchars, passwordLength) {
  //need to generate a password of length specified
  // fill one after another of type selected till password length reaches.
  // select random index for numbers, alphabets & special characters
  var generatedPassword = [];
  while (true) {
    if (smallchars) {
      generatedPassword.push(charactersArray[getRandomArrayIndex('alphabet')]);
      if (generatedPassword.length == passwordLength) {
        break;
      }
    }
    if (upperchars) {
      generatedPassword.push(charactersArray[getRandomArrayIndex('alphabet')].toUpperCase());
      if (generatedPassword.length == passwordLength) {
        break;
      }
    }
    if (numbers) {
      generatedPassword.push(numbersArray[getRandomArrayIndex('numbers')]);
      if (generatedPassword.length == passwordLength) {
        break;
      }
    }
    if (splchars) {
      generatedPassword.push(specialCharactersArray[getRandomArrayIndex('splcharcters')]);
      if (generatedPassword.length == passwordLength) {
        break;
      }
    }
  }
  return generatedPassword.toString().replaceAll(',', '');
}

// Get references to the #generate element
var generateBtn = document.querySelector("#generate");

// Write password to the #password input
function writePassword() {

  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  if (password === "charactertype") {
    passwordText.value = '';
    document.querySelector(".card-error").innerHTML = minTypeSelectionError;
  } else if (password === "wronglength") {
    passwordText.value = '';
    document.querySelector(".card-error").innerHTML = validPasswordLengthError;
  }
  else {
    document.querySelector(".card-error").innerHTML = '';
    passwordText.value = password;
  }

}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
