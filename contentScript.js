let detectingTranslationBubble;
const detectTranslationBubble = (timesToTry, resolve) => {
  if (timesToTry <= 0) return;
  detectingTranslationBubble = setTimeout(() => {
    const bubble = document.querySelector('.jfk-bubble');
    if (bubble) {
      resolve(bubble);
    } else {
      detectTranslationBubble(timesToTry - 1, resolve);
    }
  }, 500);
};

const waitForTranslationBubble = () => new Promise(resolve => {
  clearTimeout(detectingTranslationBubble);
  detectTranslationBubble(10, resolve);
})

const addWord = (word, definition) => {
  chrome.storage.local.get(['words'], result => {
    chrome.storage.local.set({ words: {
      ...result.words,
      [word]: definition,
    }})
  });
}

const formTemplate = document.createElement('template');
formTemplate.innerHTML = `
  <style>
    hr {
      margin-top: 1.25rem;
    }
    input {
      margin: 0.25rem 0;
    }
    input[type=text] {
      width: 96%;
    }
    input[type=submit] {
      width: 100%;
    }
  </style>
  <form>
    <br>
    <hr>
    <label>詞語:</label>
    <input type='text' name='word' placeholder='詞語'>
    <br>
    <label>定義:</label>
    <input type='text' name='definition' placeholder='請選取/輸入定義'>
    <br>
    <input type='submit' value='新增字卡'>
  </form>
`;

// ============================================================================
document.addEventListener('click', async() => {
  const word = window.getSelection().toString()
  if (!word) return;
  const bubble = await waitForTranslationBubble();
  console.log(bubble);

  const formContainer = document.createElement('div');
  const shadow = formContainer.attachShadow({ mode: 'open' });
  shadow.appendChild(document.importNode(formTemplate.content, true));
  bubble.appendChild(formContainer);

  const form =shadow.querySelector('form');
  form.querySelector('input[name=word]').value = word;
})
