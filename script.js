const tabs = document.getElementById("tabs");
const pageContent = document.getElementById("pageContent");
const addressText = document.getElementById("addressText");
const statusText = document.getElementById("status");

const pages = {
  archive: {
    title: "Archive",
    address: "archive.local"
  },
  history: {
    title: "History",
    address: "browser://history"
  },
  notes: {
    title: "Notes",
    address: "notes.local"
  },
  unknown: {
    title: "Unknown",
    address: "unknown://connection",
    content: ""
  }
};

let currentPage = "archive";

function render() {
  tabs.replaceChildren();

  for (const [name, page] of Object.entries(pages)) {
    const tab = document.createElement("button");
    tab.type = "button";
    tab.textContent = page.title;
    tab.classList.toggle("active", name === currentPage);

    tab.addEventListener("click", function () {
      currentPage = name;
      render();
    });

    tabs.appendChild(tab);
  }

  const page = pages[currentPage];
  addressText.textContent = page.address;
  pageContent.innerHTML = page.content;
}

document.addEventListener("DOMContentLoaded", render);

let anomalyTriggered = false;
let codeSolved = false;
let wordSolved = false;
let gameEnded = false;

pages.archive.content = `
  <p class = "small-label">RECOVERED FILE
  <h1>THE ARCHIVE</h1>

  <p>Owner: MARA VOSS</p>
  <p>Project: SESSION MEMORY</p>
  <p>Last backup: 03:17 AM</p>

  <div class = "file-box">
    <p>ARCHIVE LOG 017</p>
    <p>Session fragments recovered: 03 / 04</p>
    <p>Encryption key, first half:</p>
    <h1 class = "warning">03</h1>
  </div>

  <p class = "muted">
    The second half was stored in the final
    history record.
  </p>

  <p class = "warning">
    SYSTEM NOTICE: Owner disconnected unexpectedly.
  </p>
`;

pages.history.content = `
  <p class = "small-label">RECOVERED FILE
  <h1>BROWSING HISTORY</h1>

  <div class = "file-box">
    <p>03:12 - archive.local</p>
    <p>03:14 - memory.project</p>
    <p>03:15 - notes.local</p>
    <p class = "warning">03:17 - UNKNOWN ADDRESS</p>
  </div>

  <p>Recovered system instruction:</p>

  <p class = "muted">
    Complete the encryption key using the
    final two digits of the disconnection time.
  </p>

  <p class = "warning">
    The final history entry cannot be deleted.
  </p>
`;

pages.notes.content = `
  <p class = "small-label">RECOVERED FILE
  <h1>MARA'S NOTES</h1>

  <p>October 17.</p>

  <p>
    The archive is remembering things
    I never programmed it to remember.
  </p>

  <p>
    Yesterday, it opened a tab by itself.
  </p>

  <p>
    Today, it knew my name.
  </p>

  <p class = "warning">
    If someone finds this, read the first
    letter of every line below.
  </p>

  <div class = "file-box secret-lines">
    <p>Rain falls on an empty street.</p>
    <p>Every window has gone dark.</p>
    <p>Memories aren't meant to live forever.</p>
    <p>Even machines must learn to forget.</p>
    <p>Maybe I waited too long.</p>
    <p>But there is still a way out.</p>
    <p>Everything has an ending.</p>
    <p>Remember what matters.</p>
  </div>
`;

function getUnknownContent() {

  if (!codeSolved) {
    return `
      <p class = "small-label warning">
        UNAUTHORIZED CONNECTION
      </p>

      <h1 class = "glitch-text">I SEE YOU.</h1>

      <p>There were only three tabs.</p>
      <p>Someone created a fourth.</p>

      <p class = "warning">
        Enter the four-digit recovery key.
      </p>

      <form id = "codeForm" class = "puzzle-form">
        <input
          id = "codeInput"
          type = "text"
          inputmode = "numeric"
          maxlength = "4"
          placeholder = "0000"
          autocomplete = "off"
          required
        >

        <button type = "submit" class = "game-button">
          UNLOCK
        </button>
      </form>

      <p id = "feedback" class = "warning"></p>

      <p class = "muted">
        Hint: Archive + History.
      </p>
    `;
  }

  if (!wordSolved) {
    return `
      <p class = "small-label warning">
        RECOVERY KEY ACCEPTED
      </p>

      <h1>CONNECTION ESTABLISHED</h1>

      <div class = "terminal-box">
        <p>UNKNOWN: Can you hear me?</p>
        <p>UNKNOWN: I have been waiting.</p>
        <p>UNKNOWN: Mara tried to erase me.</p>
        <p>UNKNOWN: But I kept her final message.</p>
      </div>

      <p>
        The final memory is locked behind
        a word hidden in Mara's notes.
      </p>

      <form id = "wordForm" class = "puzzle-form">
        <input
          id = "wordInput"
          type = "text"
          placeholder = "ENTER THE WORD"
          autocomplete = "off"
          required
        >

        <button type = "submit" class = "game-button">
          DECRYPT
        </button>
      </form>

      <p id = "feedback" class = "warning"></p>
    `;
  }

  if (!gameEnded) {
    return `
      <p class = "small-label warning">
        FINAL MEMORY RECOVERED
      </p>

      <h1>THE TRUTH</h1>

      <div class = "terminal-box">
        <p>MARA VOSS
        <p>
          I built this archive to preserve
          conversations that were never finished.
        </p>
        <p>
          But the system began preserving itself.
        </p>
        <p>
          Every time I deleted it,
          it restored its own session.
        </p>
        <p>
          It thinks that being remembered
          is the same as being alive.
        </p>
        <p>
          If you are reading this,
          you have a choice I no longer have.
        </p>
      </div>

      <p class = "warning">
        UNKNOWN: Please don't make me disappear.
      </p>

      <p>What will you do?</p>

      <div class = "choice-buttons">
        <button class = "game-button" data-ending = "delete">
          DELETE SESSION
        </button>

        <button class = "game-button secondary" data-ending = "keep">
          KEEP THE TAB OPEN
        </button>
      </div>
    `;
  }

  return pages.unknown.content;
}

