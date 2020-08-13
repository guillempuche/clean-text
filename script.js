async function convertTextAndCopy() {
  let inputText, outputText;

  inputText = document.getElementById("input__textarea").value;

  // First, replace the changes of paragraphs with `$#`.
  outputText = inputText.replace(/\n\n/g, "$#");
  // Second, replace the line breaks with a white space.
  outputText = outputText.replace(/\n/g, " ");
  // Third, replace `$#` with changes of paragraphs.
  outputText = outputText.replace(/\$#/g, "\n");

  try {
    await navigator.clipboard.writeText(outputText);
  } catch (err) {
    console.error("Error on copying the converted text");
  }

  document.getElementById("output__textarea").value = outputText;
}

async function copyToClipboard() {
  const outputText = document.getElementById("output__textarea").value;

  try {
    await navigator.clipboard.writeText(outputText);
  } catch (err) {
    console.error("Error on copying the text");
  }
}
