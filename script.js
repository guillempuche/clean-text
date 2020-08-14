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
  }, 500);
}

function convertText(inputText) {
  let outputText;

  // First, replace the changes of paragraphs with `$#`.
  outputText = inputText.replace(/\n\n/g, "$#");
  // Second, replace the line breaks with a white space.
  outputText = outputText.replace(/\n/g, " ");
  // Third, replace `$#` with changes of paragraphs.
  outputText = outputText.replace(/\$#/g, "\n");

  return outputText;
}

async function copyToClipboard() {
  const text = document.getElementById("output__textarea").value;

  try {
    await navigator.clipboard.writeText(text);
  } catch (err) {
    console.error("Error on copying the text");
  }
}
