function minPasswordModifications(password) {
    let uppercase = false;
    let lowercase = false;
    let digit = false;
    let special = false;
    let modifications = 0;
    
    // check if password contains at least one uppercase, lowercase, digit, and special character
    for (let i = 0; i < password.length; i++) {
      const char = password.charAt(i);
      if (char >= 'A' && char <= 'Z') {
        uppercase = true;
      } else if (char >= 'a' && char <= 'z') {
        lowercase = true;
      } else if (char >= '0' && char <= '9') {
        digit = true;
      } else {
        special = true;
      }
    }
    
    if (!uppercase) {
      // if no uppercase letter, add one to modifications
      modifications++;
    }
    if (!lowercase) {
      // if no lowercase letter, add one to modifications
      modifications++;
    }
    if (!digit) {
      // if no digit, add one to modifications
      modifications++;
    }
    if (!special) {
      // if no special character, add one to modifications
      modifications++;
    }
    
    // if password length is less than 6, add the difference to modifications
    if (password.length < 6) {
      modifications += 6 - password.length;
    }
    
    // if password length is greater than 20, add the difference to modifications
    if (password.length > 20) {
      modifications += password.length - 20;
    }
    
    return modifications;
  }
  
  // unit tests
  function runTests() {
    const testCases = [
      ["a", 5],
      ["aA1", 3],
      ["1137C0d3", 0],
      ["password", 2],  // missing special and length < 6
      ["Password", 2],  // missing digit and length < 6
      ["password1234", 1],  // missing special and length > 20
      ["Password1234", 1],  // missing special and length > 20
      ["!@#$%^&*()", 4],  // missing lowercase, uppercase, digit, and length < 6
      ["!@#$%^&*()abcABC123", 0],  // all criteria met
      ["!@#$%^&*()abcABC123abcABC123", 4],  // length > 20
    ];
    
    for (let i = 0; i < testCases.length; i++) {
      const [password, expected] = testCases[i];
      const actual = minPasswordModifications(password);
      console.log(`Test case ${i + 1}: ${actual === expected ? "PASS" : "FAIL"}`);
      console.log(`  password: ${password}`);
      console.log(`  expected: ${expected}`);
      console.log(`  actual: ${actual}`);
    }
  }
  
  // run the tests
  runTests();