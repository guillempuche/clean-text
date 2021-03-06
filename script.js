//
/**
 * Initialization when page is loaded.
 */
function start() {
  // Set the default state of mode auto-copy as false.
  if (checkAutoCopy() === undefined) setAutoCopy(false);
  // Set the switch button
  else document.getElementById("switch__input").checked = checkAutoCopy();
}

function convertTextAutomatically() {
  let timeout = null;
  let inputText, outputText;

  // Clear the timeout if it has already been set.
  // This will prevent the previous task from executing
  // if it has been less than X milliseconds.
  clearTimeout(timeout);

  // Make a new timeout set to go off in 1000ms (1 second)
  timeout = setTimeout(() => {
    inputText = document.getElementById("input__textarea").value;

    outputText = convertText(inputText);

    document.getElementById("output__textarea").value = outputText;

    // Auto copy the text if this mode is enabled.
    if (checkAutoCopy()) copy();
  }, 30);
}

function convertText(inputText) {
  let outputText;

  // First, replace the changes of paragraphs with `$#`.
  outputText = inputText.replace(/\n{2,}/g, "$#");
  // Second, replace the line breaks with a white space.
  outputText = outputText.replace(/\n/g, " ");
  // Third, replace `$#` with changes of paragraphs.
  outputText = outputText.replace(/\$#/g, "\n");

  return outputText;
}

/**
 * Copy the output textarea's text.
 */
async function copy() {
  const text = document.getElementById("output__textarea").value;

  try {
    await navigator.clipboard.writeText(text);
  } catch (err) {
    console.error("Error on copying the text");
  }
}

/**
 * Set the state for the mode auto-copy.
 * @param {boolean} [newState=undefined]
 */
function setAutoCopy(newState) {
  const oldState = checkAutoCopy();

  if (newState === undefined) newState = !oldState;

  // If previous state is true, then the new state has to be false.
  // And the reverse.
  // Cookie will expire after 60 days.
  document.cookie = `auto_copy=${newState}; max-age=5184000 ;samesite=strict`;

  document.getElementById("switch__input").checked = newState;
}

/**
 * Get the cookie `auto_copy`'s value.
 * @return {boolean|undefined} True if cookie is true, false if cookie
 * is false or undefined it it doesn't exist.
 */
function checkAutoCopy() {
  let cookieValue;

  // If cookie doesn't exist, we return `null`.
  try {
    cookieValue = document.cookie
      .split("; ")
      .find((row) => row.startsWith("auto_copy"))
      .split("=")[1];

    // Convert the cookie value (type of string) to a boolean.
    if (cookieValue === "true") {
      cookieValue = true;
    } else {
      cookieValue = false;
    }
  } catch (err) {
    cookieValue = undefined;
  }

  return cookieValue;
}

/**
 * When user press specific key combination, the ouput text is copied.
 */
const keyshortcutAndCopy = (e) => {
  // Key combination: CTRL + ALT + X
  if (e.ctrlKey && e.altKey && e.keyCode === 88) {
    console.log("text copied");
    copy();
  }
};

// ************
// Listeners
// ************

/**
 * When user press specific key combination, the ouput text is copied.
 */
document.onkeyup = (e) => {
  keyshortcutAndCopy(e);
};
