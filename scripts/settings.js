// REQUIRES GLOBAL.JS TO ALSO BE LINKED TO HEAD OF HTML FILE

function toggle(switchElement) {
  const data = {
    active: !(switchElement.classList.contains("active"))
  };

  db.collection("users").doc(uid).collection("settings").doc(switchElement.id).set(data).then(() => {
    switchElement.classList.toggle("active");
  });
}

function setHeader(title, loadPageFunction) {
  const headerNode = document.getElementById("header");
  while (headerNode.firstChild) {
    headerNode.removeChild(headerNode.lastChild);
  } 
  let headerTemplate = `<p><span onClick="${loadPageFunction}">&nbsp; &#10094; &nbsp; ${title}</span></p>`;
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

function addSwitch(name, parentTitle) {
  let docRef = db.collection("users").doc(uid).collection("settings").doc(name);
  docRef.get().then((doc) => {
    if (doc.exists) {
      let isActive = doc.data().active;
      let activeClass = isActive ? " active" : "";

      let switchTemplate = `
        <p><span>${name}</span>
          <button class="toggle-btn-container">
            <div id="${name}" class="toggle-btn-rectangle${activeClass}" onClick="toggle(this)">
              <div class="toggle-btn-circle"></div>
            </div>
          </button>
        </p>
      `;
      document.getElementById("settings-group-" + parentTitle).insertAdjacentHTML("beforeend", switchTemplate);
    } else {
      console.log("Setting does not exist in user database yet! Adding it now...");
      docRef.set({active: false}).then(() => {
        addSwitch(name, parentTitle);
      });
    }
  });
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

function loadMainPage() {
  window.location.href = "./index.html"
}

function loadSettingsPage() {
  clearPage();

  setHeader("Settings", "loadMainPage()");

  addSection("Notifications");
  addSwitch("Enable Notifications", "Notifications");
  addLink("Notification Preferences", "Notifications", "loadNotificationsPage()");

  addSection("General");
  addLink("Account", "General", "loadAccountPage()");
  addLink("Language", "General", "loadLanguagePage()");

  addSection("Customization");
  addLink("Default Charging Settings", "Customization", "loadDGSPage()");
  addLink("Themes", "Customization", "loadThemesPage()");

  addSection("More Options");
  addLink("Give Feedback", "More Options", "loadFeedbackPage()");
  addLink("Sign Out", "More Options", "signOut()");
}

function loadNotificationsPage() {
  clearPage();

  setHeader("Notifications", "loadSettingsPage()");

  addSection("Notification Preferences");
  addSwitch("News And Events", "Notification Preferences");
  addSwitch("Car Unplugged", "Notification Preferences");
  addSwitch("Car Done Charging", "Notification Preferences");
  addSwitch("Car Reached 80% Battery", "Notification Preferences");
  addSwitch("Car Reached 50% Battery", "Notification Preferences");
}

function loadAccountPage() {
  alert("Work in progress!");
}

function loadLanguagePage() {
  alert("Work in progress!");
}

function loadDGSPage() {
  alert("Work in progress!");
}

function loadThemesPage() {
  alert("Work in progress!");
}

function loadFeedbackPage() {
  alert("Work in progress!");
}