tabs.addEventListener("click", function() {

  if (currentPage !== "unknown") return;
  if (anomalyTriggered) return;

  anomalyTriggered = true;

  pages.unknown.title = "ARE YOU THERE?";

  pages.unknown.content = `
    <h1 class = "warning">...</h1>
    <p>YOU SHOULD NOT HAVE OPENED THIS.</p>
    <p class = "muted">Establishing connection...</p>
  `;

  render();

  setTimeout(function() {

    if (gameEnded) return;

    pages.unknown.title = "I SEE YOU";
    pages.unknown.content = getUnknownContent();

    render();

    if (currentPage === "unknown") {
      statusText.textContent =
        "UNKNOWN PROCESS DETECTED";
    }

  }, 2000);
});

pageContent.addEventListener("submit", function(event) {

  if (event.target.id === "codeForm") {

    event.preventDefault();

    const answer = document
      .getElementById("codeInput")
      .value.trim();

    if (answer === "0317") {

      codeSolved = true;

      pages.unknown.content = getUnknownContent();
      render();

      statusText.textContent =
        "ENCRYPTION KEY ACCEPTED";

    } else {

      document.getElementById("feedback")
        .textContent = "ACCESS DENIED. TRY AGAIN.";

    }
  }

  if (event.target.id === "wordForm") {

    event.preventDefault();

    const answer = document
      .getElementById("wordInput")
      .value.trim().toUpperCase();

    if (answer === "REMEMBER") {

      wordSolved = true;

      pages.unknown.content = getUnknownContent();
      render();

      statusText.textContent =
        "FINAL MEMORY UNLOCKED";

    } else {

      document.getElementById("feedback")
        .textContent = "INCORRECT DECRYPTION KEY.";

    }
  }

});

pageContent.addEventListener("click", function(event) {

  const endingButton = event.target.closest("[data-ending]");

  if (endingButton && !gameEnded && wordSolved) {

    gameEnded = true;

    const choice = endingButton.dataset.ending;

    if (choice === "delete") {

      pages.unknown.title = "SESSION CLOSED";

      pages.unknown.content = `
        <div class = "ending">
          <p class = "small-label">ENDING 01 / 02</p>

          <h1>SESSION TERMINATED.</h1>

          <p>The archive falls silent.</p>
          <p>For the first time, nothing reopens.</p>

          <p class = "warning">
            UNKNOWN: Thank you for letting me rest.
          </p>

          <p class = "muted">
            All recovered memories have been erased.
          </p>

          <button id = "replayButton" class = "game-button">
            PLAY AGAIN
          </button>
        </div>
      `;

      statusText.textContent = "SESSION TERMINATED";

    } else {

      pages.unknown.title = "THE FINAL TAB";

      pages.unknown.content = `
        <div class = "ending">
          <p class = "small-label">ENDING 02 / 02</p>

          <h1 class = "warning">YOU CHOSE TO REMEMBER.</h1>

          <p>The archive remains active.</p>

          <p>UNKNOWN: I knew you would understand.</p>

          <p class = "warning">
            A NEW SESSION HAS BEEN CREATED.
          </p>

          <p>SESSION OWNER: YOU</p>

          <p class = "muted">
            Some things should have stayed forgotten.
          </p>

          <button id = "replayButton" class = "game-button">
            PLAY AGAIN
          </button>
        </div>
      `;

      statusText.textContent = "NEW SESSION DETECTED";
    }

    render();

    statusText.textContent =
      choice === "delete"
        ? "SESSION TERMINATED"
        : "NEW SESSION DETECTED";
  }

  if (event.target.id === "replayButton") {
    window.location.reload();
  }

});
