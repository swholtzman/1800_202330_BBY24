function toggle(switchElement) {
  switchElement.classList.toggle("active");
}

function setHeader(title) {
  const headerNode = document.getElementById("header");
  while (headerNode.firstChild) {
    headerNode.removeChild(headerNode.lastChild);
  } 
  let headerTemplate = `<p><span onClick="loadSettingsPage()">&#10094; &nbsp; ${title}</span></p>`;
  headerNode.insertAdjacentHTML("afterbegin", headerTemplate);
}

function addSection(title) {
  let sectionTemplate = `
    <div id="settings-group-${title}" class="settings-group section">
      <p>${title}</p>
    </div>
  `;
  document.getElementById("main-container").insertAdjacentHTML("beforeend", sectionTemplate);
}

function addSwitch(name, parentTitle, isActive) {
  let active = "";
  if (isActive) {
    active = " active";
  }

  let switchTemplate = `
    <p><span>${name}</span>
      <button class="toggle-btn-container">
        <div class="toggle-btn-rectangle${active}" onClick="toggle(this)">
          <div class="toggle-btn-circle"></div>
        </div>
      </button>
    </p>
  `;
  document.getElementById("settings-group-" + parentTitle).insertAdjacentHTML("beforeend", switchTemplate);
}

function addLink(name, parentTitle, loadPageFunction) {
  let linkTemplate = `<p><span class="link" onClick="${loadPageFunction}">${name}</span></p>`;
  document.getElementById("settings-group-" + parentTitle).insertAdjacentHTML("beforeend", linkTemplate);
  
} 

function clearPage() {
  const rootNode = document.getElementById("main-container");
  while (rootNode.firstChild) {
    rootNode.removeChild(rootNode.lastChild);
  } 
}

function loadSettingsPage() {
  clearPage();

  setHeader("Settings");

  addSection("Notifications");
  addSwitch("Enable Notifications", "Notifications", true);
  addLink("Notification Preferences", "Notifications", "loadNotificationsPage()");

  addSection("General");
  addLink("Account", "General", "loadAccountPage()");
  addLink("Language", "General", "loadLanguagePage()");

  addSection("Customization");
  addLink("Default Charging Settings", "Customization", "loadDGSPage()");
  addLink("Themes", "Customization", "loadThemesPage()");

  addSection("More Options");
  addLink("Give Feedback", "More Options", "loadFeedbackPage()");
  addLink("Sign Out", "More Options", "loadSignOutPage()");
}

function loadNotificationsPage() {
  clearPage();

  setHeader("Notifications");

  addSection("Common");
  addSwitch("News & Events", "Common", false);
}






